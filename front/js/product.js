//////////////////////// Récupération de l'id ////////////////////////////////

let url = window.location.href;                                     // récupère l'URL de la page
let objetUrl = new URL(url);                                        // crée un objet URL 'objetUrl'
let parametreDeRecherche = new URLSearchParams(objetUrl.search);    // crée un objet URLSearchParams 'parametreDeRecherche'
if(parametreDeRecherche.has('id')) {                                // recherche si 'parametreDeRecherche' contient un 'id'
  var idProduit = parametreDeRecherche.get('id');                   // définit la variable 'idProduit'     
  console.log('id = ' + idProduit)                                  // affiche dans la console 'id =' + valeur 'id'
}

//////////////////////// Manipulation du DOM ////////////////////////////////

fetch('http://localhost:3000/api/products/' + idProduit)            // lien vers API, requete GET via fetch
    .then(function(result) {
        if (result.ok) {            // si result ok
        return result.json();       // envoie la réponse au format JSON
        }
    })
    .then(function(data) {          // affiche dans la console la valeur de 'data'
        console.log(data)

        // création des éléments 
        const image = document.createElement('img');                // création d'une image
        
        // ajout des attributs
        image.src = data.imageUrl;   // définit l'attribut 'src' de l'image  
        image.alt = data.altText;    // définit l'attribut 'alt' de l'image

        // modifications innerHTML
        const paragrapheTitre = document.getElementById('title');               // définit 'paragrapheTitre' comme l'élement de classe 'title'
        paragrapheTitre.innerHTML = data.name;                                  // remplace le contenue de l'innerHTML de 'paragrapheTitre'
        const paragraphePrix = document.getElementById('price');                // définit 'paragraphePrix' comme l'élement de classe 'price'
        paragraphePrix.innerHTML = data.price;                                  // remplace le contenue de l'innerHTML de 'paragraphePrix'
        const paragrapheDescription = document.getElementById('description');   // définit 'paragrapheDescription' comme l'élement de classe 'description'
        paragrapheDescription.innerHTML = data.description;                     // remplace le contenue de l'innerHTML de 'paragrapheDescription'

        // ajout des options 
        for (let i = 0; i < data.colors.length; i++) {
            const option = document.createElement('option');                    // création d'une option
            document.querySelector('#colors').appendChild(option);              // 'option' enfant de 'colors'
            option.innerHTML = data.colors[i];                                  // 'data.colors[i]' = couleur d'index 'i' de l'élément 'data'
        }

        // lien parent/enfant
        document.querySelector('.item__img').appendChild(image);                // 'image' enfant de '.item__img'  
    })

//////////////////////////// Gestion du panier ////////////////////////////////
    
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

    // ajouter le produit au panier
    function ajouterAuPanier(produit) {
        let panier = recupererPanier();
        
        // définit 'produitExistant' comme le produit dont l'id 
        // et la couleur correspondent au 'produit' à ajouter au panier
        let produitExistant = panier.find(p => (p.id === produit.id) && (p.couleur === produit.couleur));
        
        let nombreDeProduitText = document.querySelector('input').value; // nombreDeProduitText (type: string)
        let nombreDeProduit = parseInt(nombreDeProduitText); // nombreDeProduit (type: nombre)

        if ((produitExistant) != undefined) {                   // si produitExistant est défini :
            if ((produitExistant.quantity + nombreDeProduit) <=100) {    // si nombreDeProduit inférieur ou égal à 100
                produitExistant.quantity += nombreDeProduit;    // ajouter 'nombreDeProduit' à la quantité

                alert('Le produit à été ajouté au panier');
            }
            else {
                window.alert("La quantité totale doit être comprise entre 0 - 100")
            }  
        }
        else {                                                  // sinon :
            if (nombreDeProduit <=100) {                        // si nombreDeProduit inférieur ou égal à 100
                produit.quantity = nombreDeProduit;             // défini la quantité égale au 'nombreDeProduit'
                panier.push(produit);                           // ajouter le produit au panier

                alert('Le produit à été ajouté au panier');
            }
            else {
                window.alert("La quantité totale doit être comprise entre 0 - 100")
            }
            
        }
        sauvegarderPanier(panier);                          // sauvegarde du panier
    }

    

    // création de la classe produit et définition de ses propriétés
    class Produit {
        constructor(idProduit, couleurProduit, nombreDeProduit) { 
            this.id = idProduit;            // définit  'id' produit pour chaque instance de 'Produit'
            this.couleur = couleurProduit;  // définit  'couleurProduit' produit pour chaque instance de 'Produit'
            this.quantity = nombreDeProduit;// définit  'nombreDeProduit' produit pour chaque instance de 'Produit'
        }
    }

    // crée un nouveau produit
    function nouveauProduit() {

        // définit la couleur du produit selon le choix user
        let couleurProduit = document.querySelector('select').value; 

        // définit la quantité du produit selon le choix user
        let nombreDeProduit = document.querySelector('input').value; 

        if (couleurProduit == '') {                 // si couleurProduit est vide 
            alert('Veuillez choisir une couleur')   // Affiche une alerte
        }
        else if (nombreDeProduit == 0) {            //  si nombreDeProduit est égal à O
            alert('Veuillez choisir une quantité')  // Affiche une alerte
        }
        else {  // sinon crée un nouvel objet 'produit' et l'ajoute au panier
            let produit = new Produit(idProduit, couleurProduit, nombreDeProduit);
            ajouterAuPanier(produit);
        }
    }
    
    // Ajoute l'élement au panier lors du click sur le bouton 'ajouter au panier' 
    document.querySelector('button').addEventListener("click", nouveauProduit);

    