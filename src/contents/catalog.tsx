import { lazy } from "react"

const topicsRegistry: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
    "Data_Sharding": lazy(() => import('@/contents/topics//Data_Sharding')),
};

export default {
    topics: [
        {
            id: "Data_Sharding",
            title: "Data Sharding",
            component: topicsRegistry["Data_Sharding"]
        }
    ]
}
