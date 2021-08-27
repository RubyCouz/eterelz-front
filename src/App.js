import React, {Suspense, lazy} from 'react'
import Loading from './pages/Loading';
const Index = lazy(() => import('./pages/Index'));

export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Index/>
        </Suspense>
    )
}