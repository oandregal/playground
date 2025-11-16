# DataViews Playground

This is a playground for the @wordpress/dataviews package. It's an app designed to help developers learn and experiment with the package's features.

It comes with a editor that users can use to directly modify the code and see the results in real-time in a preview. Additionally, they can also interact with an LLM (Large Language Model) in a chat to ask questions about the code, the features of the @wordpress/dataviews package, or ask the LLM to generate code for them.

## Understand

What are the components of the app?

- A code editor
- A previewer
- A chat with a LLM (Anthropic AI API)

The app has a two-column layout with the chat on the right (1/3 width of viewport) and editor/previewer on the left (2/3 width of viewport). Users can change between editor/previewer with a toggle button (a pill-like design).

## Plan

I'm going to build this step-by-step. The 1st step is to gain a better understanding of building a chat with the LLM that responds to questions and creates code based on the @wordpress/dataviews package context.

I need:

- a basic chat interface: an input with a button to send messages, on top of it a list of the messages.
- a module to connect to the anthropic Anthropic API: it takes the last message from the chat UI, sends it to the API, and updates the UI with the response.

## Execute

Create a basic web page with a chat interface: just an input with a button, on top of it a list of the messages.

- Agent messages are displayed are left-aligned.
- User messages are displayed right-aligned and have a different background color.

Just use the HTML standard elements, do not use any JavaScript or external libraries yet.

## Reflect

Ignore for now. To do at a later stage.
