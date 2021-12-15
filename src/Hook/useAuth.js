import {useState, useEffect, useCallback, useMemo} from 'react'
import {Cookies} from 'react-cookie'

export default function useAuth(callback, deps) {

    const [auth, setState] = useState({
        token: false,
        accesToken: null,
        playload: null,
    })

    const [loading, setLoading] = useState(true)

    const cookies = useMemo(() => new Cookies(), [])

    const logout = useCallback(() => {
            window.localStorage.removeItem('darkMode')
            cookies.remove("jwt_HP")

            setState({
                token: false,
                playload: null
            })
        }, [cookies]
    )

    const login = useCallback(() => {
        const refreshToken = cookies.get("jwt_HP_RT")
        const token = cookies.get("jwt_HP")

        // Si on a aucun cookie on force la suppression de tout les élements de connection
        if (token === undefined && refreshToken === undefined) {
            logout()
            return
        }

        let data

        if (token !== undefined) {
            data = token
        } else if (refreshToken !== undefined) {
            data = refreshToken
        }

        //Si on a un token
        if (data) {
            const arrayJWT = data.split('.')
            const playload = JSON.parse(window.atob(arrayJWT[1]))

            let darkModeLS = window.localStorage.getItem('darkMode')
            darkModeLS === 'null' && window.localStorage.setItem('darkMode', playload.user_isDark)

            setState({
                token: true,
                playload: playload,
            })
        }
    }, [cookies, logout])

    useEffect(() => {
        login()
        setLoading(false)
    }, [login])


    return [auth, login, logout, loading]
}