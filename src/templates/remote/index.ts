import { camelCase } from "../../utils/camelCase";
import { writeFile } from "../../writeFile";
import { createPublicHtmlFile } from "../html.template";
import { createTypescriptConfig } from "../tsconfig.template";
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
  const remoteOutputPath = `./output/${name}`;

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

  writeFile(`${remoteOutputPath}/wehpack.config.js`, webpackConfig);
  writeFile(`${remoteOutputPath}/tsconfig.json`, typeScriptConfig);
  writeFile(`${remoteOutputPath}/src/index.ts`, entryFile);
  writeFile(`${remoteOutputPath}/src/bootstrap.ts`, bootstrapFile);
  writeFile(
    `${remoteOutputPath}/src/components/${camelCase(name)}.tsx`,
    componentFile
  );
  writeFile(`${remoteOutputPath}/public/index.html`, publicHtml);

  return {
    bootstrapFile,
    componentFile,
    entryFile,
    publicHtml,
    webpackConfig,
  };
};
