import { lazy } from "react"

const topicsRegistry: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
    "Data_Sharding": lazy(() => import('@/contents/topics/Data_Sharding')),
    "Caching": lazy(() => import('@/contents/topics/Caching/Caching'))
};

export default {
    topics: [
        {
            id: "Data_Sharding",
            title: "Data Sharding",
            thumbnail: "/Data_Sharding.png",
            description: "Database sharding is the process of storing a large database across multiple machines. A single machine, or database server, can store and process only a limited amount of data. Database sharding overcomes this limitation by splitting data into smaller chunks, called shards, and storing them across several database servers. All database servers usually have the same underlying technologies, and they work together to store and process large volumes of data.",
            level: "3",
            tags: ["Database", "Sharding"],
            component: topicsRegistry["Data_Sharding"]
        },
        {
            id: "Caching",
            title: "Caching: The Secret Weapon of High-Performance Software",
            thumbnail: "/Data_Sharding.png",
            description: "Caching description",
            level: "1",
            tags: ["System Design", "Caching"],
            component: topicsRegistry["Caching"]
        }
    ]
}
