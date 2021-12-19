const templateRegex = {
    pseudo : {
        regex : new RegExp("^[^@&\"()<>!_$*€£`+=\\/;?#]+$"),
        message : "Caractères spéciaux non autorisés dans le pseudo",
        message_empty: "Vous devez remplir ce champs,"
    },
    email : {
        regex : new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$"),
        message : "Email non valide",
        message_empty: "Vous devez remplir ce champs,"
    },
    password : {
        regex : new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"),
        message : "Mot de passe doit contenir 8 caractères, une majuscule, une minuscule et un chiffre",
        message_empty: "Vous devez remplir ce champs,"
    },
    confirmPassword : {
        regex : new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"),
        message : "Mot de passe doit contenir 8 caractères, une majuscule, une minuscule et un chiffre",
        message_empty: "Vous devez remplir ce champs,"
    },
}

export default templateRegex