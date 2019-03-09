### Hackaton instructions for a universal login boilerplate

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and following this [Universal Logins SDK tutorial](https://universalloginsdk.readthedocs.io/en/latest/starting.html#quickstart)

How to build your own repo (without cloning this one):

```
npx create-react-app universal-app
cd universal-app
yarn global add ganache-cli
yarn add universal-login-sdk
yarn add --dev universal-login-ops

```

Then open the file package.json and add this to scripts:

```
"start:dev": "universal-login start:dev"
```

Finally, modify `src/App.js` to the files on this github

You are ready for a hackaton!

To run your app, run this command on the terminal:

```
yarn start:dev
```

Open a second terminal window on the same folder and type:

```
yarn start
```
