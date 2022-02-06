export const createTypescriptConfig = () => {
  return `{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "strict": true,
        "module": "es2022",
        "moduleResolution": "node",
        "target": "es6",
        "allowJs": true,
        "jsx": "react",
    },
    "include": [
        "./src/**/*"
    ]
}
`;
};
