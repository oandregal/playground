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
      .then((response) => {
        let data;
        let fields;
        let msg = "";
        response.content.forEach((block) => {
          if (block.type === "text") {
            msg += block.text;
          } else if (
            block.type === "tool_use" &&
            block.name === "display-table"
          ) {
            data = block.input.data;
            fields = block.input.fields;
          }
        });

        if (!msg.trim() && (!data || !fields)) {
          msg = "Updated the preview.";
        }

        renderMessages(
          addMessage({
            role: "assistant",
            content: msg,
          }),
        );
        renderPreview({ data, fields });
      })
      .catch((error) => {
        console.error("Error calling API:", error);
        renderMessages(
          addMessage({
            role: "assistant",
            content: "Sorry, there was an error getting a response.",
          }),
        );
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
