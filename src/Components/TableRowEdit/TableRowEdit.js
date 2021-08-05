import React, {
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'

import {
    TextField,
    Typography,
    TableRow,
    TableCell,
    CircularProgress,
    Chip,
} from '@material-ui/core'

import {
    gql,
    useMutation
} from '@apollo/client'

import CreateIcon from '@material-ui/icons/Create'
import templateRegex from '../../Data/template-regex'
import xtype from 'xtypejs'
import Switch from "@material-ui/core/Switch"
import ThemeContext from '../../context/theme-context'
export default function TableRowEdit(props) {

    const {queryName, nameColumn, modifiedValue, idUser, data, setDefaultValue, process, regex} = props

    const [showField, setShowField] = useState(false)
    const ShowField = () => {
        setShowField(!showField)
    }

    //Champ du text
    let [entryValue, setEntryValue] = useState()

    const changeField = (event) => {
        setEntryValue(event.target.value)
    }

    // Actualise les valeur utilise le process si disponible
    useEffect(
        () => {
            let value = data
            if (process) {
                value = process(value)
            }
            setEntryValue(value)
        },
        [data]
    )
    //Query générée pour le champ
    const UPDATE_VAR = gql`
        mutation ($id: ID!, $var: UserUpdateInput){
            updateUser(_id: $id, updateUserInput: $var){
                ${queryName}
            }
        }
    `;

    //Mutation
    const [sendValidData] = useMutation(UPDATE_VAR,
        {
            onCompleted: (dataUpdate) => {
                if (dataUpdate.updateUser) {
                    //setEntryValue(dataUpdate.updateUser[queryName])
                    //Il faudrait data = entryValue
                    setError(<Typography>Changement effectué</Typography>)
                } else {
                    setError(<Typography>Erreur</Typography>)
                }
            }
        })

    const changeTheme = useContext(ThemeContext)
    //Temporaire
    const [error, setError] = useState()

    //Verification avant l'envoie de la mutation
    function sendData() {
        setShowField(false)

        let error = false
        let errorText = []
        if (typeof entryValue === 'boolean') {
            entryValue = !entryValue
            setEntryValue(entryValue)
            changeTheme.theme()
        } else if (entryValue === data) {
            errorText.push(<Typography>Même valeur, aucune modification n'a été effectué</Typography>)
            error = true
        } else if (entryValue === null || entryValue === '' || entryValue === undefined) {
            errorText.push(<Typography>Aucune donnée, la modification est refusée</Typography>)
            error = true
        } else if (templateRegex[regex]) {
            if (!templateRegex[regex].regex.test(entryValue)) {
                errorText.push(<Typography>{templateRegex[regex].message}</Typography>)
                error = true
            }
        }

        if (error) {
            setError(errorText)
            setEntryValue(data)
        } else {
            sendValidData({
                variables: {
                    id: idUser,
                    var: {
                        [queryName] : entryValue
                    },
                },
            })
        }
    }

    //Touche entrée
    function handleKeyPress(e) {
        if (e.keyCode === 13) {
            e.target.blur()
        }
    }

    console.log(typeof entryValue)
    return (
        <TableRow
            hover
            key={queryName}
            onClick={!(modifiedValue === false) && !showField ? ShowField : undefined}
        >
            <TableCell
                component="th"
                scope="row"
            >
                {nameColumn}
            </TableCell>
            <TableCell
                align="right"
            >
                {
                    typeof entryValue === 'boolean' ?
                        <Switch
                            onChange={() => {
                                sendData()
                            }
                            }

                            checked={entryValue}
                            color="default"
                            inputProps={{'aria-label': 'checkbox with default color'}}
                        />
                        :
                        entryValue !== undefined ?
                            showField ?
                                <TextField
                                    fullWidth={true}
                                    value={entryValue}
                                    onChange={changeField}
                                    autoFocus
                                    onBlur={() => {
                                        sendData()
                                    }}
                                    onKeyDown={handleKeyPress}
                                    size="small"
                                />
                                :
                                Array.isArray(entryValue) ?
                                    entryValue.map(element => <Chip label={element}/>)
                                    :
                                    <Typography>{entryValue}</Typography>
                            :
                            <CircularProgress size={15}/>
                }
            </TableCell>
            <TableCell
                style={{width: 20}}
                size="small"
                padding="default"
            >
                {
                    typeof entryValue !== 'boolean' ??
                    !(modifiedValue === false) ?
                        <CreateIcon fontSize="small"/>
                        :
                        undefined
                }
            </TableCell>
            <TableCell
                size="small"
                padding="default"
            >
                {error}
            </TableCell>
        </TableRow>
    )
}