"use client";

import React, { useState } from "react";
// import { Heading, Paragraph, Simulation, Quiz, CodeBlock } from "@/contents/utils";
import { Button } from "@/components/ui/button";
import { Heading, Paragraph, Simulation, Quiz, CodeBlock } from "@/contents/utils";
import SectionPagination from "@/utils/Pagination";

const Shard = ({ data, activeIndex }: {
    data: number[];
    activeIndex: number
}) => (
    <div className="p-2 border rounded-lg bg-white shadow-md flex flex-wrap">
        {data.map((node, index) => (
            <div
                key={index}
                className={`w-4 h-4 m-1 ${index === activeIndex ? "bg-green-500" : "bg-blue-200"
                    } rounded-sm`}
            />
        ))}
    </div>
);

const ShardingSimulation = () => {
    const [shards, setShards] = useState(2);
    const [dataNodes] = useState([...Array(100).keys()]);
    const [activeIndexes, setActiveIndexes] = useState<any[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [timeTaken, setTimeTaken] = useState<string>();

    const handleIncreaseShards = () => {
        if (!isRunning) setShards(shards + 1);
    };
    const handleDecreaseShards = () => {
        if (!isRunning) setShards(Math.max(1, shards - 1));
    };

    const handleRunQuery = async () => {
        setIsRunning(true);
        const timePerNode = 10; // milliseconds per node
        const totalNodes = dataNodes.length;
        const shardSize = Math.ceil(totalNodes / shards);
        const totalSteps = shardSize;

        for (let step = 0; step < totalSteps; step++) {
            setActiveIndexes(new Array(shards).fill(step));
            await new Promise((resolve) => setTimeout(resolve, timePerNode));
        }

        setIsRunning(false);
        const totalTime = (totalSteps * timePerNode) / 1000;
        setTimeTaken(totalTime.toFixed(2));
        setActiveIndexes([]);
    };

    const distributeData = () => {
        const shardSize = Math.ceil(dataNodes.length / shards);
        return Array.from({ length: shards }, (_, i) =>
            dataNodes.slice(i * shardSize, (i + 1) * shardSize)
        );
    };

    return (
        <Simulation>
            <div className="mb-4 space-x-2">
                <Button onClick={handleIncreaseShards} disabled={isRunning}>
                    Increase Shards
                </Button>
                <Button onClick={handleDecreaseShards} disabled={isRunning}>
                    Decrease Shards
                </Button>
                <Button onClick={handleRunQuery} disabled={isRunning}>
                    Run Query
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {distributeData().map((data, shardIndex) => (
                    <Shard
                        key={shardIndex}
                        data={data}
                        activeIndex={activeIndexes[shardIndex]}
                    />
                ))}
            </div>
            {timeTaken && (
                <div className="mt-4 p-2 bg-yellow-100 border border-yellow-400 rounded-lg">
                    Query completed in {timeTaken} seconds.
                </div>
            )}
        </Simulation>
    );
};

const DataShardingTopic = () => (
    <SectionPagination>
        <section>
            <Heading>Understanding Data Sharding in System Design</Heading>
            <Paragraph>
                In this lesson, you&apos;ll learn about data sharding and how it improves the performance of distributed databases.
            </Paragraph>
        </section>
        <section>
            <ShardingSimulation />
        </section>
        <section>
            <Quiz
                question="What is the primary benefit of sharding?"
                choices={["Scalability", "Redundancy", "Speed"]}
                correctAnswer="Scalability"
                explanations={[
                    "Sharding primarily improves scalability by distributing data across multiple databases, allowing for more efficient data management and query performance."
                ]}
            />
        </section>
        <section>
            <Heading>Sharding Techniques Sample Lesson</Heading>
            <Paragraph>
                In this lesson, you&apos;ll learn about data sharding and how it improves the performance of distributed databases.
            </Paragraph>
            <CodeBlock>
                <div>shardSize = Math.ceil(totalNodes / shards);</div>
                <div>shardSize = Math.ceil(totalNodes / shards);</div>
            </CodeBlock>
        </section>
    </SectionPagination>
);

export default DataShardingTopic;
