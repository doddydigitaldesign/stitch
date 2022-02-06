import fs from "fs";
import path from "path";

export const writeFile = (filePath: string, content: string) => {
  console.info(`Writing file: ${filePath}`);
  const parsed = path.parse(filePath);
  const fileName = parsed.base;
  const dirPath = parsed.dir;
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFile(path.join(dirPath, fileName), content, (err) => {
    if (err) {
      console.error(`Error writing file ${filePath}: ${err}`);
    }
  });
};
