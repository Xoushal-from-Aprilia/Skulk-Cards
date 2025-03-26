// Lista delle carte
const cards = [
  {
    name: "Drago di Fuoco",
    rarity: "Legendary",
    hp: 100,
    defense: 50,
    image: "/card-images/SKULK_20250114_233303_0000.png",
  },
  {
    name: "Volpe Verdastra",
    rarity: "Epic",
    hp: 80,
    defense: 40,
    image: "/card-images/SKULK_20250114_231924_0000.png",
  },
  {
    name: "Guerriero Oscuro",
    rarity: "Epic",
    hp: 60,
    defense: 30,
    image: "/card-images/SKULK_20250114_232110_0000.png",
  },
  {
    name: "Folletto Magico",
    rarity: "common",
    hp: 40,
    defense: 20,
    image: "/card-images/SKULK_20250114_233212_0000.png",
  },
  {
    name: "Cavaliere Ombra",
    rarity: "common",
    hp: 50,
    defense: 25,
    image: "/card-images/SKULK_20250114_233111_0000.png",
  },
  {
    name: "Fucile D'assalto",
    rarity: "Rare",
    hp: 10,
    defense: 5,
    image: "/card-images/SKULK_20250116_081459_0000.png",
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
        <p>HP: ${card.hp}</p>
        <p>ATK: ${card.defense}</p>
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
  
  saveInventoryToCache();

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

saveInventoryToCache();

    // Mostra un messaggio se sono state aggiunte 3 carte
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

// Salva l'inventario nella cache
function saveInventoryToCache() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Carica l'inventario dalla cache
function loadInventoryFromCache() {
  const savedInventory = localStorage.getItem("inventory");
  if (savedInventory) {
    inventory = JSON.parse(savedInventory);
  } else {
    inventory = []; // Se non ci sono dati, inizia con un inventario vuoto
  }
}

// Caricare l'inventario all'avvio
window.addEventListener("DOMContentLoaded", () => {
  loadInventoryFromCache();

  // Aggiungere le carte caricate al contenitore dell'inventario
  const inventoryContainer = document.getElementById("inventory");
  inventory.forEach((card) => {
    const cardElement = createCardElement(card);
    inventoryContainer.appendChild(cardElement);
  });
});

// Aspetta che tutti gli elementi della pagina siano caricati
window.onload = function() {
    // Nascondi il loader con un effetto di transizione
    const loader = document.getElementById('loader');
    const content = document.querySelector('.content');

    loader.style.opacity = '0'; // Fai scomparire il loader
    loader.style.transition = 'opacity 0.5s ease-in-out';

    setTimeout(() => {
        loader.style.display = 'none'; // Nascondi completamente il loader
        content.style.display = 'block'; // Mostra il contenuto della pagina
        content.style.opacity = '1'; // Fai apparire il contenuto
        
        // Avvia l'audio dopo il caricamento
        playAudio();
    }, 500); // Tempo per completare la transizione
};

// Funzione per avviare l'audio
function playAudio() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = new Audio("/sounds/Arnor(chosic.com).mp3");
    const track = audioContext.createMediaElementSource(audioElement);

    track.connect(audioContext.destination);

    // Sblocca il contesto audio e avvia la riproduzione
    audioContext.resume().then(() => {
        audioElement.loop = true; // Ripeti la traccia all'infinito
        audioElement.play().catch(error => console.log("Autoplay bloccato:", error));
    }).catch(error => console.log("Errore nell'attivazione dell'audio:", error));
}