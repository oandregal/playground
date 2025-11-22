# Playground

This is a playground for experimenting with LLM and code generation.

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

Users can interact with an LLM (Large Language Model) in a chat to ask questions or generate code for them.

TODO:

- [ ] Scroll to last message.
- [ ] Remove double messages-container div.
- [ ] ESC: to cancel current request
- [ ] Shift+Enter: to write in new line (increases input's height)
- [ ] Edit any message (user or assistant)
- [ ] Stream the response https://docs.claude.com/en/api/messages#body-stream
- [ ] Display tokens.
