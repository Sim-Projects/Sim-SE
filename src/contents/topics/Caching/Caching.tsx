"use client";

import { Paragraph, Quiz, CodeBlock, Simulation, Heading, ImageBlock, OrderedList, DidYouKnow } from "@/contents/utils";
import SectionPagination from "@/utils/Pagination";
import CachingSimulation from "./basic_caching";
import CachingMetricCalculations from "./cache_comp";
import CachingStrategiesSimulation from "./cache_strategies";

const Caching = () => (
    <SectionPagination>

        <section>
            <Heading> Introduction: The Great Coffee Shop Conundrum </Heading>
            <ImageBlock src="/Caching/caching_intro.webp" alt="Caching" />
            <Paragraph>
                Imagine you're a barista at "ByteBrew", the hottest coffee shop in Silicon Valley. 
                It's Monday morning, and a flood of sleepy software engineers is pouring through the door, all craving their caffeine fix. 
                As orders pile up, you notice a pattern: the same drinks keep coming up again and again.
            </Paragraph>
        </section>
        <section>
            <Paragraph>
                What if, instead of making each drink from scratch every time, you could keep a few ready-made popular orders on hand? 
                This way, when the next person orders a "Vanilla Latte with Extra Espresso", you could serve it instantly!
            </Paragraph>
        </section>
        <section>
            <Paragraph>
                This, dear learner, is the essence of caching in the world of software engineering. 
                Just as our clever barista strategy speeds up coffee delivery, caching accelerates data retrieval in our applications. 
                But how exactly does it work, and when should we use it? 
                Grab your virtual apron, and let's dive into the world of caching!
            </Paragraph>
        </section>
        <section>
            <Heading> What is Caching? </Heading>
            <Paragraph>
                In our ByteBrew scenario, caching is like preparing popular drinks in advance. 
                In the digital realm, it's the process of storing frequently accessed data in a fast-access storage layer, so it can be quickly retrieved when needed.            
            </Paragraph>
        </section>
        <section>
            <Heading> The Caching Principle </Heading>
            <Paragraph>
                When a piece of data is requested:
                <OrderedList>
                    <li>Check if it's in the cache</li>
                    <li>If it is, serve it directly (cache hit)</li>
                    <li>If it's not, fetch it from the main storage, serve it, and store a copy in the cache (cache miss)</li>
                </OrderedList>
            </Paragraph>
        </section>
        <section>
            <Heading>
                Welcome to the ByteBrew Caching Simulation! 
            </Heading>
            <Paragraph>
                This interactive demo illustrates how caching works in a coffee shop scenario. 
                Watch as orders are processed, see the difference between cache hits and misses, and observe how caching impacts overall performance. 
                Add random orders and manage the cache to see these principles in action!
            </Paragraph>
        </section>
        <section>
            <Simulation>
                <CachingSimulation />
            </Simulation>
        </section>
        <section>
            <Paragraph>
                Great job experimenting with the ByteBrew Caching Simulation! 
                You've seen firsthand how caching can speed up order processing and improve efficiency. 
                Remember, in software engineering, caching works similarly to reduce data retrieval times and lower server load. 
                Keep this principle in mind as you build and optimize your own applications!
            </Paragraph>
        </section>
        <section>
            <DidYouKnow heading="Fun Fact!">
                Did you know? The term "cache" comes from the French word "cacher", meaning "to hide". 
                In computing, we're hiding data in a special, fast-access place!
            </DidYouKnow>
        </section>
        <section>
            <Heading> Why Cache? The Performance Boost </Heading>
            <Paragraph>
                Let's return to ByteBrew. It's now 10 AM, and the morning rush is in full swing. 
                Thanks to your caching strategy, you're serving drinks at lightning speed. 
                Regular customers are amazed at how quickly they get their usual orders!
            </Paragraph>
        </section>
        <section>
            <Paragraph>
                In software terms, caching provides several benefits:
                <OrderedList>
                    <li><b>Reduced latency:</b> Faster data retrieval</li>
                    <li><b>Decreased network traffic:</b> Less data transferred</li>
                    <li><b>Lower server load:</b> Fewer requests to process</li>
                    <li><b>Improved user experience:</b> Snappier applications</li>
                </OrderedList>
            </Paragraph>
        </section>
        <section>
            <Heading> Welcome to the Caching Metrics Simulator! </Heading>
            <Paragraph>
                This interactive tool demonstrates how caching affects key performance indicators in a web application. 
                Adjust the sliders to see how cache hit rate, request volume, server capacity, and cache performance impact response times, server load, and user satisfaction. 
                Explore the relationship between these metrics and understand the power of effective caching strategies!
            </Paragraph>
        </section>
        <section>
            <Simulation>
                <CachingMetricCalculations />
            </Simulation>
        </section>
        <section>
            <Paragraph>
                You've just experienced the Caching Metrics Simulator! 
                By manipulating various parameters, you've seen how caching can significantly improve system performance and user experience. 
                Remember, while this is a simplified model, it illustrates the core benefits of caching in real-world applications.
                As you develop your own systems, consider how strategic caching can optimize your application's performance and scalability.
            </Paragraph>    
        </section>
        <section>
            <Heading> Caching Strategies: Choosing the Right Brew </Heading>
            <Paragraph>
                Just as different coffee beans suit different tastes, various caching strategies fit different scenarios. 
                Let's explore some common ones:
                <OrderedList>   
                    <li><b>LRU (Least Recently Used):</b> Discard the least recently used items first.</li>
                    <li><b>LFU (Least Frequently Used):</b> Discard the least often accessed items first.</li>
                    <li><b>FIFO (First In, First Out):</b> The first item in is the first item out.</li>
                    <li><b>Time-Based Expiration:</b> Items expire after a set time.</li>
                </OrderedList>
            </Paragraph>
        </section>
        <section>
            <Heading> Welcome to the ByteBrew Caching Strategies Simulation! </Heading>
            <Paragraph>
                This interactive tool is designed to help you understand and compare different caching algorithms used in software engineering. 
                By simulating a coffee shop environment, you'll see how Least Recently Used (LRU), First In First Out (FIFO), and Least Frequently Used (LFU) caching strategies perform under various scenarios. 
                Add random coffee orders, watch how the cache responds, and analyze the efficiency of each strategy through real-time statistics
            </Paragraph>
        </section>
        <section>
            <CachingStrategiesSimulation /> 
        </section>
        <section>
            <Paragraph>
                Hope this interactive experience has deepened your understanding of how different caching algorithms work in practice. 
                By observing the behavior of LRU, FIFO, and LFU strategies in our virtual coffee shop, you've gained insights into their strengths and potential use cases. 
                Remember, the effectiveness of a caching strategy can vary depending on the specific requirements of your system. 
                We encourage you to experiment further, compare the hit rates and efficiency of each strategy, and consider how these concepts might apply to your own projects.
            </Paragraph>    
        </section>
    </SectionPagination>
);

export default Caching;

