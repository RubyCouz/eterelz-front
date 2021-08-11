
import DarkTheme from "../Themes/Dark"
import LightTheme from "../Themes/Light"

import { useState, useEffect } from "react"

export default function useThemeEterelz() {

    const [darkState, setDarkMode] = useState(false)

    const setTheme = (boolean) => {
        let booleanDarkMode = boolean
        if (typeof booleanDarkMode === 'string') {
            booleanDarkMode = (boolean === 'true')
        }

        setDarkMode(booleanDarkMode)
        
        window.localStorage.setItem('darkMode', booleanDarkMode)
    }

    useEffect(() => {
        let darkModeLS = window.localStorage.getItem('darkMode')
        
        darkModeLS && setTheme(darkModeLS)
    }, [])

    const theme = darkState ? DarkTheme : LightTheme

    return [theme, setTheme]
}
