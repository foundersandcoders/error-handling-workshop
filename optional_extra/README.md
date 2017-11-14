# Exercise: Error Handling & Server-side Validation

## Problem
Error handling is a crucial consideration when something can go wrong, or when some of the data in your application isn't quite as you expect. One of the most common examples of unexpected data posing a risk to your application is when an application has to deal with user input.

We cannot guarantee that a user will enter exactly the kind of data we expect. If we do make that assumption, we are essentially introducing an unhandled operational error into our application.

The way that we can avoid introducing this operational error is with **server-side validation**. This means validating the data that is entering your application, and making sure it is the type of data that we expect to be working with, _before_ we try to use it.


## Specification
As part of an application that serves users wishing to apply to FAC, you're running a server which accepts `POST` requests of a forms content to the path `/submit`. You need to validate the form contents before providing an appropriate response to the user, so you'll need write several functions to use inside of the handler dealing with requests to `/submit`, and write tests for these functions.

##### `POST /submit`
This endpoint accepts the following parameters in the body of the request (also known as the payload):

* `filename`: String, filename with which the application will be saved. 30 characters or fewer. Beware of [directory traversal!](https://www.owasp.org/index.php/Path_Traversal)
* `contents`: Object, with the following attributes...
  * `name`: String, name of the applicant, 30 characters or fewer.
  * `age`: Integer, between 2 and 20.
  * `body`: String, body of the application text, 10000 characters or fewer.

Once the handler has validated the parameters of the request it should call the provided `createRecord` function, which has the following signature:
```js
createRecord(filename, contents, callback)
```
* `filename`: Filename to save to, same definition as above.
* `contents`: Data structure defining the book contents with the same definition as above.
* `callback`: A function with the signature `callback(error, message)`, where `error` is either `null` or a potential `Error` object, `message` contains the response to the client.

After `createRecord` executes its callback, the handler should respond appropriately to the client.

**Note**: `createRecord` is an external library function; you don't need to understand what it does, just how to use it.

**Note**: `createRecord` performs no error checking and assumes all its inputs are correct. Incorrect inputs will have unpredictable consequences.

## Other Requirements
* The server should not crash because of a client request.
* If the client supplies bad data, the server should respond with a `400` (Bad request) status code and a helpful message indicating the problem.

## Files
The only relevant places to look are in `src` and `tests/src`. You have been provided with `src/router.js` and `src/createRecord.js` files. Don't worry about them, focus instead on `src/handler.js` (the handler for the `POST /submit` endpoint), and the files you create for your validation functions.

## Steps
1. Decide how your validation code will indicate that there is a problem with the payload. You are free to use any of the three approaches outlined above (or use another approach if you feel it is appropriate).
2. Start by writing individual functions to validate each aspect of the payload. This will make it easier to adhere to TDD as you write them (which you should). We've started you off with `src/validateFilename.js` and `tests/src/validateFilename.test.js`.
3. After you have written your individual functions, you can move on to completing the handler in `src/handler.js`. This can also be approached using TDD by using the [`shot`](https://github.com/hapijs/shot) module to test your handler. We've started you off again with `src/handler.js` and `tests/src/router.test.js`.
4. After you think you have finished, run the acceptance tests with `npm run acceptance`. If any of them fail, you have missed an edge case. Otherwise, you are done :tada:
