//////////////////////// gestion du panier /////////////////////

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
        return JSON.parse(panier);  // transforme string JSON en objet java script 
    }
}

//////////////////////// Manipulation du DOM ////////////////////////////////

fetch('http://localhost:3000/api/products/')    // lien vers API, requete GET via fetch
    .then(function(result) {
        if (result.ok) {                        // si result ok
            return result.json();               // envoie la réponse au format JSON
        }
    })

    // affiche les éléments du panier
    .then(function(data) {

        let panier = recupererPanier();

        // si le panier est vide :
        if (panier.length === 0) {

            // création des éléments 
            const article = document.createElement('article');          // création d'un article
            const titre = document.createElement('h2');                 // création d'une div

            // définition de la hiérarchie des éléments
            document.querySelector("#cart__items").appendChild(article);// 'article' enfant de 'cart__items'
            article.appendChild(titre);                                 // 'titre' enfant de 'article'

            titre.className = "panierVide";                             // définit la classe 'titre'
            titre.innerHTML = 'Le panier est vide...';       
            
            let prixTotal = 0;                                          // prix total du panier
            let quantiteTotale = 0;                                     // quantité totale du panier

            document.querySelector("#totalQuantity").innerHTML = quantiteTotale; // affiche la quatité totale
            document.querySelector("#totalPrice").innerHTML = prixTotal; // affiche le prix total
        }

        // si le panier n'est pas vide :
        else {
            let prixTotal = 0;                              // prix total du panier
            let quantiteTotale = 0;                         // quantité totale du panier

            for (i = 0; i<panier.length; i++) {             // pour chaque élément du panier :

                // calcul de la quantité total
                quantiteTotale += parseInt(panier[i].quantity);// 'string' en 'number' puis l'ajoute au total
                document.querySelector("#totalQuantity").innerHTML = quantiteTotale; 

                for (j=0; j<data.length; j++) {             // pour chaque élément de l'api :
                    
                    if (panier[i].id == data[j]._id) {      // si 'id' élément panier égal à 'id' élément api :

                        // création des éléments 
                        const article = document.createElement('article');              // création d'un article
                        const divImage = document.createElement('div');                 // création d'une div
                        const image = document.createElement('img');                    // création d'une image

                        const divDescription = document.createElement('div');           // création d'une div
                        const description = document.createElement('div');              // création d'une div
                        const nom = document.createElement('h2');                       // création d'un titre
                        const couleur = document.createElement('p');                    // création d'un paragraphe
                        const prix = document.createElement('p');                       // création d'un paragraphe

                        const parametres = document.createElement('div');               // création d'une div
                        const divQuantite = document.createElement('div');              // création d'une div
                        const quantite = document.createElement('p');                   // création d'un paragraphe
                        const inputQuantite = document.createElement('input');          // création d'une div

                        const divSupprimer = document.createElement('div');             // création d'une div
                        const supprimer = document.createElement('p');                  // création d'un paragraphe

                        // définition de la hiérarchie des éléments
                        article.appendChild(divImage);               // 'divImage' enfant de 'article'
                        divImage.appendChild(image);                 // 'image' enfant de 'divImage'

                        article.appendChild(divDescription);         // 'divDescription' enfant de 'article'
                        divDescription.appendChild(description);     // 'description' enfant de 'divDescription'
                        description.appendChild(nom);                // 'nom' enfant de 'description'
                        description.appendChild(couleur);            // 'couleur' enfant de 'description'
                        description.appendChild(prix);               // 'prix' enfant de 'description'

                        divDescription.appendChild(parametres);      // 'parametres' enfant de 'divDescription'
                        parametres.appendChild(divQuantite);         // 'divQuantite' enfant de 'parametres'
                        divQuantite.appendChild(quantite);           // 'quantite' enfant de 'divQuantite'
                        divQuantite.appendChild(inputQuantite);      // 'inputQuantite' enfant de 'divQuantite'

                        parametres.appendChild(divSupprimer);        // 'divSupprimer' enfant de 'parametres'
                        divSupprimer.appendChild(supprimer);         // 'supprimer' enfant de 'divSupprimer'

                        // ajout de la classe des éléments
                        article.className = "cart__item";                               // définit 'article'
                        divImage.className = "cart__item__img";                         // définit 'divImage'

                        divDescription.className = "cart__item__content";               // définit 'divDescription'
                        description.className = "cart__item__content__description";     // définit  'description'
                                        
                        parametres.className = "cart__item__content__settings";         // définit  'parametres'
                        divQuantite.className = "cart__item__content__settings__quantity"; // définit  'divQuantite'
                        inputQuantite.className = "itemQuantity";                       // définit 'inputQuantite'

                        divSupprimer.className = "cart__item__content__settings__delete"; // définit  'divSupprimer'
                        supprimer.className = "deleteItem";                             // définit 'Supprimer'

                        // ajout des attributs
                        article.setAttribute('data-id', panier[i].id);                  // 'data-id'
                        article.setAttribute('data-couleur', panier[i].couleur);        // 'data-couleur' 

                        inputQuantite.setAttribute('type', 'number');                   // 'type'
                        inputQuantite.setAttribute('name', 'itemQuantity');             // 'name'
                        inputQuantite.setAttribute('min', '1');                         // 'min'
                        inputQuantite.setAttribute('max', '100');                       // 'max'
                        inputQuantite.setAttribute('aria-label', 'quantité');           // 'aria-label'
                        inputQuantite.setAttribute('value',panier[i].quantity);         // 'value'

                        image.src = data[j].imageUrl;                                   // 'src' de l'image
                        image.alt = data[j].imageUrl;                                   // 'alt' de l'image

                        // calcul du prix total
                        prixTotal += parseInt(data[j].price) * parseInt(panier[i].quantity);         
                        document.querySelector("#totalPrice").innerHTML = prixTotal;

                        // ajout inner HTML
                        couleur.innerHTML = article.getAttribute('data-couleur');       // affiche la couleur
                        nom.innerHTML = data[j].name;                                   // affiche le nom
                        prix.innerHTML = parseInt(data[j].price) + ' €';                // affiche le prix
                        supprimer.innerHTML = 'Supprimer';                              // bouton supprimer
                        quantite.innerHTML = "Qté : ";                                  

                        // 'article' enfant de la class 'cart__items' déja existante dans le code html
                        document.querySelector("#cart__items").appendChild(article);
                    }
                }
            }
        }
    })
    
    // supprimer un produit
    .then(function(){   

        let panier = recupererPanier();                                             
        let boutonsSupprimer = Array.from(document.querySelectorAll('.deleteItem'));
        
        for (i=0; i<boutonsSupprimer.length; i++) {
    
            let article = document.querySelectorAll(".cart__item");

            let articleId = article[i].getAttribute("data-id");
            let articleCouleur = article[i].getAttribute("data-couleur");
    
            boutonsSupprimer[i].addEventListener("click", (event) => {

                panier = panier.filter(p => (p.couleur !== articleCouleur) && (p => p.id !== articleId));

                sauvegarderPanier(panier);
                window.location.reload();
            })
        }
    })

    // Mise à jour de la quantité & du prix en fonction des changements apporté sur la page
    .then(function(){ 

        // ajout addEventListener sur tout le document
        document.addEventListener('change', function(event) { 

            // si la classe du déclancheur contient 'itemQuantity' :
            if(event.target.classList.contains('itemQuantity')) {   

                // si la valeur de l'input est comprise entre 1 et 100 :
                if(event.target.value >= 1 && event.target.value <= 100) {
                    
                    fetch('http://localhost:3000/api/products/')    // lien vers API, requete GET via fetch
                        .then(function(result) {
                            if (result.ok) {                        // si result ok
                                return result.json();               // envoie la réponse au format JSON
                            }
                        })

                        // modifie la quantité totale ainsi que le prix
                        .then(function(data) { 

                            let panier = recupererPanier();                 // récupère le panier

                            let prixTotal = 0;                              // prix total du panier
                            let quantiteTotale = 0;                         // quantité totale du panier

                            for (i = 0; i<panier.length; i++) {             // pour chaque élément du panier :

                                // calcul de la quantité total
                                quantiteTotale += parseInt(panier[i].quantity); // 'string' en 'number'
                                document.querySelector("#totalQuantity").innerHTML = quantiteTotale; 

                                // pour chaque élément de l'api :
                                for (j=0; j<data.length; j++) {             
                                    
                                    // si 'id' élément panier égal à 'id' élément api :
                                    if (panier[i].id == data[j]._id) {      

                                        // calcul du prix total
                                        prixTotal += parseInt(data[j].price) * parseInt(panier[i].quantity);         
                                        document.querySelector("#totalPrice").innerHTML = prixTotal;
                                    }
                                }
                            }
                        })
                    
                    let panier = recupererPanier();
                    
                    let produit = panier.find(element => 
                        element.id == event.target.closest('.cart__item').dataset.id && element.couleur == event.target.closest('.cart__item').dataset.couleur);
                        
                    produit.quantity = event.target.value;
                    localStorage.setItem("panier", JSON.stringify(panier));
                }
                else {
                    window.alert("Champ incorrect! La quantité doit être comprise entre 1 et 100");
                }
            }
        })
    })

//////////////////////// Gestion du formulaire ////////////////////////////////

// affiche une erreur pour chaque champ mal renseigné
function validerFormulaire() {

    // déclaration du formulaire
    let form = document.querySelector(".cart__order__form");

    // ajout des Regex
    let charRegExp = new RegExp("^[a-zA-Zàâäéèêëîïìôöòûüùç,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:[ ]{1}[-a-zA-Zàâäéèêëîïìôöòûüùç]+)+$");
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

    // validation du prénom
    function validerPrenom() {
        let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');

        if (charRegExp.test(form.firstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        }
        else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom correctement.'
        }
    }
    // écoute du prenom
    form.firstName.addEventListener('change', validerPrenom);

    // validation du nom
    function validerNom() {
        let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');

        if (charRegExp.test(form.lastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        }
        else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom correctement.'
        }
    }
    // écoute du nom
    form.lastName.addEventListener('change', function() { validerNom(this);})

    // validation de l'adresse
    function validerAdresse() {
        let addressErrorMsg = document.getElementById('addressErrorMsg');

        if (addressRegExp.test(form.address.value)) {
            addressErrorMsg.innerHTML = '';
        }
        else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse correctement.'
        }
    }
    // écoute de l'adresse
    form.address.addEventListener('change', function() { validerAdresse(this);})

    // validation de la ville
    function validerVille() {
        let cityErrorMsg = document.getElementById('cityErrorMsg');

        if (charRegExp.test(form.city.value)) {
            cityErrorMsg.innerHTML = '';
        }
        else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville correctement.'
        }
    }
    // écoute de la ville
    form.city.addEventListener('change', function() { validerVille(this);})

    // validation de l'email
    function validerEmail() {
        let emailErrorMsg = document.getElementById('emailErrorMsg');

        if (emailRegExp.test(form.email.value)) {
            emailErrorMsg.innerHTML = '';
        }
        else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email correctement.'
        }
    }
    // écoute de l'email 
    form.email.addEventListener('change', function() { validerEmail(this);})
}
validerFormulaire(); // vérifie que les champs correspondent aux RegExp sinon affiche une erreur

// sauvegarde du formulaire dans le localstorage
function sauvegardeDuFormulaire(contact) {
    localStorage.setItem("contact", JSON.stringify(contact)); 
} 

// récupération du formulaire dans le localstorage
function recupereLeFormulaire() {

    // récupère le contenu du localStorage
    let contact = localStorage.getItem("contact"); 

    if (contact == null) {            // si contact  null renvoi []
        return [];          
    }
    else {                            // sinon 
        return JSON.parse(contact);   // transforme le JSON en java script 
    }
}

// description de la classe Formulaire
class Formulaire {
    constructor(prenomFormulaire, nomFormulaire, adresseFormulaire, villeFormulaire, emailFormulaire) { 
        this.firstName = prenomFormulaire;    
        this.lastName =  nomFormulaire;
        this.address = adresseFormulaire;
        this.city = villeFormulaire;
        this.email = emailFormulaire;
    }
}

// création du formulaire
function creationDuFormulaire() {
    let prenomFormulaire = document.getElementById('firstName').value; 
    let nomFormulaire = document.getElementById('lastName').value;
    let adresseFormulaire = document.getElementById('address').value;
    let villeFormulaire = document.getElementById('city').value;
    let emailFormulaire = document.getElementById('email').value;

    let contact = new Formulaire(prenomFormulaire, nomFormulaire, adresseFormulaire, villeFormulaire, emailFormulaire);

    sauvegardeDuFormulaire(contact);
}

// crée le formulaire si le panier n'est pas vide et que les champs respectent les RegExp puis le post
function postFormulaire() {

    creationDuFormulaire();                 // crée le formulaire commme un objet java script

    let contact = recupereLeFormulaire();   // récupère le formulaire
    let panier = recupererPanier();         // récupère le panier
    
    let products = panier.map(p => p.id);   // récupère les id des produits du panier
    
    const order = {                         // définit la constante 'order'
        contact,
        products
    }

    // déclaration du formulaire
    let form = document.querySelector(".cart__order__form");

    // ajout des Regex
    let charRegExp = new RegExp("^[a-zA-Zàâäéèêëîïìôöòûüùç,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:[ ]{1}[-a-zA-Zàâäéèêëîïìôöòûüùç]+)+$");
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

    // si le panier n'est pas vide
    if (panier.length > 0) {

        // si les champs du formulaire correspondent aux RegExp
        if (charRegExp.test(form.firstName.value) && charRegExp.test(form.lastName.value) && addressRegExp.test(form.address.value) && charRegExp.test(form.city.value) && emailRegExp.test(form.email.value)) {
            
            // lien vers API, requete POST via fetch
            fetch("http://localhost:3000/api/products/order", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
                })
                .then((reponse) => reponse.json())
                .then(data => window.location.href = "confirmation.html?orderId=" + data.orderId)
                .then(localStorage.clear())
        }   
    } 
    else {
        window.alert("Votre panier est vide.");
    }          
}
document.getElementById('order').addEventListener('click', postFormulaire); 



