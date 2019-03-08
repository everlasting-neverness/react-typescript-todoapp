## Todo App

### About

This is a simple CRUD Todo App implemented with React and TypeScript.
On branch 'app-with-nodejs-mongoDB-backend' there is a version with backend.

### User instructions

#### Prerequisites

```
- node.js
- npm
```

You'll also need a mongoDB database for backend version.
When you'll have one, create `config` folder in the root folder, then create `keys.js` inside `config` and add to that `.js` file next code:
```
module.exports = {
    mongoURI: 'your-mongoDB-connection-URI'
}
```

#### Installation

```
1) npm install
2) npm run client-install
```

#### Run locally in DEV mode

```
npm run dev
```
