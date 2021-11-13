import React from 'react'
class MyApp extends React.Component {
    async componentDidMount() {
        let result = await import('@widgetbot/crate')
        const Crate = await result.cdn();

        const myCrate = new Crate({
            server: '299881420891881473',
            channel: '355719584830980096'
        })
    }
}

export default MyApp
