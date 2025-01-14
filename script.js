// Lista delle carte
const cards = [
  {
    name: "Drago di Fuoco",
    rarity: "legendary",
    hp: 100,
    defense: 50,
    image: "path/to/drago-di-fuoco.jpg",
  },
  {
    name: "Stregone Oscuro",
    rarity: "epic",
    hp: 80,
    defense: 40,
    image: "path/to/stregone-oscuro.jpg",
  },
  {
    name: "Guerriero Oscuro",
    rarity: "Epic",
    hp: 60,
    defense: 30,
    image: "/Progetto senza titolo_20250114_185639_0000.png",
  },
  {
    name: "Folletto Magico",
    rarity: "common",
    hp: 40,
    defense: 20,
    image: "path/to/folletto-magico.jpg",
  },
  {
    name: "Cavaliere Ombra",
    rarity: "common",
    hp: 50,
    defense: 25,
    image: "path/to/cavaliere-ombra.jpg",
  },
];

// Inventario
let inventory = [];

// Aperture dei pacchetti (timestamp)
let packOpenTimestamps = [];

// Funzione per creare un elemento carta
function createCardElement(card) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", card.rarity);

  // Contenuto della carta
  cardDiv.innerHTML = `
    <div class="card-content">
      <img src="${card.image}" alt="${card.name}" class="card-image">
      <div class="card-info">
        <h3>${card.name}</h3>
        <p>HP: ${card.hp} | DEF: ${card.defense}</p>
        <p>Rarità: ${card.rarity}</p>
      </div>
    </div>
  `;

  // Aggiungere comportamento per la selezione
  cardDiv.addEventListener("click", () => toggleCardSelection(cardDiv));
  return cardDiv;
}



// Funzione per generare un pacchetto
function generatePack() {
  const pack = [];
  for (let i = 0; i < 6; i++) {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    pack.push(randomCard);
  }
  return pack;
}

// Mostrare il pacchetto
function showPack() {
  const now = Date.now();

  // Filtrare timestamp più vecchi di 5 minuti
  packOpenTimestamps = packOpenTimestamps.filter(
    (timestamp) => now - timestamp <= 5 * 60 * 1000
  );

  // Controllare se sono stati aperti 3 pacchetti negli ultimi 5 minuti
  if (packOpenTimestamps.length >= 3) {
    alert(
      "Hai raggiunto il limite di 3 pacchetti ogni 5 minuti. Riprova più tardi!"
    );
    return;
  }

  // Registrare il timestamp dell'apertura del pacchetto
  packOpenTimestamps.push(now);

  const packContainer = document.getElementById("pack-container");
  packContainer.innerHTML = ""; // Pulire il contenitore
  const pack = generatePack();

  pack.forEach((card) => {
    const cardElement = createCardElement(card);
    packContainer.appendChild(cardElement);

    // Aggiungere la carta all'inventario con animazione al click
    cardElement.addEventListener("click", () => {
      addToInventoryWithAnimation(cardElement, card);
    });
  });
}

// Aggiungere all'inventario con animazione
function addToInventoryWithAnimation(cardElement, card) {
  cardElement.classList.add("moving");
  cardElement.addEventListener("animationend", () => {
    cardElement.remove();
    inventory.push(card);
    const inventoryContainer = document.getElementById("inventory");
    const newCardElement = createCardElement(card);
    inventoryContainer.appendChild(newCardElement);
  });
}

// Funzione per selezionare/deselezionare una carta
// Funzione per selezionare/deselezionare una carta
function toggleCardSelection(cardElement) {
  cardElement.classList.toggle("selected");

  // Abilitare/disabilitare il pulsante "Elimina Carte"
  const deleteButton = document.getElementById("delete-selected");
  const selectedCards = document.querySelectorAll(".card.selected");
  deleteButton.disabled = selectedCards.length === 0;
}
// Funzione per eliminare le carte selezionate
function deleteSelectedCards() {
  const selectedCards = document.querySelectorAll(".card.selected");
  const inventoryContainer = document.getElementById("inventory");

  selectedCards.forEach((cardElement) => {
    // Rimuovere dal DOM
    cardElement.remove();

    // Rimuovere dal modello inventario
    const cardName = cardElement.querySelector("h3").textContent;
    inventory = inventory.filter((card) => card.name !== cardName);
  });

  // Disabilitare il pulsante "Elimina Carte"
  document.getElementById("delete-selected").disabled = true;
}

// Listener per il pulsante "Apri un Pacchetto"
document.getElementById("open-pack").addEventListener("click", showPack);

// Listener per il pulsante "Elimina Carte"
document.getElementById("delete-selected").addEventListener("click", deleteSelectedCards);

// Elementi DOM
const openInventoryBtn = document.getElementById("open-inventory");
const closeInventoryBtn = document.getElementById("close-inventory");
const inventoryPopup = document.getElementById("inventory-popup");

// Mostra il pop-up dell'inventario
openInventoryBtn.addEventListener("click", () => {
  inventoryPopup.classList.remove("hidden");
});

// Nasconde il pop-up dell'inventario
closeInventoryBtn.addEventListener("click", () => {
  inventoryPopup.classList.add("hidden");
});

// Contatore per tracciare quante carte sono state aggiunte
let cardsAddedToInventory = 0;

// Aggiungere all'inventario con animazione (con limite di 2 carte)
function addToInventoryWithAnimation(cardElement, card) {
  if (cardsAddedToInventory >= 3) {
    alert("Puoi aggiungere solo 3 carte all'inventario!");
    return;
  }

  cardElement.classList.add("moving");
  cardElement.addEventListener("animationend", () => {
    cardElement.remove();
    inventory.push(card);
    cardsAddedToInventory++; // Incrementa il contatore

    const inventoryContainer = document.getElementById("inventory");
    const newCardElement = createCardElement(card);
    inventoryContainer.appendChild(newCardElement);

    // Mostra un messaggio se sono state aggiunte 2 carte
    if (cardsAddedToInventory === 3) {
      alert("Hai raggiunto il limite di 3 carte aggiunte per questo pacchetto!");
    }
  });
}

// Mostrare il pacchetto (reset del contatore)
function showPack() {
  const now = Date.now();

  // Filtrare timestamp più vecchi di 5 minuti
  packOpenTimestamps = packOpenTimestamps.filter(
    (timestamp) => now - timestamp <= 5 * 60 * 1000
  );

  // Controllare se sono stati aperti 3 pacchetti negli ultimi 5 minuti
  if (packOpenTimestamps.length >= 3) {
    alert(
      "Hai raggiunto il limite di 3 pacchetti ogni 5 minuti. Riprova più tardi!"
    );
    return;
  }

  // Registrare il timestamp dell'apertura del pacchetto
  packOpenTimestamps.push(now);

  const packContainer = document.getElementById("pack-container");
  packContainer.innerHTML = ""; // Pulire il contenitore
  const pack = generatePack();

  // Resetta il contatore di carte aggiunte
  cardsAddedToInventory = 0;

  pack.forEach((card) => {
    const cardElement = createCardElement(card);
    packContainer.appendChild(cardElement);

    // Aggiungere la carta all'inventario con animazione al click
    cardElement.addEventListener("click", () => {
      addToInventoryWithAnimation(cardElement, card);
    });
  });
}
function openInventory() {
  const inventoryPopup = document.getElementById('inventory-popup');
  inventoryPopup.classList.remove('hidden');
}

function goHome() {
  window.location.href = '/'; // Modifica con il link alla tua homepage
}