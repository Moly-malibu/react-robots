
Commands used to make this repo:

```` sh
express react-robots --ejs
cd react-robots/
npm install --save-dev webpack webpack-dev-middleware webpack-hot-middleware
npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-es2015 style-loader css-loader json-loader
npm install --save react react-dom
npm install --save moment-timezone
````

Not using react-router because it conflicts with HMR.
