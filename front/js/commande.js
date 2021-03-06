// Page de confirmation de commande , dans lequel on ajoute un message de remerciement dans lequel on génère le nom et prénom du client,
// ainsi que l'order id, et le prix total du panier,
// vidage du localstorage et ajout d'un bouton 'revenir à l'accueil'.

//-----------------MESSAGE DE VALIDATION DE COMMANDE

//Insertion dans le DOM
body();
function body() {
  messageValidation()
}

function messageValidation() {

  //Récupération du Total, nom, prénom et de l'orderId dans le localstorage
  let orderId = localStorage.getItem("orderId");
  let Total = localStorage.getItem("Total");
  let Prenom = JSON.parse(localStorage.getItem("contact")).firstName;
  let Nom = JSON.parse(localStorage.getItem("contact")).lastName;
  
  //Insertion du Total, nom, prénom et de l'orderId dans le message
  let message = document.getElementById('confirm-message');

  //Message de confirmation
  let confirmId = document.createElement('p');
  message.appendChild(confirmId);
  confirmId.classList.add('col', 'bg-white','py-4','mt-3', 'text-center', 'command');
  confirmId.innerHTML =
    `Merci <strong> ${Prenom} ${Nom} </strong> pour votre commande !</br>
  </br>Votre commande n° <strong>${orderId}</strong> , 
  </br> d'un montant total de <strong>${Total} </strong>, a été envoyée avec succés! </br>
  </br> A bientôt sur Orinours !`;

  localStorage.clear();

  //-----Bouton revenir à l'accueil
  let divRetour = document.createElement('div');
  confirmId.append(divRetour);
  divRetour.classList.add('col-12', 'text-center', 'justify-content-around', 'd-flex', 'mt-2', 'mb-1');

  let btnRetour = document.createElement('button');
  divRetour.appendChild(btnRetour);
  btnRetour.classList.add('bouton');
  btnRetour.textContent = 'Revenir à l\'accueil';
  btnRetour.setAttribute('type', 'submit');
  btnRetour.setAttribute('id', 'btn-revenir');

  //Vidage du localstorage et retour à l'accueil
 let btnReturn = document.querySelector('#btn-revenir');
 btnReturn.addEventListener('click', function (e) {
    e.preventDefault();
    document.location.href = "index.html";
    localStorage.clear();
  })
}