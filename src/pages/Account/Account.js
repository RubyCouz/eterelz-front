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

// Mettre la date en forme
const date = (date) => {
  const dateObjet = new Date(date)
  const options = {year: "numeric", month: "numeric", day: "numeric"};
  return dateObjet.toLocaleString("fr-FR", options)
}

// Fonction pour calculer le temps entre deux date
const time = (date) => {
  const nowTime = new Date()
  const inscDate = new Date(date)

  let difference = nowTime - inscDate


  let resultat
  
  
  if ( difference ) {
    if ( difference / ( 1000 * 3600 * 730 * 365 ) >= 1 ) {
      resultat = `${ Math.trunc( difference / ( 1000 * 3600 * 730 * 365 ) ) } ans`
    } else if ( difference / ( 1000 * 3600 * 730 ) >= 1 ) {
      resultat = `${ Math.trunc( difference / ( 1000 * 3600 * 730 ) ) } mois`
    } else {
      resultat = `${ Math.trunc( difference / ( 1000 * 3600 * 24 ) ) } jours`
    }
  }


  return difference ? resultat : date
}

const templateData = {
  index : {
      0 : {
          name : 'Résumé du compte',
          content : {
              user_login : {
                  nameColumn : 'Utilisateur',
                  modifiedValue : false,
              },
              /*userDescription : {
                  nameColumn : "Description",
              },*/
              updatedAt : {
                  nameColumn : 'Date de mise à jour du compte',
                  modifiedValue : false,
                  process: time,
              },
              createdAt : {
                  nameColumn : 'Date inscription',
                  modifiedValue : false,
                  process: date,
              },
          /*  userLabels : {
              nameColumn : "Les labels",
              modifiedValue : false,
              content: {
                labelName: {
                  nameColumn : "Label",
                  modifiedValue : false,
                },
              },
            },*/
          },
      },
      1 : {
          name : 'Données personnels',
          content : {   
              user_email : {
                  nameColumn : 'Adresse email',
                  regex : 'email',
              },
              user_gender : {
                  nameColumn : 'Genre',
              },
              user_address : {
                  nameColumn : 'Adresse',
              },
              user_zip : {
                  nameColumn : 'Code postale',
              },
              user_city : {
                  nameColumn: 'Ville',
              },
              user_state : {
                  nameColumn: 'Pays',
              },
          }
      },
      2 : {
          name : 'Réseaux social',
          content : {
              user_discord : {
                  nameColumn : 'Discord',
              },
          }
      },
      3 : {
        name : 'Confidentialité',
        content : {
          user_password : {
            nameColumn : 'Mot de passe',
            regex : 'password',
          },
        }
    },
  },
}

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
  const [getUser, { data }] = useLazyQuery(USER)

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
              label = { valueObject[ 'name' ] }
              key = { keyObject }
              { ...a11yProps( parseInt( keyObject ) ) } 
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

      Object.entries( templateData[ "index" ] ).forEach(
        ( [ keyObject, valueObject ] ) => {


          const windowData = templateData[ "index" ][ keyObject ].content


          let tabPaneldata = []

          if (data){
            Object.entries( windowData ).forEach(
              ( [ windowKey, valueObject2 ] ) => {
                if (data.user[ windowKey ]) {
                  let objet = {}
                  objet =  windowData[ windowKey ]
                  objet[ 'queryName' ] = windowKey 
                  objet[ 'data' ] = data.user[ windowKey ]
                  tabPaneldata.push(objet)
                }
              }
            )
          }
          
          tabsPanels.push(
            <TabPanel
              key = { keyObject }
              value = { currentIndex }
              index = { parseInt( keyObject ) }
              data = { tabPaneldata }
              idUser = { id }
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
              direction = 'column'
              justify = 'center'
              alignItems = 'center'
          >
              <Tabs
                onChange = { handleChange }
                aria-label = 'Vertical tabs'
                //className = { classes.tabs }
                variant = 'scrollable'
                scrollButtons = 'auto'
                value = { currentIndex }
              >
                { tabs }
              </Tabs>
              { tabsPanels }
          </Grid>
        </Box>
      </>
  )
}