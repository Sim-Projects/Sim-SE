import { ReactNode, Suspense } from "react";

export const lazyComponentToReactNode = (LazyComponent: React.LazyExoticComponent<React.ComponentType<any>>): ReactNode => (
    <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
    </Suspense>
);
