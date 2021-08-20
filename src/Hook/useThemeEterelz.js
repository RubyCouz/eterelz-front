
import DarkTheme from "../Themes/Dark"
import LightTheme from "../Themes/Light"

import { useState } from "react"

export default function useThemeEterelz() {

    const [theme, setDarkMode] = useState(LightTheme)

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
