# GraphQL Playground

Express server with GraphQL and GraphiQL setup and ready to go. Other things installed/setup:

* es6
* browserify
* sass
* react
* jsx
* ejs
* ejs-mate
* assets compiled on the fly

## Install and Run

```bash
npm install -g nodemon
npm install
npm start
```

## Note

You _might_ run into [this issue](https://github.com/substack/node-browserify/issues/431). If you do:

```bash
ulimit -n 10000
npm start
```
