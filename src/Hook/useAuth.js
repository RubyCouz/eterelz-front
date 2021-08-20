import { useState, useEffect} from "react"
import { Cookies } from 'react-cookie'

export default function useAuth() {

    const [loading, setLoading] = useState(true)

    const [auth, setState] = useState({
        token: false,
        playload: null,
    })
    const cookies = new Cookies

    useEffect(() => {
        login()
        setLoading(false)
    }, [])

    const login = () => {
        const cookie = cookies.get("jwt_HP")
        if (cookie !== undefined) {
            const arrayJWT = cookie.split('.')
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