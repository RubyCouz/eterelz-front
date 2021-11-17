import React, {useEffect, useState} from 'react'
import './WidgetDiscord.css'

export default function WidgetDiscord() {

    return (
        <div>
            <iframe src="https://discord.com/widget?id=326099902037884940&theme=dark"
                    allowTransparency="true"
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    className="widgetDiscord"
            />
        </div>

    )
}
