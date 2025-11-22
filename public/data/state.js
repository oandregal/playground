const messages = [
  {
    role: "assistant",
    content:
      "Hello! I'm here to help you learn and experiment with HTML, CSS, and JavaScript. Feel free to ask me questions or request code examples.",
  },
];

export function addMessage(message) {
  if (!message.content.trim()) {
    return;
  }

  messages.push(message);

  return messages;
}

export function getMessages() {
  return messages;
}
