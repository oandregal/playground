export default {
  name: "display-table",
  description:
    "Display tabular data in a React table component. Use this when users ask to see data in a table format or request visualizations of structured data.",
  input_schema: {
    type: "object",
    properties: {
      data: {
        type: "array",
        description:
          "An array of objects where each object represents a row in the table. Each object should have properties matching the field ids.",
        items: {
          type: "object",
        },
      },
      fields: {
        type: "array",
        description:
          "An array of field definitions. Each field object should have 'id' (the property name in the data objects) and 'label' (the column header to display).",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The property name in the data objects",
            },
            label: {
              type: "string",
              description: "The column header label to display",
            },
          },
          required: ["id", "label"],
        },
      },
    },
    required: ["data", "fields"],
  },
};
