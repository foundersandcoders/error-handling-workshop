# Error Handling Workshop


## Intro

> "whatever can go wrong, will go wrong." - Capt. Edward A. Murphy, 1949

Before 1949, the saying had actually been around for years. Murphy gave it a name when working on Air Force Project MX981, a project designed to see how much sudden deceleration a person can stand in a crash. The "law" was used successfully in the project to assert good safety measures, by way of focussing on circumventing errors.


## JavaScript Error Class

- What is Error Class?
- When to use it?

## ~~throw~~ return new Error

- Problem with throwing
- (Occasional) advantage of throwing?


# User Perceived Errors

## Request to an unknown path

**Problem:** "Some joker keeps trying to make an invalid request to my server by making a GET request to a *'/lolfail'* path (which I haven't set up to handle)."

This 'joker' may actually be a legitimate user, who heard from a bad friend that the '/lolfail' path to your server returns funny videos upon making a GET request to it.
They keep making a request to this path because their browser window simply doesn't respond ("is it actually loading?"...↻...), it just hangs and doesn't connect, and they're confused as to whether the issue is related to their wifi.

**Solution:** Set up a case in your router to handle unknown paths, for example;

```javascript
if (validRoutes[request.url]) {
	validRoutes[request.url](req, res);
} else {
	notFound(request, response);
}

const notFound = (request, response) => {
  response.writeHead(404, {'content-type' : "text/html"})
  response.end('Your friend was lying to you, this path leads to nowhere')
}
```


## Console.error



### Resources
[Proper Error Handling in JavaScript](https://www.sitepoint.com/proper-error-handling-javascript/)
[404 Error Pages](https://www.smashingmagazine.com/2009/01/404-error-pages-one-more-time/)
