<div align="center">  
  <img src="https://github.com/xNerhu/fb-chat-api-buttons/blob/master/screenshots/button.gif?raw=true">
  <h1>Chat Buttons</h1>
  
  [![Travis](https://img.shields.io/travis/xNerhu/fb-chat-api-buttons.svg?style=flat-square)](https://travis-ci.org/xNerhu/fb-chat-api-buttons.svg)
  [![NPM](https://img.shields.io/npm/v/fb-chat-api-buttons.svg?style=flat-square)](https://www.npmjs.com/package/fb-chat-api-buttons)

  An extension for [`facebook-chat-api`](https://github.com/Schmavery/facebook-chat-api), which provides slightly better UX for your chat bot by adding buttons.
</div>

## The Problem
Current use of facebook chat bots, works by sending a text command. Unfortunately it's not enough intuitive. The workaround are buttons, which help with some UX problems.

## How it works
After sending an url, facebook gets informations about website by searching meta tags. These meta tags are a way to express what a given website is about. This is called **prefetching**.
<br>For example, if you send an url to website, which looks like this:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta property="title" content="Your title" />
    <meta property="description" content="Your description" />
  </head>
  <body></body>
</html>
```

You will get this card. As you see, it has title and description.
[`Chat Buttons`](https://github.com/xnerhu/fb-chat-api-buttons) handles these meta informations which goes to facebook and handles if button has been clicked.

# Installing
> NOTE: To use buttons, you will need to have a public server.

To install Chat Buttons, run in terminal:
```bash
$ npm install fb-chat-api-buttons
```

# Quick start
```ts
const express = require("express");
const login = require("facebook-chat-api");
const { ChatButtons } = require("fb-chat-api-buttons");

let botCredentials = { email: "email", password: "password" };

const app = new express();
const buttons = new ChatButtons({
  app: app,
  endpoint: "http://www.example.com:3000/callback"
});

login(botCredentials, (err, api) => {
  buttons.setApi(api);

  api.listen((err, message) => {
    if (message.body === "test") {
      buttons.send(
        {
          id: "hello-there",
          title: "I'm a button",
          description: "Click to get a message.",
          onClick: (btn, threadID) => {
            api.sendMessage({ body: "Hello there!" }, threadID);
          }
        },
        message.threadID
      );
    }
  });
});

app.listen(3000, () => {
  console.log("Listening on 3000!");
});
```

# Documentation

* [`ChatButtons`](#ChatButtons)
* [`ChatButtons.setApi`](#setApi)
* [`ChatButtons.send`](#send)
* [`IOptions`](#IOptions)
* [`IButton`](#IButton)

<a name="ChatButtons"></a>
## Class ChatButtons
**`new ChatButtons(options: IOptions)`**

**Example**:
```ts
const app = new express();
const buttons = new ChatButtons({
  app: app,
  endpoint: "http://www.example.com:3000/callback"
});
```

<a name="setApi"></a>
## ChatButtons.setApi
**Arguments:**
* `api: any`

**Example**:
```ts
login(botCredentials, (err, api) => {
  buttons.setApi(api);
});
```

<a name="send"></a>
## ChatButtons.send
**Arguments:**
* `btn: IButton`
* `threadID: string`

**Example**:
```ts
buttons.send(
  {
    id: "btn-id",
    title: "Title",
    description: "Description",
    onClick: (btn, id) => {
      api.sendMessage({ body: "Hello world!" }, id);
    }
  },
  threadID
);

```

<a name="IOptions"></a>
## IOptions
```ts
interface {
  app: Application; // Express application
  path?: string;
  endpoint: string;
  api?: any;
}
```

<a name="IButton"></a>
## IButton
```ts
interface {
  id?: string;
  metadata?: any;
  title: string;
  description?: string;
  image?: string;
  onClick?: IButtonCallback;
}
```
