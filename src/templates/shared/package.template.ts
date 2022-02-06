export const createPackageJsonFile = ({
  name,
  port,
}: {
  name: string;
  port: string;
}) => {
  return `{
  "name": "${name}",
  "version": "0.1.0",
  "description": "",
  "main": "src/index.ts",
  "private": true,
  "keywords": [],
  "author": "",
  "license": "MIT",
  "scripts": {
    "start": "webpack-cli serve",
    "build": "webpack --mode production",
    "serve": "serve dist -p ${port}",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@babel/core": "7.16.7",
    "@babel/preset-react": "7.16.7",
    "@babel/preset-typescript": "7.16.7",
    "@types/react": "17.0.39",
    "@types/react-dom": "17.0.11",
    "babel-loader": "8.2.3",
    "bundle-loader": "0.5.6",
    "html-webpack-plugin": "5.5.0",
    "serve": "13.0.2",
    "typescript": "4.3.5",
    "webpack": "5.66.0",
    "webpack-cli": "4.9.2",
    "webpack-dev-server": "4.7.3"
  }
}
`;
};
