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
} from '@material-ui/core'

import {
  gql,
  useMutation
} from '@apollo/client'

import CreateIcon from '@material-ui/icons/Create'
import templateRegex from '../../Data/template-regex'

export default function TableRowEdit(props) {

  const { queryName, nameColumn, modifiedValue, idUser, data, setDefaultValue, process, regex } = props

  const [ showField, setShowField ] = useState(false)
  const ShowField = () => {
    setShowField( !showField )
  }

  //Champ du text
  const [ entryValue, setEntryValue ] = useState()
  const changeField = (event)=> {
    setEntryValue(event.target.value)
  }

  // Actualise les valeur utilise le process si disponible 
  useEffect(
    () => {
      let value = data
      if ( process ) {
        value = process(value)
      }
      setEntryValue(value)
    }, 
    [data]
  )

  //Query générée pour le champ
  const UPDATE_VAR = gql`
    mutation ($id: ID!, $var: String!){
      updateUser(_id: $id, updateUserInput:{ ${queryName}: $var}){
        ${queryName}
      }
    }
  `;

  //Mutation
  const [sendValidData] = useMutation(UPDATE_VAR,
    {
      onCompleted: (dataUpdate) => {
          if (dataUpdate.updateUser){
            //setEntryValue(dataUpdate.updateUser[queryName])
            //Il faudrait data = entryValue
            setError(<Typography>Donnée accepté</Typography>)
          } else {
            setError(<Typography>Erreur</Typography>)
          }
      }
    })

  //Temporaire
  const [error, setError] = useState()

  //Verification avant l'envoie de la mutation
  function sendData(){
    setShowField(false)

    let error = false
    let errorText = []

    if ( entryValue === data ) {
      errorText.push(<Typography>Même valeur, aucune modification a était effectuée</Typography>)
      error = true
    } else if ( !entryValue ) {
      errorText.push(<Typography>Aucune donnée la modification est refusé</Typography>)
      error = true
    } else if (templateRegex[regex]) {
      if (!templateRegex[regex].regex.test(entryValue)){
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
          var: entryValue,
        },
      })
    }
  }

  //Touche entrée
  function handleKeyPress(e){
    if(e.keyCode === 13) {
      e.target.blur()
    }
  }

  return (
    <TableRow
      hover
      key = { queryName }
      onClick = { !( modifiedValue === false) && !showField ? ShowField : undefined }
    >
      <TableCell
        component = "th"
        scope = "row"
      >
        { nameColumn }
      </TableCell>
      <TableCell
        align = "right"
      >
        { 
          entryValue !== undefined ?
            showField ?
              <TextField
                fullWidth = { true }
                value = { entryValue }
                onChange = { changeField }
                autoFocus
                onBlur = { () => {sendData()} }
                onKeyDown = { handleKeyPress }
                size = "small"
              />
            : 
              Array.isArray(entryValue) ? 
                entryValue.map( element => <Chip label={ element }/>)
              :
                <Typography>{ entryValue }</Typography> 
          :
            <CircularProgress size = { 15 }/>
        }
      </TableCell>
      <TableCell
        style = {{ width: 20 }}
        size = "small"
        padding= "default"
      >
        {
          !( modifiedValue === false) ? 
            <CreateIcon fontSize="small" /> 
          : 
            undefined
        }
      </TableCell>
      <TableCell
        size = "small"
        padding= "default"
      >
        {error}
      </TableCell>
    </TableRow>
  )
}