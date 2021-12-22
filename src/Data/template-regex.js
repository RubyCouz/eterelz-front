const templateRegex = {
    /**
     * form User
     */
    pseudo: {
        regex: new RegExp('^[^@&\'()<>!_$*€£`+=\\/;?#]+$'),
        message: 'Caractères spéciaux non autorisés dans le pseudo',
        message_empty: 'Vous devez remplir ce champs'
    },
    email: {
        regex: new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$'),
        message: 'Email non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    password: {
        regex: new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),
        message: 'Mot de passe doit contenir 8 caractères, une majuscule, une minuscule et un chiffre',
        message_empty: 'Vous devez remplir ce champs'
    },
    confirmPassword: {
        regex: new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),
        message: 'Mot de passe doit contenir 8 caractères, une majuscule, une minuscule et un chiffre',
        message_empty: 'Vous devez remplir ce champs'
    },
    discord: {
        regex: new RegExp('^(([\\wàâäéèëêùûüìîïòôöçãñõ\\-\\_\\[\\]\\(\\)\\{\\}\\s\\/\\\\`\\\'\\!\\?\\|]+?)#\\d{4}$)'),
        message: 'Identifiant discord non valide. L\'identifiant discord doit être sous la forme "exemple#1234"',
        message_empty: 'Vous devez remplir ce champs'
    },
    address: {
        regex: new RegExp('^[\\wàâäéèëêùûüìîïòôöçãñõ\\-\\s]+$'),
        message: 'Adresse non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    zip: {
        regex: new RegExp('^[\\d]{5}$'),
        message: 'Code postal non valide. Le code postal doit être composé de 5 chiffres',
        message_empty: 'Vous devez remplir ce champs'
    },
    city: {
        regex: new RegExp('^[\\wàâäéèëêùûüìîïòôöçãñõ\\-\\s]+$'),
        message: 'Ville non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    role: {
        regex: new RegExp('^admin|membre$'),
        message: 'Rôle non valide ("admin" ou "membre" attendu',
        message_empty: 'Vous devez remplir ce champs'
    },
    userState: {
        regex: new RegExp('^[a-zA-Zàâäéèëêùûüìîïòôöçãñõ\\s\\-]+$'),
        message: 'Etat non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    /**
     * form Game
     */
    gameName: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Titre du jeu non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    gameDesc: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Description non valide. Certains caractères ne sont pas autorisés',
        message_empty: 'Vous devez remplir ce champs'
    },
    gamePic: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Image non valide / Format non pris en charge',
        message_empty: 'Vous devez remplir ce champs'
    },

    /**
     * form Event
     */

    eventName: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Nom invalide',
        message_empty: 'Vous devez remplir ce champs'
    },
    eventDate: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Date non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    eventDesc: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Description non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    /**
     * Clan form
     */

    clanName: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Nom de clan non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    clanDate: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Date non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    clanDesc: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Description non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    clanBanner: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Fichier non pris en charge',
        message_empty: 'Vous devez remplir ce champs'
    },
    clanDiscord: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Nom de serveur discord discord non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    clanPopulation: {
        regex: new RegExp('^[\\d]+$'),
        message: 'Seuls les nombres sont acceptés',
        message_empty: 'Vous devez remplir ce champs'
    },
    clanRecrut: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Champ non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
    clanActivity: {
        regex: new RegExp('^[\\w\\s\\\\-\\_\\*\\+\\=àâäéèëêùûüìîïòôöçãñõ\\$\\!\\:\\,\\.\\/\\?µ\\#\\~]+$'),
        message: 'Champ non valide',
        message_empty: 'Vous devez remplir ce champs'
    },
}
export default templateRegex