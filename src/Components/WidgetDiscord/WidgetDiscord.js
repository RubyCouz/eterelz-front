import React from 'react'
import './WidgetDiscord.css'

export default function WidgetDiscord() {

    return (
        <iframe src="https://discord.com/widget?id=326099902037884940&theme=dark"
                allowTransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="widgetDiscord"
                title="Widget Discord"
        />
    )
}
