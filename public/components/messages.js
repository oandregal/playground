import React from "react";
import Message from "./message.js";

export default function Messages({ msgs }) {
  const content = msgs.map((msg) => React.createElement(Message, { msg }));

  return React.createElement(React.Fragment, null, content);
}
