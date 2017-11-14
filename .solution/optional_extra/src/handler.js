/*
 * Example solution
 *
 * This solution uses all three error-handling approaches outlined in the
 * workshop.
 *
 * This is partly for illustration, and partly to show how one can transform one
 * error handling approach to another. For example, notice how `validate`
 * indicates errors using its return value, even though it calls functions which
 * indicate errors by throwing.
 */
'use strict';

const createRecord = require('./createRecord');
const validate = require('./validate');


module.exports = (req, res, body) => {
  let filename, contents;

  // JSON.parse is unsafe; if its argument is a string which is not valid JSON,
  // it will throw an error. So we need to wrap it in a try/catch block.
  //
  // In the event of an error, we know that the request the client has sent
  // cannot be processed any further, so we should respond and then return.
  try {
    const payload = JSON.parse(body);
    filename = payload.filename;
    contents = payload.contents;
  } catch (e) {
    return resJson(res, 400, { error: 'Invalid JSON' });
  }

  // Payload validation; filename and contents are validated by the `validate`
  // function, which returns an object indicating whether the payload is valid.
  //
  // If the payload is invalid, we should not continue, because we know
  // `createRecord` has unpredictable behaviour if its inputs are invalid.
  // Instead we should respond and indicate to the user what the problem is.
  const result = validate(filename, contents);
  if (! result.isValid) {
    return resJson(res, 400, { error: `Invalid parameters: ${result.message}`});
  }

  // After successfully validating the payload, we call `createRecord`, which
  // presents a callback interface.
  //
  // If the callback is executed with a truthy first argument, we respond
  // indicating there has been an error during the attempt to create the record.
  // Otherwise we respond with a success code and a message.
  createRecord(
    filename,
    contents,
    (err, message) =>
      err
        ? resJson(res, 500, { error: 'Internal Error' })
        : resJson(res, 200, { message })
  );
};

// Simple utility function to make responding simpler
const resJson = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}
