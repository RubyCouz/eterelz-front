//Donne la date au format FR

export default function formatDate (date){
    const dateObjet = new Date(date)
    const options = {year: "numeric", month: "numeric", day: "numeric"};
    return dateObjet.toLocaleString("fr-FR", options)
}