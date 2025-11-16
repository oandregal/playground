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

TODO:

- [x] Basic UI interface.
- [x] Update UI upon user input with mock data.
- [ ] Real data via anthropic Anthropic API.

## Execute

### Step 1: bootstrap UI

Create a basic web page with a chat interface: just an input with a button, on top of it a list of the messages.

- Agent messages are displayed are left-aligned.
- User messages are displayed right-aligned and have a different background color.

Just use the HTML standard elements, do not use any JavaScript or external libraries yet.

## Step 2: update UI upon user input

The next step is to update the list of messages every time the user submits the input.

In the existing `index.js` file, write some JavaScript that maintains a list of messages (chat history) and updates the `div.messages-container` element upon receiving new messages:

```html
                <div class="messages-container">
                    <div class="message agent">
                        Hello! I'm here to help you learn and experiment with
                        the @wordpress/dataviews package. Feel free to ask me
                        questions or request code examples.
                    </div>

                    <div class="message user">
                        What is the @wordpress/dataviews package?
                    </div>

                    <div class="message agent">
                        The @wordpress/dataviews package is a powerful component
                        library that provides flexible and customizable data
                        visualization tools. It allows you to display and
                        interact with data in various formats including tables,
                        grids, and lists.
                    </div>

                    <div class="message user">
                        Can you show me a basic example?
                    </div>

                    <div class="message agent">
                        I'd be happy to show you an example! Once the code
                        editor is integrated, I'll be able to generate and
                        display working code samples for you to experiment with.
                    </div>
                </div>
```

### 3. Bootstrap server to handle API requests

I want to start with the minimal step possible. Boostrap a `server.js` file with all existing server-related code.

### 4. Render the page with express

I have a basic express server set up.

## Reflect

Ignore for now. To do at a later stage.
