import React, { useState, useEffect } from 'react';
import { Coffee, Clock, Trash2 } from 'lucide-react';
import { useTransition, animated, config, SpringValue } from 'react-spring';

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

interface Order {
  id: number;
  type: string;
}

interface Cache {
  [key: string]: boolean;
}

const CachingSimulation: React.FC = () => {
  const [cache, setCache] = useState<Cache>({});
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [preparationTime, setPreparationTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

  const coffeeTypes: string[] = ['Espresso', 'Latte', 'Cappuccino', 'Americano', 'Mocha'];

  useEffect(() => {
    if (currentOrder) {
      processOrder(currentOrder);
    }
  }, [currentOrder]);

  const addRandomOrder = (): void => {
    if (isProcessing) return;
    
    const newOrder: Order = {
      id: Date.now(),
      type: coffeeTypes[Math.floor(Math.random() * coffeeTypes.length)],
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
      simulatePreparation(2, "Serving cached order");
    } else {
      setPreparationTime(4);
      setTimeout(() => {
        setProcessingSteps(prev => [...prev, `Cache MISS! ${order.type} not in cache`]);
      }, 500);
      simulatePreparation(4, `Preparing fresh ${order.type}`, () => {
        setCache(prev => ({ ...prev, [order.type]: true }));
        setProcessingSteps(prev => [...prev, `Added ${order.type} to cache`]);
      });
    }
  };

  const simulatePreparation = (time: number, step: string, callback?: () => void): void => {
    setTimeout(() => {
      setProcessingSteps(prev => [...prev, step]);
    }, 1000);
    
    setTimeout(() => {
      if (callback) callback();
      setTotalTime(prev => prev + time);
      setCompletedOrders(prev => [...prev, currentOrder!]);
      setCurrentOrder(null);
      setIsProcessing(false);
      setProcessingSteps([]);
    }, time * 1000);
  };

  const removeFromCache = (type: string): void => {
    setCache(prev => {
      const newCache = { ...prev };
      delete newCache[type];
      return newCache;
    });
  };

  const currentOrderTransition = useTransition(currentOrder, {
    from: { opacity: 0, transform: 'translate3d(50px,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0px,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50px,0,0)' },
    config: { ...config.gentle, duration: 500 },
  });

  const completedOrderTransitions = useTransition(completedOrders, {
    from: { opacity: 0, transform: 'translate3d(50px,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0px,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50px,0,0)' },
    config: { ...config.gentle, duration: 500 },
  });

  return (
    <div className="p-2 sm:p-4 bg-gray-100 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">ByteBrew Caching Simulation</h2>
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <button
          onClick={addRandomOrder}
          className={`px-4 py-2 rounded mb-2 sm:mb-0 ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          disabled={isProcessing}
        >
          Add Random Order
        </button>
        <div className="text-lg sm:text-xl font-bold">
          Total Time: {totalTime}s
        </div>
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
                <CoffeeSprite isCacheHit={cache[order.type]} isProcessing={isProcessing} />
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
          {Object.keys(cache).map(type => (
            <div key={type} className="bg-green-100 text-green-800 px-2 py-1 rounded mr-2 mb-2 flex items-center">
              {type}
              <button onClick={() => removeFromCache(type)} className="ml-2 text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        {Object.keys(cache).length === 0 && <p>Cache is empty</p>}
      </div>
      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md">
        <h3 className="font-bold mb-2">Completed Orders:</h3>
        <div className="flex flex-wrap">
          {completedOrderTransitions((style, order) => (
            <animated.div style={style} key={order.id} className="bg-gray-100 px-2 py-1 rounded mr-2 mb-2">
              {order.type}
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CachingSimulation;