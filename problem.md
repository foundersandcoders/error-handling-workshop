### FILE CONTENTS:
  * Problem
  * Kind of errors
  * Approaches
  * General principles
  * Illustrative example
  * Approach 1
  * Approach 2
  * Approach 3

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
