let url = window.location.href;                                     // récupère l'URL de la page
let objetUrl = new URL(url);                                        // crée un objet URL 'objetUrl'
let parametreDeRecherche = new URLSearchParams(objetUrl.search);    // crée un objet URLSearchParams 'parametreDeRecherche'
if(parametreDeRecherche.has('id')) {                                // recherche si 'parametreDeRecherche' contient un 'id'
  var idProduit = parametreDeRecherche.get('id');                         
  console.log('id = ' + idProduit)                                  // affiche dans la console 'id =' + valeur 'id'
}

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
        const option = document.createElement('option');            // crétion des options
        
        // ajout des attributs
        image.src = data.imageUrl;   // définit l'attribut 'src' de l'image  
        image.alt = data.altText;    // définit l'attribut 'alt' de l'image

        // modifications innerHTML
        const paragrapheTitre = document.getElementById('title');               // définit 'paragrapheTitre' comme l'élement de classe 'title'
        title.innerHTML = data.name;                                            // remplace le contenue de l'innerHTML de 'paragrapheTitre'
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