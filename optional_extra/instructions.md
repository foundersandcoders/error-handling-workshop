## Files
The only relevant places to look are in `src` and `tests/src`. You have been provided with `src/router.js` and `src/createRecord.js` files. Don't worry about them, focus instead on `src/handler.js` (the handler for the `POST /submit` endpoint), and the files you create for your validation functions.

## Steps
1. Decide how your validation code will indicate that there is a problem with the payload. You are free to use any of the three approaches outlined above (or use another approach if you feel it is appropriate).
2. Start by writing individual functions to validate each aspect of the payload. This will make it easier to adhere to TDD as you write them (which you should). We've started you off with `src/validateFilename.js` and `tests/src/validateFilename.test.js`.
3. After you have written your individual functions, you can move on to completing the handler in `src/handler.js`. This can also be approached using TDD by using the [`shot`](https://github.com/hapijs/shot) module to test your handler. We've started you off again with `src/handler.js` and `tests/src/router.test.js`.
4. After you think you have finished, run the acceptance tests with `npm run acceptance`. If any of them fail, you have missed an edge case. Otherwise, you are done :tada:
