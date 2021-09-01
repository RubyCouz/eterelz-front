import { useState, useEffect} from 'react'
import { Cookies } from 'react-cookie'

export default function useAuth() {

    const [auth, setState] = useState({
        token: false,
        playload: null,
    })

    const [loading, setLoading] = useState(true)

    const cookies = new Cookies()

    useEffect(() => {
        login()
        setLoading(false)
    }, [])

    const login = () => {
        const refreshToken = cookies.get("jwt_HP_RT")
        const token = cookies.get("jwt_HP")

        // Si on a aucun cookie on force la suppression de tout les élements de connection
        if (token === undefined && refreshToken === undefined) {
            logout()
            return
        }

        let data

        if ( token !== undefined) {
            data = token
        } else if ( refreshToken !== undefined) {
            data = refreshToken
        }

        //Si on a un token
        if (data) {
            const arrayJWT = data.split('.')
            const playload = JSON.parse(window.atob(arrayJWT[1]))

            let darkModeLS = window.localStorage.getItem('darkMode')
            darkModeLS === 'null' && window.localStorage.setItem('darkMode', playload.user_isDark )
            
            setState({
                token: true,
                playload: playload,
            })
        }
    }

    const logout = () => {
        window.localStorage.removeItem('darkMode')
        cookies.remove("jwt_HP")
        cookies.remove("jwt_HP_RT")

        setState({
            token: false,
            playload: null
        })
    }

    return [auth, login, logout, loading]
}