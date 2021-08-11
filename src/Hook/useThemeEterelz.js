
import DarkTheme from "../Themes/Dark"
import LightTheme from "../Themes/Light"

import { useState } from "react"

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

    const theme = darkState ? DarkTheme : LightTheme

    return [theme, setTheme]
}
