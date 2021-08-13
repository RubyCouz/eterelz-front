
import DarkTheme from "../Themes/Dark"
import LightTheme from "../Themes/Light"

import { useState, useEffect } from "react"

export default function useThemeEterelz() {

    const [theme, setDarkMode] = useState(LightTheme)

    useEffect(() => {
        const darkModeLS = window.localStorage.getItem('darkMode')
        
        darkModeLS && setTheme(darkModeLS)
    }, [])

    const setTheme = (boolean) => {
        let booleanDarkMode = boolean
        
        if (typeof booleanDarkMode === 'string') {
            booleanDarkMode = (boolean === 'true')
        }

        setDarkMode(booleanDarkMode ? DarkTheme : LightTheme)
        
        window.localStorage.setItem('darkMode', booleanDarkMode)
    }

    return [theme, setTheme]
}
