import React, {
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
    Switch,
} from '@material-ui/core'

import {
    gql,
    useMutation
} from '@apollo/client'

import CreateIcon from '@material-ui/icons/Create'

export default function TableRowEdit(props) {

    const {queryName, nameColumn, modifiedValue, idUser, data, processDisplay, regex} = props

    const [showField, setShowField] = useState(false)
    const ShowField = () => {
        setShowField(!showField)
    }

    //Champ du text
    let [entryValue, setEntryValue] = useState()

    const changeField = (event) => {
        setEntryValue(event.target.value)
    }

    // Actualise la valeur et peu utiliser processDisplay pour la mise en forme  
    useEffect(
        () => {
            let value = data
            if (processDisplay) {
                value = processDisplay(value)
            }
            setEntryValue(value)
        },
        [data, processDisplay]
    )

    //Query générée pour le champ
    const UPDATE_VAR = gql`
        mutation ($id: ID!, $var: UserUpdateInput){
            updateUser(_id: $id, updateUserInput: $var){
                ${queryName}
            }
        }
    `

    //Mutation
    const [sendValidData] = useMutation(UPDATE_VAR, {
        onCompleted: (dataUpdate) => {
            if (dataUpdate.updateUser) {
                // //A modifier (mettre dans le template) (WIP)
                // if (typeof entryValue === 'boolean') {
                //     //Comment faire mieux
                //     if (queryName === 'user_isDark'){
                //         changeTheme.theme(entryValue)
                //     }
                //     /*if (processAfterSend){
                //         processAfterSend(valueBoolean)
                //     }*/
                // }
                setError(<Typography>Changement effectué</Typography>)
            } else {
                setError(<Typography>Erreur</Typography>)
            }
        },
        update: (cache) => {
            // Mise a jour du cache avant de recevoir la valeur
            const dataCache = typeof entryValue === 'boolean' ? !entryValue : entryValue

            cache.writeFragment({
                id: `User:${idUser}`,
                fragment: gql`
                    fragment MyTodo on User {
                    ${queryName}
                    }
                `,
                data: {
                    [queryName]: dataCache,
                },
            })
        },
    })

    //Temporaire (WIP)
    const [error, setError] = useState()

    //Verification avant l'envoie de la mutation
    function sendData() {
        setShowField(false)

        let error = false
        let errorText = []
        let sendData

        if (typeof entryValue === 'boolean') {
          sendData = !entryValue
        } else {
          sendData = entryValue
        }

        if (sendData === data) {
            errorText.push(<Typography>Même valeur, aucune modification n'a été effectué</Typography>)
            error = true
        } else if (sendData === null || sendData === '' || sendData === undefined) {
            errorText.push(<Typography>Aucune donnée, la modification est refusée</Typography>)
            error = true
        } else if (regex) {
            console.log("test")
            if (!regex.regex.test(sendData)) {
                errorText.push(<Typography>{regex.message}</Typography>)
                error = true
            }
        }

        if (error) {
            setError(errorText)
            setEntryValue(data)
        } else {
            //optimisticResponse s'occupe de changer data si la mutation a une erreur
            sendValidData({
                optimisticResponse: {
                    updateUser: {
                      id: idUser,
                      __typename: "User",
                      [queryName] : sendData
                    }
                },
                variables: {
                    id: idUser,
                    var: {
                        [queryName] : sendData
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
                            }}
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