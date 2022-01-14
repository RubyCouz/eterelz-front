import React from 'react'
import {io} from 'socket.io-client'
import {HOST} from '../config'

export const socket = io(HOST, {
    transports: ["websocket"]
})
export const SocketContext = React.createContext(socket)