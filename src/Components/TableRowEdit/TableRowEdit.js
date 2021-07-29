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


export default function TableRowEdit(props) {

  //const { nameQuery, tableRowOption , idUser, defaultValue, setDefaultValue } = props
  const { nameQuery, nameColumn, modifiedValue, idUser, data, setDefaultValue, process } = props

  //const { ModalAlertSetData } = useContext( AccountContext );
  const [ showField, setShowField ] = useState(false)
  const ShowField = () => {
    setShowField( !showField )
  }

  const [ entryValue, setEntryValue ] = useState()

  // Actualise la value entrée grâce au context value
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

  // Modifie le champs
  const changeField = (event)=> {
    setEntryValue(event.target.value)
  }

  /*
  // Envoie de la données modifier vers l'api
  const sendData = () => {

    setShowField( !showField )

    if ( entryValue === defaultValue[nameQuery] ) {
      ModalAlertSetData({
        severity: "error",
        data: <Typography>Même valeur, aucune modification a était effectuée</Typography>
      })
      return
    } else if ( !entryValue ) {
      ModalAlertSetData({
        severity: "error",
        data: <Typography>Aucune donnée impossible, modification refusé</Typography>
      })
      setEntryValue(defaultValue[nameQuery])
      return
    }
    const valueData = typeof entryValue === "string" ? `"${entryValue}"` : entryValue
    const queryColumnMutation = `${ nameQuery } : ${ valueData }`


    const axios = require('axios').default;
    axios({
        data: {
            query: `
                mutation{
                    updateEterUser(
                        input:{
                          id: "${ idUser }"
                          ${ queryColumnMutation }
                        }
                    )
                    {
                        eterUser{userMail}
                    }
                }
            `
        },
        method: 'post',
        url: 'https://localhost:8000/api/graphql',
    })
    .then( ( data ) => {
        if(data.data.errors){
          throw new Error();
        } else {
          ModalAlertSetData({
            severity: "success",
            data: <Typography>Modification effectuée</Typography>
          })
          setDefaultValue( { ...defaultValue, [nameQuery]:entryValue} )
        }
    })
    .catch( () => {
        ModalAlertSetData({
            severity: "error",
            data: <Typography>Les modification n'ont pas pu êtres valider</Typography>
        })
        setEntryValue(defaultValue[nameQuery])
    })

  }
  */

  function sendData() {

  }

/*
  const GET_ = gql`
    mutation($id: ID!, $type: String!){
        updateEterUser(
            input:{
              id: ${ idUser }
              ${ queryColumnMutation }
            }
        )
        {
            eterUser{userMail}
        }
    }
  `



  const [mutate, { data, error }] = useMutation(
    ADD_TODO,
    {
      update (cache, { data }) {
        // We use an update function here to write the 
        // new value of the GET_ALL_TODOS query.
        const newTodoFromResponse = data?.addTodo.todo;
        const existingTodos = cache.readQuery<GetAllTodos>({
          query: GET_ALL_TODOS,
        });

        if (existingTodos && newTodoFromResponse) {
          cache.writeQuery({
            query: GET_ALL_TODOS,
            data: {
              todos: [
                ...existingTodos?.todos,
                newTodoFromResponse,
              ],
            },
          });
        }
      }
    }
  )

*/

/*
  const CREATE_EVENTS = gql`
      mutation CreateEvent($id: ID!) {
          createEvent(
            eventInput: {
              _id: $id
            }
          )
          {
            _id
          }
      }
  `;

  const [modalConfirmHandler] = useMutation(
    CREATE_EVENTS,
    {
        onCompleted: (dataMutationEvent) => {
          if (dataMutationEvent.createEvent !== undefined) {
              let listEvents = state.events

              listEvents.push(dataMutationEvent.createEvent)
              setState({...state, events : listEvents})

              modalCancelHandler()
          }
        }
    }
  )
*/



  function handleKeyPress(e){
    if(e.keyCode === 13) {
      e.target.blur()
    }
  }

  return (
    <TableRow
      hover
      key = { nameQuery }
      onClick = { !( modifiedValue === false) ? ShowField : undefined }
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
                onBlur = { sendData }
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
    </TableRow>
  )
}