import React from "react";
import Markdown from "react-markdown";

export default function Message({ msg }) {
  return React.createElement(
    "div",
    {
      className: `message ${msg.role}`,
    },
    React.createElement(Markdown, null, msg.content),
  );
}
