const messages = [
  {
    role: "assistant",
    content:
      "Hello! I'm here to help you learn and experiment with the @wordpress/dataviews package. Feel free to ask me questions or request code examples.",
  },
];

const messagesContainer = document.querySelector(".messages-container");
const inputField = document.querySelector(".input-container input");
const sendButton = document.querySelector(".input-container button");

function createMessageElement(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${message.role}`;
  messageDiv.textContent = message.content;
  return messageDiv;
}

function createWaitingIndicator() {
  const waitingDiv = document.createElement("div");
  waitingDiv.className = "message assistant waiting";
  waitingDiv.innerHTML = "<span>•</span><span>•</span><span>•</span>";
  return waitingDiv;
}

function renderMessages() {
  messagesContainer.innerHTML = "";

  messages.forEach((message) => {
    const messageElement = createMessageElement(message);
    messagesContainer.appendChild(messageElement);
  });

  // Scroll to bottom so new messages are visible.
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessage(message) {
  if (!message.content.trim()) {
    return;
  }

  messages.push(message);

  renderMessages();
}

function handleSubmit() {
  const content = inputField.value.trim();

  if (content) {
    addMessage({ role: "user", content });

    inputField.value = "";

    const waitingIndicator = createWaitingIndicator();
    messagesContainer.appendChild(waitingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    })
      .then((response) => response.json())
      .then((data) => {
        waitingIndicator.remove();

        addMessage({
          role: "assistant",
          content: data.content[0].text,
        });
      })
      .catch((error) => {
        waitingIndicator.remove();

        console.error("Error calling API:", error);
        addMessage({
          role: "assistant",
          content: "Sorry, there was an error getting a response.",
        });
      });
  }
}

sendButton.addEventListener("click", handleSubmit);
inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSubmit();
  }
});

renderMessages();
