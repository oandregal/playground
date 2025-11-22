import React from "react";
import Message from "./message.js";

export default function Messages({ msgs }) {
  const content = msgs.map((msg) => React.createElement(Message, { msg }));

  // Check if the last message is from the user
  const lastMessage = msgs[msgs.length - 1];
  const isWaitingForResponse = lastMessage && lastMessage.role === "user";

  // If waiting, add a loading indicator
  if (isWaitingForResponse) {
    const waitingMessage = React.createElement(
      "div",
      { className: "message assistant waiting" },
      React.createElement("span", null, "●"),
      React.createElement("span", null, "●"),
      React.createElement("span", null, "●"),
    );
    content.push(waitingMessage);
  }

  return React.createElement(React.Fragment, null, content);
}
