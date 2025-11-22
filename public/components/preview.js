import React from "react";

export default function Table({ data, fields }) {
  if (!data || data.length === 0) {
    return React.createElement(
      "div",
      { className: "empty-state" },
      "Nothing to display",
    );
  }

  return React.createElement(
    "table",
    { className: "data-table" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        fields.map((field) =>
          React.createElement("th", { key: field.id }, field.label),
        ),
      ),
    ),
    React.createElement(
      "tbody",
      null,
      data.map((row, index) =>
        React.createElement(
          "tr",
          { key: index },
          fields.map((field) =>
            React.createElement("td", { key: field.id }, row[field.id]),
          ),
        ),
      ),
    ),
  );
}
