import { camelCase } from "../../utils/camelCase";
import { writeFile } from "../../writeFile";
import { createPublicHtmlFile } from "../html.template";
import { createTypescriptConfig } from "../tsconfig.template";
import { createHostWebpackConfig } from "./host.template";

export const createHostFiles = ({
  name,
  remotes,
}: {
  name: string;
  remotes: string;
}) => {
  const outputPath = `./output/${name}`;

  const webpackConfig = createHostWebpackConfig({ name, remotes });
  const htmlFile = createPublicHtmlFile({ name });
  const bootstrapFile = `
  import React from 'react';
  import ReactDOM from 'react-dom';

  ReactDOM.render(<${camelCase(name)} />, document.getElementById('root'));
  `;

  const remoteComponents = remotes.split(",").map((remoteEntry) => {
    const [remoteName] = remoteEntry.split("@");

    const remoteImport = `const ${camelCase(
      remoteName
    )} = React.lazy(() => import('${remoteName}/${camelCase(remoteName)}'));`;

    const remoteJsx = `<${camelCase(remoteName)} />`;

    return { remoteImport, remoteJsx };
  });
  const componentFile = `
  import React from 'react';

  ${remoteComponents.map((obj) => obj.remoteImport).join('\n')}
  
  const ${camelCase(name)} = () => {
      return (
          <div>
          ${remoteComponents.map((obj) => obj.remoteJsx).join('\n')}
          </div>
      )
  };

  export default ${camelCase(name)};
  `;

  writeFile(`${outputPath}/webpack.config.js`, webpackConfig);
  writeFile(`${outputPath}/tsconfig.json`, createTypescriptConfig());
  writeFile(`${outputPath}/public/index.html`, htmlFile);
  writeFile(`${outputPath}/src/index.ts`, `import('./bootstrap');`);
  writeFile(`${outputPath}/src/bootstrap.tsx`, bootstrapFile);
  writeFile(`${outputPath}/src/components/${camelCase(name)}.tsx`, componentFile);
};
