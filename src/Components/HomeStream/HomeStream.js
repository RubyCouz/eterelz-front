import React from 'react'
import ReactPlayer from 'react-player'
export default function HomeStream(props) {

    return (
        <div>
            <ReactPlayer
                url={props.url}
                playing={true}
                muted={true}
                width="100%"
                height="100%"
            />
        </div>
    )
}