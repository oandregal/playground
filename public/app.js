import React from "react";
import ReactDOM from "react-dom/client";

import Preview from "./components/preview.js";
import Messages from "./components/messages.js";
import sendMessages from "./data/send-messages.js";
import { addMessage, getMessages } from "./data/state.js";

const inputEl = document.querySelector(".input-container input");
const sendButtonEl = document.querySelector(".input-container button");
const messagesEl = document.querySelector(".messages-area");
const messagesRoot = ReactDOM.createRoot(messagesEl);
const previewEl = document.getElementById("preview-container");
const previewRoot = ReactDOM.createRoot(previewEl);

function renderMessages(msgs) {
  messagesRoot.render(React.createElement(Messages, { msgs }));
  requestAnimationFrame(() => {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
}

function renderPreview(data) {
  previewRoot.render(React.createElement(Preview, { ...data }));
}

function handleSubmit() {
  const content = inputEl.value.trim();

  if (content) {
    const msgs = addMessage({ role: "user", content });

    inputEl.value = "";
    renderMessages(msgs);

    sendMessages(msgs)
      .then((data) => {
        const msgs = addMessage({
          role: "assistant",
          content: data.message,
        });
        renderMessages(msgs);
        renderPreview(data.code);
      })
      .catch((error) => {
        console.error("Error calling API:", error);
        const msgs = addMessage({
          role: "assistant",
          content: "Sorry, there was an error getting a response.",
        });
        renderMessages(msgs);
      });
  }
}

sendButtonEl.addEventListener("click", handleSubmit);
inputEl.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSubmit();
  }
});

renderMessages(getMessages());
renderPreview();
