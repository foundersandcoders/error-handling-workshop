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
5. [Exercise](#exercise)
6. [Notes](#notes)
7. [External Resources](#external-resources)

## Learning Outcomes
* Understand the need to handle errors and why poor error handling can be dangerous
* Understand how to `throw` an error
* Understand how to use `try/catch` to handle thrown errors
* Understand how to use the return error pattern
* Understand how to use the error-first callback pattern
* Understand in what contexts each of these approaches might be useful
* Understand why server-side validation is necessary for safe software

## Problem

JavaScript is a dynamically typed language. You can call a function with any types of arguments passed to it, and the function will try to execute;

```javascript
const changeVal = (func, val) => func(val)

console.log(changeVal({}, 6))

// TypeError: func is not a function
```
... and could fail and break your application.  This example seems trivial, but can easily happen (perhaps by forgetting to pass all arguments into a function, or passing them in the wrong order).

Sometimes errors happen silently, causing problems down the line that are hard to trace:

```javascript
const addTen = (num) => num + 10

const addTenToEach = (arr) => arr.map(addTen)

const arrayOfNumbersIThink = [0, 2, {number: 6}, 8]

const result = addTenToEach(arrayOfNumbersIThink)

console.log(result);
// [ 10, 12, '[object Object]10', 18 ]

nextOperation(result)
// ... danger
```
Here our `addTen` function has unknowingly worked with two different data types: a `Number` and an `Object`. When asked to add a number to an object, the JavaScript interpreter coerces them both to strings and concatenates them together to produce `'[object Object]10'`, which is not helpful.

If `arrayOfNumbersIThink` was retrieved from an **API call** or **user input**, we can't always be certain the values will be what we expect. How can we deal with these situations?

## Kinds Of Errors
Broadly speaking, errors come in two kinds [[8]](#resources):
* **Programmer errors**: These are _bugs_; they are unintended and/or unanticipated behaviour of the code, and they can only be fixed by changing the code (e.g. calling a function with the wrong number of arguments)
* **Operational errors**: These are runtime errors that are usually caused by some external factor (e.g. any kind of network error, failure to read a file, running out of memory, etc.)

How you should handle any given error depends on what kind of error it is. Operational errors are a normal part of the issues a program must deal with. They typically should not cause the program to terminate or behave unexpectedly. By contrast, programmer errors are by definition unanticipated, and may potentially leave the application with unpredictable state and behaviour. In this case it is usually best to terminate the program.

There is, however, no blanket rule for what to do; each error represents a specific problem in the context of an entire application and the appropriate response to it will be heavily context dependent.

## Approaches
Good error handling is typically not something that can just be bolted onto an existing program as an afterthought. Well conceived error handling will affect the structure of the code. In JavaScript and Node.js, there are a number of approaches, some of which are explored below.

### General Principles
Regardless of the chosen approach, there are some principles which can be generally applied:
1. **Be consistent, not ad-hoc.**
   * Inconsistent approaches to error handling will complicate your code and make it much harder to reason about.
2. **Try to trip into a failure code path as early as possible.**
   * A _code path_ is the path that data takes through your code. A _success code path_ is the path data takes if everything goes right. A _failure code path_ is the path data takes if something goes wrong.
   * For example, it may be tempting to return default values in the case of an error and allow the application to continue as normal.
   * This may be appropriate in some cases, but can often cover up the root cause of an error and make it difficult to track down, or result in unhelpful error messages.
3. **Propagate errors to a part of the application that has sufficient context to know how to deal with them.**
   * Many times, we will write generic functions to perform common actions, like making a network request.
   * If the network request fails, the generic function cannot infer the appropriate response, because it doesn't know which part of the application it has been called from.
   * It should therefore try to propagate the error to its caller instead of trying to recover directly.

### Illustrative Example
To illustrate the three approaches we will cover, we will use the same simple example in each, so that comparisons are easier. Imagine you intend to write a function `applyToInteger`, with the following signature:
```js
applyToInteger(func, integer)
```
That is, the function accepts two arguments, `func`, which is a `Function`, and `integer` which is a whole `Number`. It applies the `func` to `integer` and returns the result. We will use this example to explore how to deal with unexpected inputs.

### Approaches
We will look at three approaches in detail, each covered in their own section:
### [Approach 1: Throwing and catching errors](./docs/approach_1.md)
This section covers one way of dealing with synchronous errors.

### [Approach 2: Returning errors to the caller](./docs/approach_2.md)
This section covers another way of dealing with synchronous errors.

### [Approach 3: Error-first callbacks](./docs/approach_3.md)
This section covers the reccommended way of dealing with asynchronous errors.

# Notes
These notes are important to be aware of in general, but are not necessary for the purposes of the workshop.

#### Error-First Callback Pattern
There are a couple of gotchas when using this callback pattern:
* You _must_ ensure that the callback is not called more than once in your function. This can be done either using `if/else` blocks, `switch` statements (with `break`), or early `return` statements (e.g. `return callback(null, result)`).
* When presenting a callback interface to the caller, it will expect the callback to be executed asynchronously. In Node.js, you can use [`process.nextTick`](https://nodejs.org/api/process.html#process_process_nexttick_callback_args) for this purpose, on the client-side, you can use `setTimeout(Function, 0)`. Again, learn about the [event-loop and the call-stack](https://www.youtube.com/watch?v=8aGhZQkoFbQ) to understand why.

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
