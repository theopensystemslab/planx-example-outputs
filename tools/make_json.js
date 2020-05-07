const graph = require("../data/southwark.json");

const path = "../outputs/permitted_development";

const allResponses = require(`${path}/responses_and_auto_answered.json`);
const humanResponseIds = require(`${path}/human_responses.json`);

const fs = require("fs");

const data = allResponses.reduce((acc, curr) => {
  const { src } = graph.edges.find(({ tgt }) => tgt === curr.id);

  const ob = {
    ...graph.nodes[src],
    response: {
      ...curr,
      humanResponse: humanResponseIds.includes(curr.id),
    },
  };

  switch (ob.response.val) {
    case "true":
      ob.response.val = true;
      break;
    case "false":
      ob.response.val = false;
      break;
  }

  acc.push(ob);

  return acc;
}, []);

fs.writeFile(`${path}/data.json`, JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
});
