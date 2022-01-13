import React from 'react'
import Avatar from '@mui/material/Avatar'
export default function RenderPic (props) {
    return (
        <div>
            {
                props.params.value !== '' &&
                    props.params.value !== null &&
                    props.params.value !== undefined ?
                    <Avatar
                        src={props.host + "/Upload/" + props.folder + "/" + props.params.value}
                        alt={props.params.value}
                        title={props.host + "/Upload/" + props.folder + "/" + props.params.value}
                        variant={props.params.field === 'user_avatar' ? 'circular' : 'rounded'}
                        onClick={() => {
                            props.handleModalPic(props.params)
                        }}/> :
                    <Avatar
                        src={props.host + "/Upload/default.gif"}
                        alt={props.params.value}
                        title={props.title}
                        onClick={() => {
                            props.handleModalPic(props.params)
                        }}/>
            }
        </div>
    )
}