const fs = require("fs");

const dirs = fs
  .readdirSync("./outputs")
  .filter((d) => !d.includes("."))
  .map((dirName) => dirName);

const applications = dirs.map((dir) => require(`../outputs/${dir}/data.json`));

fs.writeFileSync(
  "./db.json",
  JSON.stringify(
    {
      applications,
      flags: Object.entries(require("../data/flags")).reduce((acc, [k, v]) => {
        acc[k] = {
          id: v.id,
          name: v.name,
          description: v.description,
          priority: v.priority,
        };
        return acc;
      }, {}),
    },
    null,
    2
  )
);
