import readline from "readline";
import { createHostFiles } from "./templates/host";
import { createRemoteFiles } from "./templates/remote";

function main() {
  let name = "";
  let remotes = "";

  const [, , cmdName, cmdRemotes] = process.argv;

  if (!cmdName || !cmdRemotes) {
    // const inputArgs = getArgsFromInput();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("close", () => {
      console.table({ name, remotes });
      console.info("Creating webpack config...");

      createHostFiles({ name, remotes });

      const remotesArray = remotes.split(",");
      for (let i = 0; i < remotesArray.length; i++) {
        const remoteEntry = remotesArray[i];
        const [remoteName, remoteUrl] = remoteEntry.split("@");

        createRemoteFiles({
          name: remoteName,
          entry: "./src/index.js",
          url: remoteUrl,
        });
      }

      console.info("Shutting down...");
    });

    if (!cmdName) {
      rl.question("What name should it use?\n", (inputName) => {
        name = inputName;
        if (!cmdRemotes) {
          rl.question(
            "What remotes should it use? (Comma-separated list of: key@url, i.e \napp1@http://localhost:3000,app2@http://localhost:3001)\n",
            (inputRemotes) => {
              remotes = inputRemotes;

              rl.close();
            }
          );
        }
      });
    }
  } else {
    name = cmdName;
    remotes = cmdRemotes;

    createHostFiles({
      name,
      remotes,
    });

    const remotesArray = remotes.split(",");
    for (let i = 0; i < remotesArray.length; i++) {
      const remoteEntry = remotesArray[i];
      const [remoteName, remoteUrl] = remoteEntry.split("@");

      createRemoteFiles({
        name: remoteName,
        entry: "./src/index.js",
        url: remoteUrl,
      });
    }

    console.info("Shutting down...");
  }
}

main();
