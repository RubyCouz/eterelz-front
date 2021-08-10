import processDisplayFormatDate from "../Tools/FormatDate"
import processDisplayDiffTime from "../Tools/DiffTime"

/*
const processAfterSendModifiedTheme = (valueBoolean) => {
    const changeTheme = useContext(ThemeContext)
    changeTheme.theme(valueBoolean)
}*/
  
export const templateData = {
    index : {
        0 : {
            name: 'Paramêtres du compte',
            content : {
                user_isDark: {
                    nameColumn: 'Mode dark',
                    //processAfterSend: processAfterSendModifiedTheme,
                }
            }
        },
        1 : {
            name : 'Résumé du compte',
            content : {
                user_login : {
                    nameColumn : 'Utilisateur',
                },
                /*userDescription : {
                    nameColumn : "Description",
                },*/
                updatedAt : {
                    nameColumn : 'Date de mise à jour du compte',
                    modifiedValue : false,
                    processDisplay: processDisplayDiffTime,
                },
                createdAt : {
                    nameColumn : 'Date inscription',
                    modifiedValue : false,
                    processDisplay: processDisplayFormatDate,
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
        2 : {
            name : 'Données personnelles',
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
        3 : {
            name : 'Réseaux sociaux',
            content : {
                user_discord : {
                    nameColumn : 'Discord',
                },
            }
        },
        4 : {
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