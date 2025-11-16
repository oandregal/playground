# DataViews Playground

This is a playground for the @wordpress/dataviews package. It's an app designed to help developers learn and experiment with the package's features.

## Usage

Create a `.env.local` file with the following content:

```
ANTHROPIC_API_KEY='your_api_key_here'
```

Then, execute the following commands:

```sh
npm install
npm start
```

## Plan

Users can interact with an LLM (Large Language Model) in a chat to ask questions about the code, the features of the @wordpress/dataviews package, or ask the LLM to generate code for them. Additionally, it comes with a editor that users can use to directly modify the code and see the results in real-time in a preview. 

What are the components of the app?

- A code editor
- A previewer
- A chat with a LLM (Anthropic AI API)

The app has a two-column layout with the chat on the right (1/3 width of viewport) and editor/previewer on the left (2/3 width of viewport). Users can change between editor/previewer with a toggle button (a pill-like design).

I'm going to build this step-by-step.

The 1st step is to gain a better understanding of building a chat with the LLM that responds to questions and creates code based on the @wordpress/dataviews package context.

TODO:

- [x] Basic UI interface.
- [x] Update UI upon user input with mock data.
- [x] Real data via anthropic Anthropic API.
- [ ] Display code sent by the LLM.
- [ ] Tools: let the LLM use a read_example tool (or similar).
- [ ] Code-editor flow: ask before updating? Update editor vs. inline.
- [ ] Later
  - [ ] ESC: to cancel current request
  - [ ] Shift+Enter: to write in new line (increases input's height)
  - [ ] Edit any message (user or assistant)
  - [ ] Stream the response https://docs.claude.com/en/api/messages#body-stream
  - [ ] Display tokens.
