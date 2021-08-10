import React, {
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import {
  gql,
  useLazyQuery,
} from '@apollo/client'
import AuthContext from '../../context/auth-context'
import {
  Tabs,
  Tab,
  Grid,
  Box,  
} from '@material-ui/core'

import AuthNavbar from '../../Components/Navbar/AuthNavbar'

import TabPanel from './TabPanel'
import AvatarContext from '../../context/avatar-context'

import { templateData } from '../../Data/template-account'

const USER = gql`
  query USER( $id: ID!){
    user(_id: $id ){
      _id
      user_login
      user_email
      user_password
      user_discord
      user_address
      user_zip
      user_city
      user_gender
      user_state
      user_isDark
      createdAt
      updatedAt
    }
  }
`

export default function Account() {
    
  const authContext = useContext(AuthContext)

  // On attend que le context soit défini
  const id = authContext.playload ? authContext.playload.userId : false
  //Requête
  const [getUser, { data }] = useLazyQuery(USER,{
    fetchPolicy: "no-cache"})

  const avatar = useContext(AvatarContext)
  //Requête executé si l'id a une valeur et change
  useEffect(() => {

    const avatarId = avatar.avatar ? avatar.avatar.id : false

    if (avatarId) {
      getUser({
        variables: { id: avatarId },
      })
    } else if (id) {
      getUser({
        variables: { id },
      })
    }
  }, [id] )

  const [ currentIndex, setCurrentIndex]  = useState(0);
  const handleChange = (event, newValue) => { 
    setCurrentIndex(newValue);
  }
  // Création des onglets au premier cycle
  const tabs = useMemo(
    () => {
      function a11yProps(index) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        }
      }

      let tabs = []

      Object.entries( templateData[ 'index' ] ).forEach(
        ([keyObject, valueObject]) => {
          tabs.push(
            <Tab
              label={ valueObject[ 'name' ]}
              key={ keyObject }
              {...a11yProps( parseInt( keyObject ))}
            />
          )
        }
      )
      return tabs
    }
    , []
  )
  //Création des fenêtres de contenue
  const tabsPanels = useMemo(
    () => {
      let tabsPanels = []

      Object.entries(templateData[ "index" ]).forEach(
        ([keyObject, valueObject]) => {

          const windowData = templateData[ "index" ][ keyObject ].content
          let tabPaneldata = []

          if (data){
            Object.entries( windowData ).forEach(
              ( [ windowKey, valueObject2 ] ) => {
                if (data.user[ windowKey ] !== null) {
                  let objet = {}
                  objet =  windowData[ windowKey ]
                  objet['queryName'] = windowKey
                  objet['data'] = data.user[ windowKey ]
                  tabPaneldata.push(objet)
                }
              }
            )
          }
          
          tabsPanels.push(
            <TabPanel
              key={ keyObject }
              value={ currentIndex }
              index={ parseInt( keyObject ) }
              data={ tabPaneldata }
              idUser={ id }
              /*defaultValue = { data }
              setDefaultValue = { setData }*/
            />
          )
        } 
      )
      return tabsPanels
    }
    , [ data, currentIndex, id ]
  )

  return(
      <>
        <AuthNavbar/>
        <Box>
          <Grid
              container
              direction="column"
              justify="center"
              alignItems= "center"
          >
              <Tabs
                onChange={ handleChange }
                aria-label="Vertical tabs"
                //className = { classes.tabs }
                variant="scrollable"
                scrollButtons="auto"
                value={ currentIndex }
              >
                { tabs }
              </Tabs>
              { tabsPanels }
          </Grid>
        </Box>
      </>
  )
}