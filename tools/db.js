const fs = require("fs");

const dirs = fs
  .readdirSync("./outputs")
  .filter((d) => !d.includes("."))
  .map((dirName) => dirName);

const applications = dirs.map((dir) => require(`../outputs/${dir}/data.json`));

fs.writeFileSync("./db.json", JSON.stringify({ applications }, null, 2));
