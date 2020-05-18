const planningPermissionFlags = {
  MISSING_INFO: {
    priority: 6,
    id: "MISSING_INFO",
    name: "Missing info",
    icon: "check",
    color: "lightgrey",
    safeColor: "blue",
    description:
      "Before your project can be assessed, there is some key information you’ll need to find out. If you do not know this information, your council may be able to help you find it out.",
  },
  LIKELY_FAIL: {
    priority: 5,
    id: "LIKELY_FAIL",
    name: "Likely refusal",
    icon: "warning",
    color: "red",
    safeColor: "red",
    description:
      "Based on the information you have provided, your project appears to require planning permission. It appears not to meet all relevant planning policies. If you wish to proceed with this proposal, we strongly recommend a pre-application meeting to discuss these with a planning officer",
  },
  EDGE_CASE: {
    priority: 4,
    id: "EDGE_CASE",
    name: "Advice recommended",
    icon: "info",
    color: "orange",
    safeColor: "orange",
    description:
      "Based on the information you have provided, your project appears to require planning permission. In order to be approved you will have to meet with certain key policy objectives. We strongly recommend a pre-application meeting to discuss these with a planning officer.",
  },
  LIKELY_PASS: {
    priority: 3,
    id: "LIKELY_PASS",
    name: "Likely approval",
    icon: "info",
    color: "green",
    safeColor: "green",
    description:
      "Based on the information you have provided your project appears to require planning permission. It does appear to comply with local planning policies, and so stands a better chance of being approved.",
  },
  PRIOR_APPROVAL: {
    priority: 2,
    id: "PRIOR_APPROVAL",
    name: "Prior approval required",
    icon: "info",
    color: "#888",
    safeColor: "yellow",
    description:
      "Based on the information you have provided, your project appears to require ‘prior approval’ only. This means it is unlikely that planning permission would be required, however this is subject to no reasonable objections being raised by neighbours or planning officers.",
  },
  NO_APP_REQUIRED: {
    priority: 1,
    id: "NO_APP_REQUIRED",
    name: "Permitted development",
    icon: "check",
    color: "grey",
    safeColor: "blue",
    description:
      "Based on the information you have provided your project appears to fall under ‘permitted development’. This means it is unlikely that planning permission would be required. However, you are strongly advised to apply for a certificate of lawful development before proceeding with any works, to provide you and future buyers with legal certainty.",
  },
};

module.exports = planningPermissionFlags;

// console.log(
//   Object.entries(planningPermissionFlags).reduce((acc, [k, v]) => {
//     acc[k] = v.name;
//     return acc;
//   }, {})
// );
