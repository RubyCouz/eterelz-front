import { useState, useEffect } from "react"

export default function useAuth() {

    const [loading, setLoading] = useState(true)

    const [auth, setState] = useState({
        token: null,
        playload: null,
    })

    useEffect(() => {
        const tokenStorage = window.localStorage.getItem('token');
        login(tokenStorage)
        setLoading(false)
    }, [])


    const login = (token, userId, userRole) => {
        if (token) {
            const arrayJWT = token.split('.')
            const playload = JSON.parse(window.atob(arrayJWT[1]))

            window.localStorage.setItem('token', token)
            let darkModeLS = window.localStorage.getItem('darkMode')
            
            window.localStorage.setItem('darkMode',darkModeLS ? darkModeLS : playload.user_isDark )

            setState({
                token: token,
                playload: playload,
            })
        }
    }

    const logout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('darkMode')

        setState({
            token: null,
            playload: null
        })
    }

    return [auth, login, logout, loading]
}