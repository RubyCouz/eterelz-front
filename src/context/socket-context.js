import React from 'react'
import {io} from 'socket.io-client'
import {HOST} from '../config'

export const socket = io(HOST)
export const SocketContext = React.createContext(socket)