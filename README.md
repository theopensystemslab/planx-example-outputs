# ./data

## `./data/southwark.json`

This is _all_ of the data used in the flow. Stored in the format

```javascript
{
  nodes: {
    id1: {
      text: 'what is your favourite colour?'
    },
    id2: {
      text: 'red'
    },
    id3: {
      text: 'green'
    },
    // ...
  },
  edges: [
    { tgt: 'id1' }, // no src, so question is a root node
    { src: 'id1', tgt: 'id2' },
    { src: 'id1', tgt: 'id3' },
    // ...
  ]
}
// so id1 connects to id2 and id1 connects to id3
//
// what is your favourite colour? (id1)
// [] red (id2)
// [] green (id3)
```

## `./data/flags.js`

These are the keys/values of all the 'flags' currently in the system, most important first. They're also listed below -

#### Note: in some cases the ID does not match the 'human text' name right now e.g. EDGE_CASE='Advice recommended' (sorry!)

```javascript
{
  MISSING_INFO: 'Missing info',
  LIKELY_FAIL: 'Likely refusal',
  EDGE_CASE: 'Advice recommended',
  LIKELY_PASS: 'Likely approval',
  PRIOR_APPROVAL: 'Prior approval required',
  NO_APP_REQUIRED: 'Permitted development'
}
```

So if there were no flags attached to any of the responses the the outcome would be `NO_APP_REQUIRED`

If there was an `EDGE_CASE` flag and a `LIKELY_FAIL` flag then the outcome would be `LIKELY_FAIL` because this flag is considered to be more important.

More info in this video https://youtu.be/7Yh8S-YUJfo?t=158

# ./outputs

This directory contains screenshots and data related to the final result of a flow.

`./outputs/advice_recommended` = `EDGE_CASE` result

`./outputs/permitted_development` = `NO_APP_REQUIRED` result

## ./outputs/\*/data.json

### This is probably the most useful or 'interesting' file in the repo for you.

Includes the list of ALL responses and their related questions. It is effectively what we use to generate the results page at the end of a session.

The structure and keys might change but this will give you some insight.

| object key               | always included? | description                                                                                 |
| ------------------------ | ---------------- | ------------------------------------------------------------------------------------------- |
| `id`                     | ✓                | the id of the statement/question                                                            |
| `$t`                     | ✓                | can be ignored, this is the type i.e. 100 = Statement, 200 = Response, 300 = Portal (group) |
| `text`                   | ✓                | the human readable text of the question                                                     |
| `val`                    |                  | the passport variable linked to the question                                                |
| `info`                   |                  | text that is shown in the sidebar in the frontend                                           |
| `flag`                   |                  | ⚠️ IMPORTANT: this value will determine the headline result, see flags info above           |
| `policyRef`              |                  | where we got the rule from                                                                  |
| `howMeasured`            |                  |
| `response.id`            | ✓                | the id of the response                                                                      |
| `response.$t`            | ✓                | ignore, see above                                                                           |
| `response.text`          | ✓                | the human readable text of the response provided to the parent question                     |
| `response.humanResponse` | ✓                | if true, the response was consciously provided by the user i.e. clicked                     |
| `response.val`           |                  | the value the response has set to the question's val (passport variable)                    |

## ./outputs/\*/screenshot.png

This is a full page screenshot of all the responses that have been clicked to create the data in the subdirectory's other files.

## ./outputs/\*/responses_and_auto_answered.json

This is a list of all the response objects that have been collected and what we use to generate the final result. The objects are directly taken from `data/southwark.json` so the `id` in the object will correspond with what you find in there.

The result displayed to the user is determined by the most important `.flag` found in the list of objects (see data/flags description above for info)

## ./outputs/\*/human_responses.json

These are the IDs of the responses that the user manually selected as we were unable to answer them automatically using GIS data.

## ./outputs/\*/passport_values.json

This is an object whose keys are the spreadsheet variables and their corresponding values are stored as `.val`.

`.auto` means that the answer was automatically calculated from the GIS data.
