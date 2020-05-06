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

# ./outputs

This directory contains screenshots and data related to the final result of a flow.

`./outputs/advice_recommended` = `EDGE_CASE` result

`./outputs/permitted_development` = `NO_APP_REQUIRED` result

## ./outputs/\*/screenshot.png

This is a full page screenshot of all the responses that have been clicked to create the data in the subdirectory's other files.

## ./outputs/\*/responses_and_auto_answered.json

This is a list of all the response objects that have been collected and what we use to generate the final result. **This is probably the most useful or 'interesting' file in each subdirectory**. The objects are directly taken from `data/southwark.json` so the `id` in the object will correspond with what you find in there.

The result displayed to the user is determined by the most important `.flag` found in the list of objects (see data/flags description above for info)

#### Note: we could probably find a way to also include the corresponding question text in this file to make the file more complete and useful

## ./outputs/\*/human_responses.json

These are the IDs of the responses that the user manually selected as we were unable to answer them automatically using GIS data.

## ./outputs/\*/passport_values.json

This is an object whose keys are the spreadsheet variables and their corresponding values are stored as `.val`.

`.auto` means that the answer was automatically calculated from the GIS data.
