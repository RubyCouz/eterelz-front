import React from 'react'
import {io} from 'socket.io-client'
import {SOCKET_HOST} from '../config'

export const socket = io(SOCKET_HOST,
    {
        transports: ["websocket"]
    }
    )
export const SocketContext = React.createContext(socket)