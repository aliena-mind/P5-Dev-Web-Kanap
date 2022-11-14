//////////////////////// Manipulation du DOM ////////////////////////////////

fetch('http://localhost:3000/api/products/')    // lien vers API, requete GET via fetch
    .then(function(result) {
        if (result.ok) {                        // si result ok
        return result.json();                   // envoie la réponse au format JSON
        }
    })
    .then(function(data) {
        console.log(data)

        // boucle for pour ajouter les résultats en fonction du nombre de 'data'
        for (let i = 0; i < data.length; i++) {  
            // création des éléments 
            const lien = document.createElement('a');                   // création d'un lien
            const article = document.createElement('article');          // création d'un article
            const imageArticle = document.createElement('img');         // création d'une image
            const titreArticle = document.createElement('h3');          // création d'un titre
            const paragrapheArticle = document.createElement('p');      // crétion d'un paragraphe

            // définition de la hiérarchie des éléments
            lien.appendChild(article);                                  // 'article' enfant de 'lien'
            article.appendChild(imageArticle);                          // 'imageArticle' enfant de 'article'
            article.appendChild(titreArticle);                          // 'titreArticle' enfant de 'article'
            article.appendChild(paragrapheArticle);                     // 'paragrapheArticle' enfant de 'article'

            // ajout classe/nom produit
            titreArticle.className = "nomProduit";                      // définit la classe de 'titreArticle'
            titreArticle.innerHTML = data[i].name;                      // 'data[i].name' = nom de l'élément data d'index 'i'

            // ajout classe/description produit
            paragrapheArticle.className = "descriptionProduit";         // définit la classe de 'paragrapheArticle'
            paragrapheArticle.innerHTML = data[i].description;          // 'data [i].description' = description de l'élément data d'index 'i'

            // ajout des attributs
            lien.href = `./product.html?id=${data[i]._id}`;             // '${data[i]._id}' = '_id' de l'élement data d'index 'i'
            imageArticle.src = data[i].imageUrl;                        // définit l'attribut 'src' de l'image
            imageArticle.alt = data[i].altText;                         // définit l'attribut 'alt' de l'image

            document.querySelector("#items").appendChild(lien);         // 'lien' enfant de la class 'items' déja existante dans le code html

        }
    })
