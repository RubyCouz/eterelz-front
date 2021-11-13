import React, {Suspense, lazy} from 'react'
import Loading from './pages/Loading'
const Index = lazy(() => import('./pages/Index'))

const widget = async () => {
    let result = await import('@widgetbot/crate')
    const Crate = await result.cdn();

    return new Crate({
        server: '299881420891881473',
        channel: '355719584830980096',
        location: ['bottom', 'right']
    })
}


export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            {widget}
            <Index/>
        </Suspense>
    )
}