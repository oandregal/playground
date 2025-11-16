const chatHistory = [
  {
    role: "agent",
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

function renderMessages() {
  messagesContainer.innerHTML = "";

  chatHistory.forEach((message) => {
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

  chatHistory.push(message);

  renderMessages();
}

function handleSubmit() {
  const content = inputField.value.trim();

  if (content) {
    addMessage({ role: "user", content });

    inputField.value = "";

    setTimeout(() => {
      addMessage({
        role: "agent",
        content:
          "This is a placeholder response. The AI integration will be implemented in the next steps.",
      });
    }, 500);
  }
}

sendButton.addEventListener("click", handleSubmit);
inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSubmit();
  }
});

renderMessages();
