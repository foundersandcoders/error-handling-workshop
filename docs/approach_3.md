# Approach 3. Returning Errors to the Caller

Rather than throwing the error, another approach you might consider is simply to return it to the caller. Our example looks very similar to the second approach, except that instead of a `try/catch` block, we have an `if/else` that checks the return value using the [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator.

## Example

```js
const applyToInteger = (func, integer) => {
  if (typeof func !== "function") {
    return new TypeError("Invalid argument: First argument is not a function");
  }

  if (!Number.isInteger(integer)) {
    return new TypeError(`Invalid argument: Second argument ${integer} is not an integer`);
  }

  return func(integer);
};

const applyAndPrintResult = (func, integer) => {
  const result = applyToInteger(func, integer);

  if (result instanceof Error) {
    console.log("Sorry, result could not be calculated:");
    console.log(result.message);
  } else {
    console.log("Result successfully calculated:");
    console.log(`Applying ${func.name} to ${integer} gives ${result}`);
  }
};
```

Using this function in the REPL:

```
> applyAndPrintResult(function double (n) { return 2 * n; }, 2)
Result successfully calculated:
Applying double to 2 gives 4

> applyAndPrintResult(function increment (n) { return n + 1; }, -4)
Result successfully calculated:
Applying increment to -4 gives -3

> applyAndPrintResult({}, 2)
Sorry, result could not be calculated:
Invalid argument: First argument is not a function

> applyAndPrintResult((n) => n, 2.3)
Sorry, result could not be calculated:
Invalid argument: Second argument 2.3 is not an integer
```

## Guidance

* Requires more granular error checking throughout the codebase, as the returned value from a single function is checked.
  * A single `catch` block can catch errors that are thrown in multiple functions if it is placed high in the call stack (which it usually should be). No similar mechanism exists if errors are simply returned.
  * This places a burden on the developer(s). If they forget to place error checks on return values that might be `Error` objects, they are effectively introducing a programmer error that may result in other errors being thrown elsewhere in the application.
* Does not catch programmer errors.
  * This could actually be a good thing, trying to recover from programmer errors can be dangerous (see **Kinds of Errors** in the main [README](../README.md) for why).
* This is a specific example of a more general pattern, namely, returning an object which indicates whether the operation has been successful or not. Alternatives include returning an object with a `success` or `isValid` field.

## Trying it out

If you want to try this out yourself, complete the exercise in [exercises/approach-3](../exercises/approach-3). Test your solutions by running `npm run ex-3`.
