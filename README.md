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
5. [External Resources](#external-resources)

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

#### Trying it out
If you want to try this out yourself, complete the exercise in [exercises/approach-1](./exercises/approach-1)

or read more [here](https://github.com/foundersandcoders/error-handling-workshop/blob/contents-and-exercises/approaches_detail.md)

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

#### Trying it out
If you want to try this out yourself, complete the exercise in [exercises/approach-2](./exercises/approach-2)

or read more [here](https://github.com/foundersandcoders/error-handling-workshop/blob/contents-and-exercises/approaches_detail.md)


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

#### Trying it out
If you want to try this out yourself, complete the exercise in [exercises/approach-3](./exercises/approach-3)


or read more [here](https://github.com/foundersandcoders/error-handling-workshop/blob/contents-and-exercises/approaches_detail.md)


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
