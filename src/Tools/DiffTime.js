// Calcule la différence entre maintenant et la date en paramètres 

export default function diffTime (date){
    const nowTime = new Date()
    const inscDate = new Date(date)
  
    let difference = nowTime - inscDate
  
    let resultat
    
    if (difference) {
      if (difference / (1000 * 3600 * 730 * 365) >= 1) {
        resultat = `${ Math.trunc( difference / (1000 * 3600 * 730 * 365))} ans`
      } else if (difference / ( 1000 * 3600 * 730) >= 1 ) {
        resultat = `${ Math.trunc(difference / (1000 * 3600 * 730))} mois`
      } else {
        resultat = `${ Math.trunc(difference / (1000 * 3600 * 24))} jours`
      }
    }
  
    return difference ? resultat : date
}