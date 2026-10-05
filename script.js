const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const main = document.querySelector(".main");
const chatArea = document.createElement("div");
chatArea.className = "chat-area";

main.insertBefore(chatArea, document.querySelector(".chat-box"));

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const message = input.value.trim();

    if (message === "") return;

    addMessage(message, "user");
    input.value = "";

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        addMessage(data.reply || "Sorry, I couldn't respond.", "kora");

    } catch (error) {
        addMessage("Kora's backend is not connected.", "kora");
    }
}

function addMessage(text, sender) {
    const messageElement = document.createElement("div");

    messageElement.className = "message " + sender;
    messageElement.innerHTML = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\|/g, " ").replace(/\n/g, "<br>");
    chatArea.appendChild(messageElement);

    messageElement.scrollIntoView({
        behavior: "smooth"
    });
}

const learnCard = document.getElementById("learnCard");
let learnMode = false;

if (learnCard) {
  learnCard.addEventListener("click", function () {
    learnMode = true;

    input.placeholder = "What do you want to learn?";

    addMessage(
      "Kora Learn is ready 🎓 Ask me about any topic and I'll explain it step by step.",
      "kora"
    );

    input.focus();
  });
}


const businessCard = document.getElementById("businessCard");
let businessMode = false;

if (businessCard) {
  businessCard.addEventListener("click", function () {
    businessMode = true;

    input.placeholder = "Ask Kora about your business";

    addMessage(
      "Kora Business is ready 💼 Tell me about your business or ask me how to grow it.",
      "kora"
    );

    input.focus();
  });
}