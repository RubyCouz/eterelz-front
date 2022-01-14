import React, {useContext, useEffect, useState} from 'react'
import RenderPic from '../RenderPic/RenderPic'
import styled from '@emotion/styled'
import Badge from '@mui/material/Badge'
import {SocketContext} from '../../context/socket-context'

const statusColor = (status) => {
    console.log(status)
    let color
    status ? color = '#44b700' : color = '#ff0000'
    return color
}
export default function IsOnline(props) {
    const socket = useContext(SocketContext)
    const [state, setState] = useState({
        id: null,
        status: null
    })
    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            backgroundColor: `${
                state.id === props.userId ? statusColor(state.status) : statusColor(props.isOnline)                    
            }`,
            color: `${
                state.id === props.userId ? statusColor(state.status) : statusColor(props.isOnline)
            }`,
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }))
    useEffect(() => {
        return socket.on('isOnline', (userData) => {
            setState({
                id: userData.userId,
                status: userData.isOnline
            })
            return StyledBadge
        })
    }, [socket, StyledBadge])

    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            variant="dot"
        >
            <RenderPic
                host={props.host}
                params={props.params}
                userId={props.userId}
                folder={props.folder}
                handleModalPic={props.handleModalPic}
                title={props.title}
            />
        </StyledBadge>
    )

}