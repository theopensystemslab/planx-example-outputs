const snakeCase = require("lodash/snakeCase");
const graph = require("../data/southwark.json");
const fs = require("fs");
const subHours = require("date-fns/subHours");
const addSeconds = require("date-fns/addSeconds");
const dirPath = "./outputs";
const { v4 } = require("uuid");

const snakeify = (ob) =>
  Object.entries(ob).reduce((acc, [k, v]) => {
    if (!k.startsWith("$")) acc[snakeCase(k)] = v;
    return acc;
  }, {});

fs.readdir(dirPath, (err, directories) => {
  if (err) throw err;

  directories
    .filter((d) => !d.startsWith("."))
    .forEach((directory) => {
      const path = `${dirPath}/${directory}`;
      const relPath = `.${path}`;

      const allResponses = require(`${relPath}/responses_and_auto_answered.json`);
      const humanResponseIds = require(`${relPath}/human_responses.json`);

      function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      let count = Math.random() * 1000;

      const date = subHours(new Date(), Math.random() * 24);

      const flow = allResponses.reduce((acc, curr) => {
        const { src } = graph.edges.find(({ tgt }) => tgt === curr.id);

        const responses = graph.edges
          .filter(({ src: id }) => id === src)
          .map(({ tgt }) => {
            const ob = { id: tgt, ...snakeify(graph.nodes[tgt]) };
            const { val } = ob;

            if (val === "true") ob.val = true;
            else if (val === "false") ob.val = false;
            else if (isNumeric(val)) ob.val = Number(val);

            return ob;
          });

        count += Math.random() * 30;

        const ob = {
          id: src,
          ...snakeify(graph.nodes[src]),
          options: responses.map(snakeify),
          choice: {
            id: curr.id,
            idx: responses.findIndex((r) => r.id === curr.id),
            recorded_at: addSeconds(date, count).toISOString(),
            auto: !humanResponseIds.includes(curr.id),
            // ...snakeify(curr),
          },
        };

        acc.push(ob);

        return acc;
      }, []);

      const data = {
        id: v4(),
        submitted_at: addSeconds(
          date,
          count + Math.random() * 30
        ).toISOString(),
        flow,
      };

      fs.writeFile(
        `${path}/data.json`,
        JSON.stringify(data, null, 2),
        (err, data) => {
          if (err) throw err;
        }
      );
    });
});
