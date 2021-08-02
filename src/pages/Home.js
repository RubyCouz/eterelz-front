import React, {useState} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import {createMuiTheme} from "@material-ui/core/styles";
import {blue, deepPurple, lightBlue, purple, red} from "@material-ui/core/colors";
export default function Home(props) {
    const [darkState, setDarkMode] = useState(false);
    const theme = createMuiTheme({
        palette: {
            type: darkState ? 'dark' : 'light',
            primary: {
                main: darkState ? purple[600] : blue[600]
            },
            secondary: {
                main: darkState ? lightBlue[600] : deepPurple[500]
            },
            status: {
                error: darkState ? red[600] : red[400]
            },
        }
    })
    const handleMode = () => {
        setDarkMode(!darkState)
        console.log(darkState)
    }
    return (
        <Navbar theme={theme} changeMode={handleMode}/>
    )
}