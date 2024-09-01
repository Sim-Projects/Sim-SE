import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface MetricDisplayProps {
  title: string;
  cachedValue: number;
  nonCachedValue: number;
  unit: string;
  description: string;
  color: string;
  cachedFormula: string;
  nonCachedFormula: string;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({ 
  title, 
  cachedValue, 
  nonCachedValue, 
  unit, 
  description, 
  color, 
  cachedFormula, 
  nonCachedFormula 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Card className="w-full">
      <CardContent className="p-2">
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Cached:</span>
            <span>{cachedValue.toFixed(2)}{unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="h-2 rounded-full" style={{ width: `${Math.min(cachedValue, 100)}%`, backgroundColor: color }}></div>
          </div>
          <div className="flex justify-between text-xs">
            <span>Non-Cached:</span>
            <span>{nonCachedValue.toFixed(2)}{unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="h-2 rounded-full bg-gray-400" style={{ width: `${Math.min(nonCachedValue, 100)}%` }}></div>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full mt-2">
          <AccordionItem value="calculations">
            <AccordionTrigger className="text-xs py-1">View Calculations</AccordionTrigger>
            <AccordionContent>
              <div className="text-xs space-y-1">
                <p><strong>Cached:</strong> {cachedFormula}</p>
                <p><strong>Non-Cached:</strong> {nonCachedFormula}</p>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <p className="text-blue-500 cursor-pointer">What does this mean?</p>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <p className="text-xs">{description}</p>
                  </PopoverContent>
                </Popover>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

interface Metrics {
  avgResponseTime: {
    cached: number;
    nonCached: number;
    cachedFormula: string;
    nonCachedFormula: string;
  };
  serverLoad: {
    cached: number;
    nonCached: number;
    cachedFormula: string;
    nonCachedFormula: string;
  };
  userSatisfaction: {
    cached: number;
    nonCached: number;
    cachedFormula: string;
    nonCachedFormula: string;
  };
}

const CachingMetricCalculations: React.FC = () => {
  const [cacheHitRate, setCacheHitRate] = useState<number>(70);
  const [requestCount, setRequestCount] = useState<number>(100);
  const [maxServerCapacity, setMaxServerCapacity] = useState<number>(100);
  const [cachePerformanceImprovement, setCachePerformanceImprovement] = useState<number>(50);

  const [metrics, setMetrics] = useState<Metrics>({
    avgResponseTime: { cached: 0, nonCached: 0, cachedFormula: '', nonCachedFormula: '' },
    serverLoad: { cached: 0, nonCached: 0, cachedFormula: '', nonCachedFormula: '' },
    userSatisfaction: { cached: 0, nonCached: 0, cachedFormula: '', nonCachedFormula: '' },
  });

  useEffect(() => {
    const cachedRequests = Math.round(requestCount * (cacheHitRate / 100));
    const nonCachedRequests = requestCount - cachedRequests;

    const cacheResponseTime = 100 * (1 - cachePerformanceImprovement / 100); // ms
    const nonCacheResponseTime = 100; // ms
    const cacheServerLoadPerRequest = 1 * (1 - cachePerformanceImprovement / 100); // Load per request
    const nonCacheServerLoadPerRequest = 1; // 100% load per request

    // Cached system calculations
    const cachedAvgResponseTime = (cachedRequests * cacheResponseTime + nonCachedRequests * nonCacheResponseTime) / requestCount;
    const cachedServerLoad = Math.min(100, ((cachedRequests * cacheServerLoadPerRequest + nonCachedRequests * nonCacheServerLoadPerRequest) / maxServerCapacity) * 100);
    const cachedUserSatisfaction = Math.max(0, 100 - (cachedAvgResponseTime / 2) - (cachedServerLoad / 10));

    // Non-cached system calculations
    const nonCachedAvgResponseTime = nonCacheResponseTime;
    const nonCachedServerLoad = Math.min(100, (requestCount / maxServerCapacity) * 100);
    const nonCachedUserSatisfaction = Math.max(0, 100 - (nonCachedAvgResponseTime / 2) - (nonCachedServerLoad / 10));

    setMetrics({
      avgResponseTime: {
        cached: cachedAvgResponseTime,
        nonCached: nonCachedAvgResponseTime,
        cachedFormula: `(${cachedRequests} * ${cacheResponseTime.toFixed(2)} + ${nonCachedRequests} * ${nonCacheResponseTime}) / ${requestCount}`,
        nonCachedFormula: `${nonCacheResponseTime}`,
      },
      serverLoad: {
        cached: cachedServerLoad,
        nonCached: nonCachedServerLoad,
        cachedFormula: `((${cachedRequests} * ${cacheServerLoadPerRequest.toFixed(2)} + ${nonCachedRequests} * ${nonCacheServerLoadPerRequest}) / ${maxServerCapacity}) * 100`,
        nonCachedFormula: `(${requestCount} / ${maxServerCapacity}) * 100`,
      },
      userSatisfaction: {
        cached: cachedUserSatisfaction,
        nonCached: nonCachedUserSatisfaction,
        cachedFormula: `100 - (${cachedAvgResponseTime.toFixed(2)} / 2) - (${cachedServerLoad.toFixed(2)} / 10)`,
        nonCachedFormula: `100 - (${nonCachedAvgResponseTime} / 2) - (${nonCachedServerLoad.toFixed(2)} / 10)`,
      },
    });
  }, [cacheHitRate, requestCount, maxServerCapacity, cachePerformanceImprovement]);

  return (
    <div className="p-2 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Caching Metrics Simulator</h2>
      
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cache Hit Rate: {cacheHitRate}%</label>
          <Slider
            value={[cacheHitRate]}
            onValueChange={(value) => setCacheHitRate(value[0])}
            max={100}
            step={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Requests: {requestCount}</label>
          <Slider
            value={[requestCount]}
            onValueChange={(value) => setRequestCount(value[0])}
            min={10}
            max={1000}
            step={10}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Server Capacity: {maxServerCapacity}</label>
          <Slider
            value={[maxServerCapacity]}
            onValueChange={(value) => setMaxServerCapacity(value[0])}
            min={10}
            max={1000}
            step={10}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cache Performance Improvement: {cachePerformanceImprovement}%</label>
          <Slider
            value={[cachePerformanceImprovement]}
            onValueChange={(value) => setCachePerformanceImprovement(value[0])}
            min={30}
            max={80}
            step={1}
          />
        </div>
      </div>

      <div className="space-y-2">
        <MetricDisplay
          title="Avg Response Time"
          cachedValue={metrics.avgResponseTime.cached}
          nonCachedValue={metrics.avgResponseTime.nonCached}
          unit="ms"
          description="Lower is better. Cached system benefits from faster responses for cache hits."
          color="#8884d8"
          cachedFormula={metrics.avgResponseTime.cachedFormula}
          nonCachedFormula={metrics.avgResponseTime.nonCachedFormula}
        />
        <MetricDisplay
          title="Server Load"
          cachedValue={metrics.serverLoad.cached}
          nonCachedValue={metrics.serverLoad.nonCached}
          unit="%"
          description="Lower is better. Cached system reduces server load by serving some requests from cache."
          color="#82ca9d"
          cachedFormula={metrics.serverLoad.cachedFormula}
          nonCachedFormula={metrics.serverLoad.nonCachedFormula}
        />
        <MetricDisplay
          title="User Satisfaction"
          cachedValue={metrics.userSatisfaction.cached}
          nonCachedValue={metrics.userSatisfaction.nonCached}
          unit="%"
          description="Higher is better. Calculated based on response time and server load."
          color="#ffc658"
          cachedFormula={metrics.userSatisfaction.cachedFormula}
          nonCachedFormula={metrics.userSatisfaction.nonCachedFormula}
        />
      </div>

      <div className="mt-4 text-xs text-gray-600">
        <p><strong>Note:</strong> This is a simplified model. Real-world scenarios may be more complex.</p>
      </div>
    </div>
  );
};

export default CachingMetricCalculations;