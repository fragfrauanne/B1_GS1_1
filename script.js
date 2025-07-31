const tasks = [
    { question: "Er _____ (bringen) seiner Frau jeden Morgen einen Kaffee.", answer: "brachte" },
    { question: "Der Schlüssel _____ (liegen) auf dem Boden.", answer: "lag" },
    { question: "Er _____ (kommen) erst um 23 Uhr nach Hause.", answer: "kam" },
    { question: "Was ____ (denken) du, als du das Deutsch-Zertifikat bekommen hast?", answer: "dachtest" },
    { question: "Rafael _____ (besuchen) seine Tante in Wien.", answer: "besuchte" },
    { question: "Die Nachbarn _____ (rufen) die Polizei.", answer: "riefen" },
    { question: "Er _____ (verlieren) seinen Pass.", answer: "verlor" },
    { question: "Abends _____ (sehen) wir immer die Nachrichten.", answer: "sahen" },
    { question: "Er _____ (warten) eine Stunde auf den Arzt.", answer: "wartete" },
    { question: "Er _____ (wollen) schwimmen.", answer: "wollte" },
    { question: "Maja _____ (kaufen) viele Geschenke.", answer: "kaufte" },
    { question: "An der Haltestelle _____ (stehen) viele Menschen.", answer: "standen" },
    { question: "Das Flugzeug _____ (landen) pünktlich.", answer: "landete" },
    { question: "Lisa _____ (glauben) ihrem Freund alles.", answer: "glaubte" },
    { question: "Wo _____ (sein) ihr?", answer: "wart" },
    { question: "Endlich _____ (sehen) er seine Familie wieder.", answer: "sah" },
    { question: "Früher _____ (spielen) wir jeden Tag Fußball.", answer: "spielten" },
    { question: "Mit 18 _____ (gehen) Nikolas nach Österreich.", answer: "ging" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);