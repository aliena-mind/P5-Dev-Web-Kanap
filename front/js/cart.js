// sauvegarde du panier
function sauvegarderPanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier)); // sauvegarde le panier sur le localStorage 
}

// récupération du panier
function recupererPanier() {
    let panier = localStorage.getItem("panier"); // récupère le contenu du localStorage et le stocke dans 'panier'

    if (panier == null) {           // si panier  null renvoi []
        return [];          
    }
    else {                          // sinon 
        return JSON.parse(panier);  // transforme le JSON en java script 
    }
}