import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import type { MongoClient, Db } from 'mongodb';

// Add type annotation for clientPromise
const typedClientPromise: Promise<MongoClient> = clientPromise;

export async function POST(req: Request) {
  // Test log for env variables
  console.log('API route hit', process.env.MONGODB_URI, process.env.ADMIN_SECRET);
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const client: MongoClient = await typedClientPromise;
    const db: Db = client.db();
    const result = await db.collection('messages').insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    let errorString = '';
    try {
      errorString = JSON.stringify(error, Object.getOwnPropertyNames(error));
    } catch (e) {
      errorString = String(error);
    }
    console.error('Contact API Error:', errorString);
    return NextResponse.json({ error: 'Failed to save message', details: errorString }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // For admin dashboard: require a secret token in query string
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const client: MongoClient = await typedClientPromise;
    const db: Db = client.db();
    const messages = await db.collection('messages').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ messages });
  } catch (error: any) {
    // Enhanced error logging for debugging
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages', details: error?.message || error }, { status: 500 });
  }
}
