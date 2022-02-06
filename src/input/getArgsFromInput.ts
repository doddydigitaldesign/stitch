import readline from "readline";

export const getArgsFromInput = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let name = "";
  let remotes = "";

  rl.question("What name should it use?\n", (inputName) => {
    name = inputName;
    rl.question("What remotes should it use?\n", (inputRemotes) => {
      remotes = inputRemotes;

      rl.close();
    });
  });

  
  return {name, remotes}
};
