import React, { useState, useEffect, useMemo } from 'react';
import { Coffee, Clock, Trash2, RefreshCw } from 'lucide-react';
import { useTransition, animated, config } from 'react-spring';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CoffeeSpriteProps {
  isCacheHit: boolean;
  isProcessing: boolean;
}

const CoffeeSprite: React.FC<CoffeeSpriteProps> = ({ isCacheHit, isProcessing }) => {
  return (
    <div className="relative w-12 h-12 sm:w-16 sm:h-16">
      <div className={`absolute inset-0 flex items-center justify-center ${isProcessing ? '' : 'hidden'}`}>
        {isCacheHit ? (
          <div className="relative">
            <span className="text-3xl sm:text-4xl">☕️</span>
            <span className="absolute top-0 right-0 animate-ping">💨</span>
          </div>
        ) : (
          <div className="relative">
            <span className="text-3xl sm:text-4xl animate-pulse">☕️</span>
            <span className="absolute -top-2 -left-2 animate-bounce">☕️</span>
            <span className="absolute -bottom-2 -right-2 animate-bounce delay-150">☕️</span>
          </div>
        )}
      </div>
      <div className={`absolute inset-0 flex items-center justify-center ${isProcessing ? 'hidden' : ''}`}>
        <span className="text-3xl sm:text-4xl">☕️</span>
      </div>
    </div>
  );
};

interface CacheData {
  count: number;
  lastUsed: number;
  insertionTime: number;
}

interface Cache {
  [key: string]: CacheData;
}

interface Order {
  id: number;
  type: string;
  strategy: string;
  cacheHit?: boolean;
}

interface RemovedItem {
  type: string;
  reason: string;
}

interface Statistics {
  hitRate: number;
  totalOrders: number;
  cacheHits: number;
}

interface AllStatistics {
  [key: string]: Statistics;
}

const CachingStrategiesSimulation: React.FC = () => {
  const initialStatistics: AllStatistics = {
    LRU: { hitRate: 0, totalOrders: 0, cacheHits: 0 },
    FIFO: { hitRate: 0, totalOrders: 0, cacheHits: 0 },
    LFU: { hitRate: 0, totalOrders: 0, cacheHits: 0 }
  };

  const [cache, setCache] = useState<Cache>({});
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [preparationTime, setPreparationTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [strategy, setStrategy] = useState<string>('LRU');
  const [cacheSize, setCacheSize] = useState<number>(3);
  const [statistics, setStatistics] = useState<AllStatistics>(initialStatistics);
  const [removedItem, setRemovedItem] = useState<RemovedItem | null>(null);

  const coffeeTypes: string[] = ['Espresso', 'Latte', 'Cappuccino', 'Americano', 'Mocha'];

  useEffect(() => {
    if (currentOrder) {
      processOrder(currentOrder);
    }
  }, [currentOrder]);

  useEffect(() => {
    updateStatistics();
  }, [completedOrders, strategy]);

  const addRandomOrder = (): void => {
    if (isProcessing) return;
    
    const newOrder: Order = {
      id: Date.now(),
      type: coffeeTypes[Math.floor(Math.random() * coffeeTypes.length)],
      strategy: strategy
    };
    setCurrentOrder(newOrder);
    setIsProcessing(true);
  };

  const processOrder = (order: Order): void => {
    setProcessingSteps([`Received order for ${order.type}`]);

    if (cache[order.type]) {
      setPreparationTime(2);
      setTimeout(() => {
        setProcessingSteps(prev => [...prev, `Cache HIT! ${order.type} found in cache`]);
      }, 500);
      simulatePreparation(2, "Serving cached order", () => {
        updateCacheOrder(order.type);
      });
    } else {
      setPreparationTime(4);
      setTimeout(() => {
        setProcessingSteps(prev => [...prev, `Cache MISS! ${order.type} not in cache`]);
      }, 500);
      simulatePreparation(4, `Preparing fresh ${order.type}`, () => {
        addToCache(order.type);
      });
    }
  };

  const simulatePreparation = (time: number, step: string, callback: () => void): void => {
    setTimeout(() => {
      setProcessingSteps(prev => [...prev, step]);
    }, 1000);
    
    setTimeout(() => {
      if (callback) callback();
      setTotalTime(prev => prev + time);
      setCompletedOrders(prev => [...prev, { ...currentOrder!, cacheHit: cache[currentOrder!.type] !== undefined }]);
      setCurrentOrder(null);
      setIsProcessing(false);
      setProcessingSteps([]);
    }, time * 1000);
  };

  const addToCache = (type: string): void => {
    setCache(prev => {
      const newCache = { ...prev };
      if (Object.keys(newCache).length >= cacheSize) {
        const keyToRemove = getKeyToRemove(newCache);
        setRemovedItem({ type: keyToRemove, reason: getRemovedReason(keyToRemove, newCache) });
        delete newCache[keyToRemove];
        
        setTimeout(() => {
          setCache(prevCache => ({
            ...prevCache,
            [type]: { 
              count: 1, 
              lastUsed: Date.now(),
              insertionTime: Date.now()
            }
          }));
          setProcessingSteps(prev => [...prev, `Added ${type} to cache`]);
          setRemovedItem(null);
        }, 2000);
      } else {
        newCache[type] = { 
          count: 1, 
          lastUsed: Date.now(),
          insertionTime: Date.now()
        };
      }
      return newCache;
    });
  };

  const updateCacheOrder = (type: string): void => {
    setCache(prev => {
      const newCache = { ...prev };
      newCache[type] = {
        ...newCache[type],
        count: newCache[type].count + 1,
        lastUsed: Date.now()
      };
      return newCache;
    });
  };

  const getKeyToRemove = (cache: Cache): string => {
    const entries = Object.entries(cache);
    if (strategy === 'LRU') {
      return entries.reduce((a, b) => a[1].lastUsed < b[1].lastUsed ? a : b)[0];
    } else if (strategy === 'FIFO') {
      return entries.reduce((a, b) => a[1].insertionTime < b[1].insertionTime ? a : b)[0];
    } else if (strategy === 'LFU') {
      return entries.reduce((a, b) => a[1].count < b[1].count ? a : b)[0];
    }
    return entries[0][0]; // Default case
  };

  const getRemovedReason = (type: string, cache: Cache): string => {
    if (strategy === 'LRU') {
      return `Least recently used (Last used: ${new Date(cache[type].lastUsed).toLocaleTimeString()})`;
    } else if (strategy === 'FIFO') {
      return `First in, first out (Inserted: ${new Date(cache[type].insertionTime).toLocaleTimeString()})`;
    } else if (strategy === 'LFU') {
      return `Least frequently used (Used ${cache[type].count} times)`;
    }
    return 'Unknown reason';
  };

  const removeFromCache = (type: string): void => {
    setRemovedItem({ type, reason: 'Manually removed by user' });
    setTimeout(() => {
      setCache(prev => {
        const newCache = { ...prev };
        delete newCache[type];
        return newCache;
      });
      setRemovedItem(null);
    }, 2000);
  };

  const updateStatistics = (): void => {
    setStatistics(prev => {
      const newStats: AllStatistics = { ...prev };
      ['LRU', 'FIFO', 'LFU'].forEach(strat => {
        const stratOrders = completedOrders.filter(order => order.strategy === strat);
        const totalOrders = stratOrders.length;
        const cacheHits = stratOrders.filter(order => order.cacheHit).length;
        const hitRate = totalOrders > 0 ? (cacheHits / totalOrders) * 100 : 0;
        newStats[strat] = { hitRate, totalOrders, cacheHits };
      });
      return newStats;
    });
  };

  const resetSimulation = (): void => {
    setCache({});
    setCurrentOrder(null);
    setPreparationTime(0);
    setTotalTime(0);
    setIsProcessing(false);
    setProcessingSteps([]);
    setCompletedOrders([]);
    setStatistics(initialStatistics);
    setRemovedItem(null);
  };

  const cacheItems = useMemo(() => {
    return Object.entries(cache).map(([type, data]) => ({
      id: type,
      type,
      data
    }));
  }, [cache]);

  const currentOrderTransition = useTransition(currentOrder, {
    from: { opacity: 0, transform: 'translate3d(50px,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0px,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50px,0,0)' },
    config: { ...config.gentle, duration: 500 },
  });

  const completedOrderTransitions = useTransition(completedOrders, {
    keys: (order: Order) => order.id,
    from: { opacity: 0, transform: 'translate3d(50px,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0px,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50px,0,0)' },
    config: { ...config.gentle, duration: 500 },
  });

  const cacheItemTransitions = useTransition(cacheItems, {
    keys: (item: { id: string; type: string; data: CacheData }) => item.id,
    from: { opacity: 0, transform: 'scale(0.8)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.8)' },
    config: { ...config.gentle, duration: 300 },
  });

  return (
    <div className="p-2 sm:p-4 bg-gray-100 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">ByteBrew Caching Strategies Simulation</h2>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-0">
          <Select value={strategy} onValueChange={setStrategy}>
            <SelectTrigger className="w-full sm:w-[180px] mr-0 sm:mr-2 mb-2 sm:mb-0">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LRU">Least Recently Used (LRU)</SelectItem>
              <SelectItem value="FIFO">First In First Out (FIFO)</SelectItem>
              <SelectItem value="LFU">Least Frequently Used (LFU)</SelectItem>
            </SelectContent>
          </Select>
          <input
            type="number"
            value={cacheSize}
            onChange={(e) => setCacheSize(parseInt(e.target.value))}
            className="w-full sm:w-20 px-2 py-1 border rounded mr-0 sm:mr-2 mb-2 sm:mb-0"
            min="1"
            max="5"
          />
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto">
          <button
            onClick={addRandomOrder}
            className={`w-full sm:w-auto px-4 py-2 rounded ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} mb-2 sm:mb-0 sm:mr-2`}
            disabled={isProcessing}
          >
            Add Random Order
          </button>
          <button
            onClick={resetSimulation}
            className="w-full sm:w-auto px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center justify-center"
          >
            <RefreshCw className="mr-2" size={18} />
            Reset
          </button>
        </div>
      </div>
      <div className="text-lg sm:text-xl font-bold mb-4">
        Total Time: {totalTime}s
      </div>
      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md mb-4">
        <h3 className="font-bold mb-2">Current Order:</h3>
        {currentOrderTransition((style, order) => 
          order && (
            <animated.div style={style} key={order.id}>
              <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                <div className="flex items-center mb-1 sm:mb-0">
                  <Coffee className="mr-2" size={18} />
                  <span>{order.type}</span>
                </div>
                <div className="flex items-center sm:ml-4">
                  <Clock className="mr-2" size={18} />
                  <span>{preparationTime}s</span>
                  {cache[order.type] && <span className="ml-2 text-green-500">(Cached)</span>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                  {processingSteps.map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
                <CoffeeSprite isCacheHit={!!cache[order.type]} isProcessing={isProcessing} />
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${cache[order.type] ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-1000 ease-linear`}
                  style={{width: `${(isProcessing ? 100 : 0)}%`}}
                ></div>
              </div>
            </animated.div>
          )
        )}
        {!currentOrder && <p>No order being processed</p>}
      </div>
      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md mb-4">
        <h3 className="font-bold mb-2">Cache:</h3>
        <div className="flex flex-wrap">
          {cacheItemTransitions((style, item) => (
            <animated.div 
              style={style} 
              key={item.id} 
              className={`bg-green-100 text-green-800 px-2 py-1 rounded mr-2 mb-2 flex items-center ${
                removedItem && removedItem.type === item.type ? 'animate-pulse bg-red-200' : ''
              }`}
            >
              <span className="mr-1">{item.type}</span>
              <span className="text-xs">
                {strategy === 'LFU' && `(Count: ${item.data.count})`}
                {strategy === 'LRU' && `(Last: ${new Date(item.data.lastUsed).toLocaleTimeString()})`}
                {strategy === 'FIFO' && `(In: ${new Date(item.data.insertionTime).toLocaleTimeString()})`}
              </span>
              <button onClick={() => removeFromCache(item.type)} className="ml-2 text-red-500">
                <Trash2 size={16} />
              </button>
            </animated.div>
          ))}
        </div>
        {cacheItems.length === 0 && <p>Cache is empty</p>}
        {removedItem && (
          <div className="mt-2 p-2 bg-red-100 text-red-800 rounded">
            <p><strong>Removing from cache:</strong> {removedItem.type}</p>
            <p><strong>Reason:</strong> {removedItem.reason}</p>
          </div>
        )}
      </div>
      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md mb-4">
        <h3 className="font-bold mb-2">Cache Statistics:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(['LRU', 'FIFO', 'LFU'] as const).map(strat => (
            <div key={strat} className={`p-2 rounded ${strategy === strat ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <h4 className="font-bold">{strat}:</h4>
              <p>Hit Rate: {statistics[strat].hitRate.toFixed(2)}%</p>
              <p>Total Orders: {statistics[strat].totalOrders}</p>
              <p>Cache Hits: {statistics[strat].cacheHits}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md">
        <h3 className="font-bold mb-2">Completed Orders:</h3>
        <div className="flex flex-wrap">
          {completedOrderTransitions((style, order) => (
            <animated.div 
              style={style} 
              key={order.id} 
              className={`px-2 py-1 rounded mr-2 mb-2 ${order.cacheHit ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
            >
              {order.type}
              <span className="text-xs ml-1">
                ({order.cacheHit ? 'Hit' : 'Miss'})
              </span>
            </animated.div>
          ))}
        </div>
        {completedOrders.length === 0 && <p>No completed orders yet</p>}
      </div>
    </div>
  );
};

export default CachingStrategiesSimulation;