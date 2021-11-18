import React, {Suspense, lazy, useState, useEffect} from 'react'
import Loading from './pages/Loading'

const Index = lazy(() => import('./pages/Index'))

export default function App() {

    let [crate] = useState()

    const widget = async (crate) => {
        let result = await import('@widgetbot/crate')
        const Crate = await result.cdn();

        crate = new Crate({
            server: '326099902037884940',
            channel: '670890139438022687',
            location: ['bottom', 'right'],
            notifications: true,
            indicator: true,
        })
    }

    useEffect(() => {
        widget(crate)
    }, [crate]
    )

    return (
        <Suspense fallback={<Loading/>}>
            {crate}
            <Index/>
        </Suspense>
    )
}