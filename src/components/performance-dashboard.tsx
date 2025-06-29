"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { performanceMonitor, PerformanceMetrics } from '@/lib/performance';
import { useNavigation } from '@/contexts/NavigationContext';
import { 
  Activity, 
  Zap, 
  Eye, 
  Clock, 
  BarChart3, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { getNavigationMetrics, isNavigating } = useNavigation();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const updateMetrics = () => {
      const performanceData = performanceMonitor.getMetrics();
      const navigationData = getNavigationMetrics();
      setMetrics({ ...performanceData, ...navigationData });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 1000);

    return () => clearInterval(interval);
  }, [getNavigationMetrics]);

  const getScoreColor = (score: number, thresholds: { good: number; needs: number }) => {
    if (score <= thresholds.good) return 'text-green-500';
    if (score <= thresholds.needs) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreIcon = (score: number, thresholds: { good: number; needs: number }) => {
    if (score <= thresholds.good) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (score <= thresholds.needs) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  if (process.env.NODE_ENV !== 'development') return null;
  if (!isVisible && !isNavigating) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => setIsVisible(true)}
      >
        <Activity className="h-4 w-4 mr-2" />
        Performance
      </Button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-80 max-h-[80vh] overflow-auto">
      <Card className="bg-background/95 backdrop-blur-xl border shadow-xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Performance Monitor
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => performanceMonitor.logMetrics()}
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          {/* Navigation Status */}
          <div className="flex items-center justify-between">
            <span>Navigation Status:</span>
            <Badge variant={isNavigating ? "destructive" : "secondary"}>
              {isNavigating ? 'Navigating...' : 'Ready'}
            </Badge>
          </div>

          {/* Core Web Vitals */}
          {metrics && (
            <>
              <div className="border-t pt-2">
                <h4 className="font-semibold mb-2 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Core Web Vitals
                </h4>
                
                {metrics.largestContentfulPaint && (
                  <div className="flex items-center justify-between">
                    <span>LCP:</span>
                    <div className="flex items-center gap-1">
                      {getScoreIcon(metrics.largestContentfulPaint, { good: 2500, needs: 4000 })}
                      <span className={getScoreColor(metrics.largestContentfulPaint, { good: 2500, needs: 4000 })}>
                        {metrics.largestContentfulPaint.toFixed(0)}ms
                      </span>
                    </div>
                  </div>
                )}

                {metrics.firstContentfulPaint && (
                  <div className="flex items-center justify-between">
                    <span>FCP:</span>
                    <div className="flex items-center gap-1">
                      {getScoreIcon(metrics.firstContentfulPaint, { good: 1800, needs: 3000 })}
                      <span className={getScoreColor(metrics.firstContentfulPaint, { good: 1800, needs: 3000 })}>
                        {metrics.firstContentfulPaint.toFixed(0)}ms
                      </span>
                    </div>
                  </div>
                )}

                {metrics.cumulativeLayoutShift !== undefined && (
                  <div className="flex items-center justify-between">
                    <span>CLS:</span>
                    <div className="flex items-center gap-1">
                      {getScoreIcon(metrics.cumulativeLayoutShift * 1000, { good: 100, needs: 250 })}
                      <span className={getScoreColor(metrics.cumulativeLayoutShift * 1000, { good: 100, needs: 250 })}>
                        {metrics.cumulativeLayoutShift.toFixed(3)}
                      </span>
                    </div>
                  </div>
                )}

                {metrics.firstInputDelay && (
                  <div className="flex items-center justify-between">
                    <span>FID:</span>
                    <div className="flex items-center gap-1">
                      {getScoreIcon(metrics.firstInputDelay, { good: 100, needs: 300 })}
                      <span className={getScoreColor(metrics.firstInputDelay, { good: 100, needs: 300 })}>
                        {metrics.firstInputDelay.toFixed(0)}ms
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Page Load Metrics */}
              <div className="border-t pt-2">
                <h4 className="font-semibold mb-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Page Load
                </h4>
                
                <div className="flex items-center justify-between">
                  <span>DOM Content Loaded:</span>
                  <span>{metrics.domContentLoaded}ms</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Load Complete:</span>
                  <span>{metrics.loadComplete}ms</span>
                </div>

                {metrics.routeChangeComplete && (
                  <div className="flex items-center justify-between">
                    <span>Last Route Change:</span>
                    <span className={getScoreColor(metrics.routeChangeComplete, { good: 200, needs: 500 })}>
                      {metrics.routeChangeComplete.toFixed(0)}ms
                    </span>
                  </div>
                )}
              </div>

              {/* Navigation Info */}
              {(metrics as any).prefetchedRoutes && (
                <div className="border-t pt-2">
                  <h4 className="font-semibold mb-2 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    Navigation
                  </h4>
                  
                  <div className="flex items-center justify-between">
                    <span>Prefetched Routes:</span>
                    <Badge variant="outline">
                      {(metrics as any).prefetchedRoutes.length}
                    </Badge>
                  </div>
                  
                  {(metrics as any).navigationHistory && (
                    <div className="flex items-center justify-between">
                      <span>History Length:</span>
                      <Badge variant="outline">
                        {(metrics as any).navigationHistory.length}
                      </Badge>
                    </div>
                  )}
                </div>
              )}

              {/* Performance Tips */}
              <div className="border-t pt-2">
                <h4 className="font-semibold mb-2 flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  Tips
                </h4>
                <div className="text-muted-foreground space-y-1">
                  {metrics.largestContentfulPaint && metrics.largestContentfulPaint > 4000 && (
                    <p>• Consider optimizing images and critical resources</p>
                  )}
                  {metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > 0.25 && (
                    <p>• Reduce layout shifts by specifying image dimensions</p>
                  )}
                  {metrics.firstInputDelay && metrics.firstInputDelay > 300 && (
                    <p>• Consider code splitting to reduce main thread blocking</p>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
