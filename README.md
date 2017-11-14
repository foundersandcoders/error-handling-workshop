# Error Handling Workshop
**Author**: [@njsfield](https://github.com/njsfield)

**Maintainer**: [@eliascodes](https://github.com/eliascodes)

Inspired by [@rjmk](https://github.com/rjmk) and his [error handling talk](https://github.com/rjmk/fac-error-talk)

![Undefined Error Pic](./docs/node-error.png)

## Contents
1. [Learning Outcomes](#learning-outcomes)
2. [Problem](#problem)
3. [Kinds of Errors](#kinds-of-errors)
4. [Approaches](#approaches)
   1. [General principles](#general-principles)
   2. [Approach 1: Throwing and Catching Errors](#approach-1-throwing-and-catching-errors)
   3. [Approach 2: Returning Errors to the Caller](#approach-2-returning-errors-to-the-caller)
   4. [Approach 3: Error-First Callbacks](#approach-3-error-first-callbacks)
5. [Notes](#notes)
6. [External Resources](#external-resources)

## 1. Learning Outcomes
* Understand the need to handle errors and why poor error handling can be dangerous
* Understand how to `throw` an error
* Understand how to use `try/catch` to handle thrown errors
* Understand how to use the return error pattern
* Understand how to use the error-first callback pattern
* Understand in what contexts each of these approaches might be useful
* Understand why server-side validation is necessary for safe software

A bit of reading for you first:

## 2. PROBLEM, 3. KINDS OF ERRORS and 4. APPROACHES

To get introduced to the problem read [this](https://github.com/foundersandcoders/error-handling-workshop/blob/contents-and-exercises/problem.md)


### Approach 1: Throwing and Catching Errors

#### Throwing
During runtime, errors can be thrown in our application unexpectedly by computations acting on faulty computations produced earlier (like the first example above). We can also manually throw errors ourselves by using the [`throw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) keyword. This will immediately terminate the application, unless there is a [`catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) block in the call stack.

#### Catching
Errors that have been thrown can be caught using a [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) block. The `catch` block will catch all errors that arise in the `try` block, even if they are programmer errors. Ideally there would be sufficient logic in the `catch` block to differentiate these cases so that we are not at risk of recovering from a programmer error.

#### Example
```js
const applyToInteger = (func, integer) => {
  if (typeof func !== 'function') {
    throw new TypeError('Invalid argument: First argument is not a function');
  }

  if (! Number.isInteger(integer)) {
    throw new TypeError(`Invalid argument: Second argument ${integer} is not an integer`);
  }

  return func(integer);
};
```

Using this function in the REPL:
```
> applyToInteger((n) => 2 * n, 2)
4

> applyToInteger((n) => `You passed ${n}`, -4)
'You passed -4'

> applyToInteger({}, 2)
TypeError: Invalid argument: First argument is not a function
...

> applyToInteger((n) => n, 2.3)
TypeError: Invalid argument: Second argument 2.3 is not an integer
...
```

If we wish to be able to recover, we can augment this approach by using a `try/catch` block:

```js
const applyAndPrintResult = (func, integer) => {
  try {
    const result = applyToInteger(func, integer);

    console.log('Result successfully calculated:');
    console.log(`Applying ${func.name} to ${integer} gives ${result}`);
  } catch (e) {
    console.log('Sorry, result could not be calculated:');
    console.log(e.message);
  }
}
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

#### Guidance
While fairly drastic, throwing errors is a useful approach and is appropriate in many cases.
* Throwing can be useful for making critical assertions about the state of your application, especially during startup (e.g. database connection has been established).
* Throwing should **only** be used in synchronous functions, **not** in asynchronous functions. Errors thrown from asynchronous functions will not be caught. To understand why, learn about the javascript [call stack](https://www.youtube.com/watch?v=8aGhZQkoFbQ).
* Remember to use `catch` blocks to avoid inappropriate program termination. (e.g. a server should usually not crash in the course of dealing with a client request).
* Without `catch` blocks codebases that `throw` errors extensively will be very fragile.
* Do not simply log the error in a `catch` block. This can be worse than no error handling at all.
* Note that `catch` will trap errors that are thrown at any point in the call stack generated by the `try` block.

#### Trying it out
If you want to try this out yourself, complete the exercise in [exercises/approach-1](./exercises/approach-1)

### Approach 2. Returning Errors to the Caller
Rather than throwing the error, another approach you might consider is simply to return it to the caller. Our example looks very similar to the first approach, except that instead of a `try/catch` block, we have an `if/else` that checks the return value using the [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator.

#### Example
```js
const applyToInteger = (func, integer) => {
  if (typeof func !== 'function') {
    return new TypeError('Invalid argument: First argument is not a function');
  }

  if (! Number.isInteger(integer)) {
    return new TypeError(`Invalid argument: Second argument ${integer} is not an integer`);
  }

  return func(integer);
};

const applyAndPrintResult = (func, integer) => {
  const result = applyToInteger(func, integer);

  if (result instanceof Error) {
    console.log('Sorry, result could not be calculated:');
    console.log(result.message);
  } else {
    console.log('Result successfully calculated:');
    console.log(`Applying ${func.name} to ${integer} gives ${result}`);
  }
}
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

#### Guidance
* Requires more granular error checking throughout the codebase.
  * A single `catch` block can catch errors that are thrown in multiple functions if it is placed high in the call stack (which it usually should). No similar mechanism exists if errors are simply returned.
  * This places a burden on the developer(s). If they forget to place error checks on return values that might be `Error` objects, they are effectively introducing a programmer error that may result in other errors being thrown elsewhere in the application.
* Does not catch programmer errors.
  * This is actually a good thing, in light of [this](#kinds-of-errors) and [[8]](#resources).
* This is a specific example of a more general pattern, namely, returning an object which indicates whether the operation has been successful or not. Alternatives include returning an object with a `success` or `isValid` field.

#### Trying it out
If you want to try this out yourself, complete the exercise in [exercises/approach-2](./exercises/approach-2)

### Approach 3. Error-First Callbacks
This next approach is a widespread pattern in Node.js that you will already have encountered, for example when using the `fs` module. It is one of the ways that we can deal with errors that are generated during asynchronous processes in Node.js.

We can implement this pattern by requiring a third argument to be passed to `applyToInteger`, which will be a callback function that is executed both in the case where an operational error has occurred, _and_ when the operation completes successfully.

* In the error case, the callback is executed with an `Error` object as its only argument.
* In the success case, the callback is executed with `null` as its first argument and the result as its second argument

#### Example
```js
const applyToInteger = (func, integer, callback) => {
  if (typeof func !== 'function') {
    callback(new TypeError('Invalid argument: First argument is not a function'));
  }
  else if (! Number.isInteger(integer)) {
    callback(new TypeError(`Invalid argument: Second argument ${integer} is not an integer`));
  }
  else {
    callback(null, func(integer));
  }
};

const applyAndPrintResult = (func, integer) => {
  applyToInteger(func, integer, (err, result) => {
    if (err) {
      console.log('Sorry, result could not be calculated:');
      console.log(err.message);
    } else {
      console.log('Result successfully calculated:');
      console.log(`Applying ${func.name} to ${integer} gives ${result}`);
    }
  });
}
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

#### Guidance
* This is the convention for handling errors when using callbacks for asynchronous control flow in Node. Try not to deviate from this pattern when writing async callback-based code.
* Structurally similar to returning errors in that it requires checks in the calling code.
* Maintain consistent interfaces; if a function requires a callback, do not also `throw` or `return` errors to the caller.

#### Trying it out
If you want to try this out yourself, complete the exercise in [exercises/approach-3](./exercises/approach-3)

# External Resources
1. [ES6 Features - Destructuring](http://es6-features.org/#ParameterContextMatching)
2. [The Beginner's Guide to Type Coercion: A Practical Example](https://code.tutsplus.com/articles/the-beginners-guide-to-type-coercion-a-practical-example--cms-21998)
3. [404 Error Pages](https://www.smashingmagazine.com/2009/01/404-error-pages-one-more-time/)
4. [MDN - Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
5. [MDN - instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
6. [Post Requests in Node](http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js)
7. [Shot Documentation](https://github.com/hapijs/shot)
8. [Joyent - Error Handling in Node.js](https://www.joyent.com/node-js/production/design/errors)
9. [Rafe's (@rjmk) Error Handling Talk](https://github.com/rjmk/fac-error-talk)
10. [Proper Error Handling in JavaScript](https://www.sitepoint.com/proper-error-handling-javascript/)
