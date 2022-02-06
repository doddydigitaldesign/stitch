import { camelCase } from "../../utils/camelCase";
import { writeFile } from "../../writeFile";
import { createPublicHtmlFile } from "../shared/html.template";
import { createPackageJsonFile } from "../shared/package.template";
import { createTypescriptConfig } from "../shared/tsconfig.template";
import { createRemoteWebpackConfig } from "./webpack.template";

export const createRemoteFiles = ({
  entry,
  name,
  url,
}: {
  name: string;
  entry: string;
  url: string;
}) => {
  const outputPath = `./output/${name}`;

  const packageFile = createPackageJsonFile({ name, port: new URL(url).port });
  const webpackConfig = createRemoteWebpackConfig({
    entry,
    name,
    url,
  });
  const typeScriptConfig = createTypescriptConfig();
  const publicHtml = createPublicHtmlFile({ name });
  const entryFile = `import('./bootstrap');`;
  const bootstrapFile = `
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ${camelCase(name)} from './components/${camelCase(name)}';

  ReactDOM.render(<${camelCase(name)} name={'${camelCase(
    name
  )}'} />, document.getElementById('root'));
  `;
  const componentFile = `
  import React from 'react';

  interface Props {
      name?: string;
  }

  const ${camelCase(name)} = ({ name }: Props) => {
    return (
        <div>
            <h1>Remote {name} is loaded.</h1>
        </div>
    );
  }
  
  export default ${camelCase(name)};
  `;

  writeFile(`${outputPath}/package.json`, packageFile);
  writeFile(`${outputPath}/webpack.config.js`, webpackConfig);
  writeFile(`${outputPath}/tsconfig.json`, typeScriptConfig);
  writeFile(`${outputPath}/src/index.ts`, entryFile);
  writeFile(`${outputPath}/src/bootstrap.ts`, bootstrapFile);
  writeFile(
    `${outputPath}/src/components/${camelCase(name)}.tsx`,
    componentFile
  );
  writeFile(`${outputPath}/public/index.html`, publicHtml);

  return {
    bootstrapFile,
    componentFile,
    entryFile,
    publicHtml,
    webpackConfig,
  };
};
