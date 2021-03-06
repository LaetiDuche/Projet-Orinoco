// Page produit où l'on crée la fiche produit du produit sélectionné dans la page index 
// et insertion de toutes les infos du produit avec en plus un menu déroulant pour les couleurs, 
// le choix d'une quantité et ajout des boutons 'ajout au panier'  et 'voir mon panier', 
// et enregistrement dans le localstorage.

//ACCÉS AUX URLS DES TEDDIES
let params = new URL(document.location).searchParams;
let id = params.get("id");

//INSERTION DANS LE DOM
body();
function body() {
  getOneTeddy();
}

//-----------------------------------------FICHE PRODUIT 

//STRUCTURE DE LA FICHE PRRODUIT
function getOneTeddy() {

  //Appel de l'ID d'un teddy venant de l'api
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
    })
    //Mise en liaison de l'ID venant de l'index
    .then(function (insertDataTeddies) {
      card = insertDataTeddies;
      console.log(card);

      //Selection de l'élément pour insérer la fiche produit
      let cardTeddy = document.getElementById('card-teddy');

      //Création de la fiche produit 
      let ficheTeddy = document.createElement("article");
      cardTeddy.appendChild(ficheTeddy);
      ficheTeddy.classList.add("col-12", "col-md-12", "col-xl-8", "page-product", "mx-auto", "my-3");

      let figureTeddy = document.createElement("figure");
      ficheTeddy.appendChild(figureTeddy);
      figureTeddy.classList.add("card", "col-md-12", "my-1", "shadow-sm");

      //Insertion de l'image
      let imageTeddy = document.createElement("img");
      figureTeddy.appendChild(imageTeddy);
      imageTeddy.classList.add("card-img-top", "h-100");
      imageTeddy.src = card.imageUrl;     //Appel url de l'image

      let captionTeddy = document.createElement("figcaption");
      figureTeddy.appendChild(captionTeddy);
      captionTeddy.classList.add("card-body");

      let textTeddy = document.createElement("div");
      captionTeddy.appendChild(textTeddy);
      textTeddy.classList.add("row");

      //Insertion du nom d'un teddy
      let nomTeddy = document.createElement("h2");
      textTeddy.appendChild(nomTeddy);
      nomTeddy.style.color = 'DarkOrange';
      nomTeddy.style.fontStyle = 'italic';
      nomTeddy.setAttribute("id", "nom");
      nomTeddy.innerHTML = card.name;    //Appel data

      //Insertion du prix d'un teddy en euro
      let prixTeddy = document.createElement("p");
      textTeddy.appendChild(prixTeddy);
      prixTeddy.classList.add("card-text");
      prixTeddy.setAttribute("id", "prix");
      prixTeddy.innerHTML = "Prix : " + card.price / 100 + ' €';  //Appel data

      //Insertion de la description d'un teddy
      let descriptionTeddy = document.createElement("p");
      textTeddy.appendChild(descriptionTeddy);
      descriptionTeddy.innerHTML = "Description : <br>" + card.description; //Appel data

      let choixTeddy = document.createElement("div");
      textTeddy.appendChild(choixTeddy);
      choixTeddy.classList.add("d-flex", "mt-2", "align-baseline");

      //Insertion des éléments du menu déroulant pour choisir une couleur
      let labelTeddy = document.createElement("label");
      choixTeddy.appendChild(labelTeddy);
      labelTeddy.setAttribute("for", "colorteddy");

      let selectTeddy = document.createElement("select");
      choixTeddy.appendChild(selectTeddy);
      selectTeddy.classList.add("form-select");
      selectTeddy.setAttribute("id", "colorteddy");
      selectTeddy.setAttribute("name", "color");

      let optionTeddy = document.createElement("option");
      selectTeddy.appendChild(optionTeddy);
      optionTeddy.innerHTML = "Choisir une couleur";
      optionTeddy.setAttribute('min', '1');

      let colorTeddy = document.getElementById("colorteddy");

      //Fonction boucle pour générer la liste des différentes couleurs
      for (let i = 0; i < card.colors.length; i++) {
        let optionTeddy = document.createElement("option");
        colorTeddy.appendChild(optionTeddy);
        optionTeddy.innerHTML = card.colors[i];  //Appel data des couleurs
      }

      //Insertion des éléments pour sélectionner une quantité de teddy
      let textTeddy2 = document.createElement("div");
      textTeddy.appendChild(textTeddy2);
      textTeddy2.classList.add("d-flex", "mt-4", "align-baseline");

      let labelTeddy2 = document.createElement("label");
      textTeddy2.appendChild(labelTeddy2);
      labelTeddy2.setAttribute("for", "quantite");

      let quantiteTeddy = document.createElement("p");
      textTeddy2.appendChild(quantiteTeddy);
      quantiteTeddy.innerHTML = "Quantité :";
      quantiteTeddy.classList.add("my-auto");

      let numberOfTeddy = document.createElement("input")
      textTeddy2.appendChild(numberOfTeddy);
      numberOfTeddy.classList.add("ms-1", "h-auto", "w-25");
      numberOfTeddy.setAttribute("type", "number");
      numberOfTeddy.setAttribute("name", "quantite");
      numberOfTeddy.setAttribute("id", "quantite");
      numberOfTeddy.setAttribute("min", "0");

      //Insertion du bouton pour ajouter au panier
      let divTeddy = document.createElement("div");
      textTeddy.appendChild(divTeddy);
      divTeddy.classList.add("col-12", "text-center",'mb-3', 'mt-4', 'd-flex', 'justify-content-around');

      let buttonTeddy = document.createElement("button");
      divTeddy.appendChild(buttonTeddy);
      buttonTeddy.classList.add("bouton");
      buttonTeddy.setAttribute("id", "bouton");
      buttonTeddy.setAttribute("type", "submit");
      buttonTeddy.innerHTML = "Ajouter au panier";  //Appel data des couleurs

      //Insertion bouton voir mon panier
      let buttonVoirPanier = document.createElement('a');
      divTeddy.appendChild(buttonVoirPanier);
      buttonVoirPanier.classList.add("bouton", "shadow");
      buttonVoirPanier.innerHTML = 'Voir mon panier';
      buttonVoirPanier.href = "panier.html";

      //Mis en relation avec la fonction ajoutPanier
      ajoutPanier();
    })
}

//-------------------------AJOUTER LES PRODUITS DANS LE PANIER

function ajoutPanier() {

  //Evènements sur le bouton
  const bouton = document.querySelector('#bouton');
  bouton.addEventListener('click', () => {

    //Création de l'objet products  
    if (quantite.value > 0 && quantite.value < 100) {
      let productPanier = {
        name: card.name,
        price: card.price / 100 + '€',
        color: colorteddy.value,
        quantity: quantite.value,
        _id: id
      };

      //Pour ajouter l'objet products dans le localstorage
      let localPanier = [];
      if (localStorage.getItem("productsTeddy") !== null) {
        localPanier = JSON.parse(localStorage.getItem("productsTeddy"));
      }
      localPanier.push(productPanier);

      //Pour transformer l'objet products au format json
      localStorage.setItem("productsTeddy", JSON.stringify(localPanier));

      //Message de confirmation d'ajout au panier
      alert(`Vous avez ajouté ${card.name} dans votre panier !`);
    }
  });
}