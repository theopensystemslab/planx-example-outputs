const graph = require("../data/southwark.json");

const path = "../outputs/advice_recommended";

const allResponses = require(`${path}/responses_and_auto_answered.json`);
const humanResponseIds = require(`${path}/human_responses.json`);

const fs = require("fs");

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const data = allResponses.reduce((acc, curr) => {
  const { src } = graph.edges.find(({ tgt }) => tgt === curr.id);

  const ob = {
    ...graph.nodes[src],
    response: {
      ...curr,
      humanResponse: humanResponseIds.includes(curr.id),
    },
  };

  const { val } = ob.response;

  if (val === "true") ob.response.val = true;
  else if (val === "false") ob.response.val = false;
  else if (isNumeric(val)) ob.response.val = Number(val);

  acc.push(ob);

  return acc;
}, []);

fs.writeFile(`${path}/data.json`, JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
});
