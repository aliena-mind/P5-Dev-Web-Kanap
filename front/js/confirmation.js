// Récupère l'id de la commande depuis l'url puis l'affiche
function afficherOrderId() {

    let url = new URL(window.location.href);                // définit l'url
    let orderId = url.searchParams.get("orderId");          // récupère 'orderId' transmis dans l'url
    let ligneOrderId = document.getElementById("orderId");  // définit 'ligneOrderId'
    ligneOrderId.innerText = orderId;                       // définit le inner HTML de 'ligneOrderId'
}
afficherOrderId();

