# Approach 1. Error-First Callbacks

The first approach is a widespread pattern in Node.js. It is one of the ways that we can deal with errors that are generated during asynchronous processes in Node.js. A callback argument is passed as an additional argument to a function, which will be executed both in the case where an operational error has occurred, _and_ when the operation completes successfully.

In the error case, the callback is executed with an `Error` object as its only argument. In the success case, the callback is executed with `null` as its first argument and the result as its second argument. The callback can then check if the first argument is not null and proceed accordingly.

## Example

```js
const applyToInteger = (func, integer, callback) => {
  if (typeof func !== "function") {
    callback(
      new TypeError("Invalid argument: First argument is not a function")
    );
  } else if (!Number.isInteger(integer)) {
    callback(
      new TypeError(
        `Invalid argument: Second argument ${integer} is not an integer`
      )
    );
  } else {
    callback(null, func(integer));
  }
};

const applyAndPrintResult = (func, integer) => {
  applyToInteger(func, integer, (err, result) => {
    if (err) {
      console.log("Sorry, result could not be calculated:");
      console.log(err.message);
    } else {
      console.log("Result successfully calculated:");
      console.log(`Applying ${func.name} to ${integer} gives ${result}`);
    }
  });
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

* This is the convention for handling errors when using callbacks for asynchronous control flow in Node. Try not to deviate from this pattern when writing async callback-based code.
* Structurally similar to returning errors in that it requires checks in the calling code.
* Maintain consistent interfaces; if a function requires a callback, do not also `throw` or `return` errors to the caller (these methods will be covered in approaches 2 and 3).

## Trying it out

If you want to try this out yourself, complete the exercise in [exercises/approach-1](../exercises/approach-1). Test your solutions by running `npm run ex-1`.
