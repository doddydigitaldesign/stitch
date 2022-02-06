import { camelCase } from "../../utils/camelCase";
import { writeFile } from "../../writeFile";
import { createPublicHtmlFile } from "../shared/html.template";
import { createPackageJsonFile } from "../shared/package.template";
import { createTypescriptConfig } from "../shared/tsconfig.template";
import { createHostWebpackConfig } from "./host.template";

export const createHostFiles = ({
  name,
  remotes,
}: {
  name: string;
  remotes: string;
}) => {
  const outputPath = `./output/${name}`;

  const packageFile = createPackageJsonFile({ name, port: '3000' });
  const webpackConfig = createHostWebpackConfig({ name, remotes });
  const htmlFile = createPublicHtmlFile({ name });
  const entryFile = `import('./bootstrap');`;
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

  ${remoteComponents.map((obj) => obj.remoteImport).join("\n")}
  
  const ${camelCase(name)} = () => {
      return (
          <div>
          ${remoteComponents.map((obj) => obj.remoteJsx).join("\n")}
          </div>
      )
  };

  export default ${camelCase(name)};
  `;

  writeFile(`${outputPath}/package.json`, packageFile);
  writeFile(`${outputPath}/webpack.config.js`, webpackConfig);
  writeFile(`${outputPath}/tsconfig.json`, createTypescriptConfig());
  writeFile(`${outputPath}/public/index.html`, htmlFile);
  writeFile(`${outputPath}/src/index.ts`, entryFile);
  writeFile(`${outputPath}/src/bootstrap.tsx`, bootstrapFile);
  writeFile(
    `${outputPath}/src/components/${camelCase(name)}.tsx`,
    componentFile
  );
};
