# Error Handling Workshop

![Undefined Error Pic](./docs/node-error.png)


## Intro

> "whatever can go wrong, will go wrong." - Capt. Edward A. Murphy, 1949

Before 1949, the saying had actually been around for years. Murphy gave it a name when working on Air Force Project MX981, a project designed to see how much sudden deceleration a person can stand in a crash. The "law" was used successfully in the project to assert good safety measures, by way of focussing on circumventing errors.

### Problem

JavaScript is a dynamically typed language. You can call a function with any types of arguments passed to it, and the function will easily try to execute;

```javascript
const changeVal = (func,val) => func(val)

console.log(changeVal({}, 6))

// TypeError: func is not a function
```
... and easily fail and break your application if needed.
This example seems trivial, but can easily happen (perhaps by forgetting to pass all arguments into a function, or passing them in the wrong order).

Sometimes errors happen silently, causing problems down the line that are hard to trace;

```javascript
const addTen = (num) => num + 10

const addTenToEach = (arr) => arr.map(num => addTen(num))

const arrayOfNumbersIThink = [0, 2, {number: 6}, 8]

const result = addTenToEach(arrayOfTheSameDataIThink)

console.log(result);
// [ 10, 12, '[object Object]10', 18 ]

nextOperation(result)
// ... danger
```
Here our **addTen** function has unknowingly worked with two different data types, and our lovely JavaScript engine has coerced them into strings and concatenated them together to produce **[object Object]10**, which is not helpful.

If **arrayOfNumbersIThink** was retrieved from an API call, we can't always be certain the values will be what we expect. How can we deal with these unknown situations?

### 1. Error Throwing

During runtime, errors can be thrown in our application unexpectedly by computations acting on faulty computations produced earlier (like the one above). We can also manually throw errors ourselves, for example;

```javascript
// 1. Application tries to import files before it starts up.
// 2. Application calls this function to assert they exist
// then prepare them in some way, and return the prepared result.
const prepareFiles = (files, prepareFunc) => {
  if (!files) {
    throw new Error('No files provided')
  } else {
    prepareFunc(files));
  }
}
```
Sometimes its best to stop our application from running before crazy things happen. Without functions like this, tracing bugs can be time consuming down the line.

### 2. Returning errors

```javascript
const changeInt = (func, int) => {
  if (!func || !int) {
    return new Error('insufficient arguments provided')
  }
  else if (!(func instanceof Function)) {
    return new Error('func is not a function')

  } else if (!Number.isInteger(int)) {
    return new Error('int argument is not an integer')

  } else {
    return func(int)
  }
}

const willFail = (func, int) => {
  const result = changeInt(func, int);
  return result instanceof Error ? true : false;
}
```

Here the existence and types of inputs are checked for the **changeInt** function. An Error is returned if the cases aren't satisfied in the if branches,
otherwise the result of calling *func(int)* is returned. The *willFail* function similarly takes the same arguments, and first calls *changeInt*, storing the result in a variable.
The *instanceof* operator is used to check whether the result is an error, and returns true if it is or false if it isn't.

### 3. Error first callbacks

```javascript
const changeInt = (func, int, cb) => {
  if (!func || !int) {
    cb(new Error('insufficient arguments provided'))
  }
  else if (!(func instanceof Function)) {
    cb(new Error('func is not a function'))

  } else if (!(Number.isInteger(int))) {
    cb(new Error('int argument is not an integer'))

  } else {
    cb(null, func(int))
  }
}

const willFail = (func, int) => {
  changeInt(func, int, (error, result) => {
    if (error) {
      console.log(error.message)
      // logging the console here is optional, but it is important to act on it in this branch
    } else {
      // do something if result
    }
  });
}
```

This is a common example that utilises callback functions which you'll see often (especially when dealing with asynchronous operations like API calls or reading file contents).
**changeInt** now accepts a callback function as its third argument. It checks the existence and types of its arguments like before, and this time if the conditions aren't satisfied then an Error is passed
as the *first* argument to the callback, otherwise *null* is passed and the result of *func(int)* is passed as the second argument.

*willFail* calls *changeInt* as before, passing its own callback function which checks if an error is provided as the first argument, and if it is then the error message is logged and a corresponding branch of code is executed, otherwise another branch of code is executed.

It is worth noting that use of the Error constructor for error first callbacks is optional...
```javascript
const changeInt = (func, int, cb) => {
  if (!func || !int) {
    cb('insufficient arguments provided'))
  }
```
This example shows a simple string passed as the first argument to the callback function. One advantage to this approach is the error message is immediately available for use if you choose to log it and continue (no need for **error.message**), but you'll be running the risk of the string error finding its way into the model of your application if you forget to handle it.

# Exercise

![Astronaut Kitten](./docs/astronaut-kitten.png)

**Problem:** As part of an application that serves users wishing to apply to be an astronaut, you're running a server which accepts POST requests of a forms content to the path **/submit**.
You need to validate the form contents before providing an appropriate response to the user, so you'll need write several functions inside of the handler dealing with requests to **/submit**, and write tests for these functions.

## Form Requirements
- **name**: String (characters allowed: letter, dash, apostrophe. Must contain at least two letters)
- **age**: Integer (must be greater than 16 but less than 80)
- **email**: String (valid email address, for help check out [this](http://stackoverflow.com/questions/46155/validate-email-address-in-javascript) stack overflow answer)
- **reason**: String (any non-empty string of any length)

## Functions Required
- validateName
- validateAge
- validateEmail
- validateReason

Working in pairs, clone this repo to get started with the basic file structure and dependencies. You should utilise the **Returning errors** and/or **Error first callback** methods described above,
and be sure to cover as many cases as possible in your tests.

The functions to build are located in the *modules* directory and the tests are located in the *tests* directory.

### (Bonus exercise if you have time)

Build a *router* for your server to handle POST requests to **/submit**. This example should help with dealing with post requests;
```javascript
const qs = require('querystring');

const router = (request, response) => {
    if (request.method == 'POST') {
        let body = '';

        request.on('data', (data) => {
            body += data;
        });

        request.on('end', () => {
            const post = qs.parse(body);
            // now deal with post
        });
    }
}
```
Your router should call a handler which utilises the *validateName*, *validateAge*, *validateEmail*, *validateReason* to check the form contents, then write either a simple success or fail response to the user. On a related note, check out [this](https://www.smashingmagazine.com/2009/01/404-error-pages-one-more-time/) great article on handling 404 errors. You can test your router using the [shot](https://github.com/hapijs/shot) module, which is added as a dependency to this project. Good luck! :)


### Resources
- [ES6 Features- Destructuring](http://es6-features.org/#ParameterContextMatching)
- [Proper Error Handling in JavaScript](https://www.sitepoint.com/proper-error-handling-javascript/)
- [The Beginner's Guide to Type Coercion: A Practical Example](https://code.tutsplus.com/articles/the-beginners-guide-to-type-coercion-a-practical-example--cms-21998)
- [404 Error Pages](https://www.smashingmagazine.com/2009/01/404-error-pages-one-more-time/)
- [MDN- Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [MDN- instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
- [Post Requests in Node](http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js)
- [Shot Documentation](https://github.com/hapijs/shot)
- [Joyent- Error Handling](https://www.joyent.com/node-js/production/design/errors)
