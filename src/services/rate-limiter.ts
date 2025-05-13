// src/services/rate-limiter.ts

// In-memory store for request timestamps. For a production app, use a persistent store like Redis.
const requestTimestampsPerUser = new Map<string, number[]>(); // Stores epoch ms for each request
const dailyRequestCounts = new Map<string, { date: string; count: number }>(); // Stores count for a given date string 'YYYY-MM-DD'

// Default to low values for easy testing if ENV vars are not set.
// For actual free tier, consult Google AI documentation (e.g., Gemini API might have 60 RPM).
const RPM_LIMIT = parseInt(process.env.GEMINI_RPM_LIMIT || '5', 10);
const RPD_LIMIT = parseInt(process.env.GEMINI_RPD_LIMIT || '20', 10);

const GLOBAL_USER_ID = 'global_user_id_for_unauthenticated_access'; // Using a generic ID as there's no user system

export class RateLimiterService {
  private get currentDateStr(): string {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  }

  public async checkRateLimit(userId: string = GLOBAL_USER_ID): Promise<{ allowed: boolean; message: string; type: 'rpm' | 'rpd' | 'none' }> {
    const now = Date.now();

    // Check RPM (Requests Per Minute)
    const userTimestamps = requestTimestampsPerUser.get(userId) || [];
    // Filter timestamps to include only those from the last minute
    const recentTimestamps = userTimestamps.filter(ts => now - ts < 60 * 1000);

    if (recentTimestamps.length >= RPM_LIMIT) {
      const timeToWait = Math.ceil((60 * 1000 - (now - (recentTimestamps[0] ?? now))) / 1000);
      return {
        allowed: false,
        message: `Rate limit exceeded. Maximum ${RPM_LIMIT} requests per minute. Please try again in about ${timeToWait} seconds.`,
        type: 'rpm',
      };
    }

    // Check RPD (Requests Per Day)
    const dailyCountEntry = dailyRequestCounts.get(userId);
    const todayStr = this.currentDateStr;

    if (dailyCountEntry && dailyCountEntry.date === todayStr && dailyCountEntry.count >= RPD_LIMIT) {
      return {
        allowed: false,
        message: `Daily request limit exceeded. Maximum ${RPD_LIMIT} requests per day. Please try again tomorrow.`,
        type: 'rpd',
      };
    }

    // If allowed, record the request
    recentTimestamps.push(now);
    // Store the recent timestamps, pruning old ones to prevent memory leaks
    requestTimestampsPerUser.set(userId, recentTimestamps.slice(-RPM_LIMIT * 2)); // Keep a buffer

    if (dailyCountEntry && dailyCountEntry.date === todayStr) {
      dailyRequestCounts.set(userId, { date: todayStr, count: dailyCountEntry.count + 1 });
    } else {
      // Reset daily count for a new day or new user
      dailyRequestCounts.set(userId, { date: todayStr, count: 1 });
    }
    
    // console.log(`Rate Limiter: User ${userId} - RPM: ${recentTimestamps.length}/${RPM_LIMIT}, RPD: ${dailyRequestCounts.get(userId)?.count}/${RPD_LIMIT}`);

    return { allowed: true, message: 'Request allowed.', type: 'none' };
  }
}

export const rateLimiterService = new RateLimiterService();
