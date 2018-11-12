## journey-iframe-client

[![npm version](https://badge.fury.io/js/journey-iframe-client.svg)](https://badge.fury.io/js/journey-iframe-client) [![CircleCI](https://circleci.com/gh/journeyapps/journey-iframe-client.svg?style=svg)](https://circleci.com/gh/journeyapps/journey-iframe-client)

A library used inside of an HTML component in a JourneyApps app to enable sending messages to and receiving messages from the JourneyApps Container.

## Installation

```
npm install journey-iframe-client
```

## Basic Usage

### Sending messages

```javascript
// In your HTML component

let client = new JourneyIFrameClient();

let result = await client.post('sum', 19, 23);
console.log(`The answer to life, the universe and everything is ${result}`);
```

> *Note*: `.post` calls that take a long time to resolve will cause the JourneyApps Container to bring up a blocking spinner. To make a `.post` call without bringing up a blocking spinner, use `.postNonBlocking`

```javascript
// In your view's JS

component.html().on('sum', function(p1, p2) {
  return p1 + p2;
});
```



> *Note*: `.on` handlers can be initialized anywhere in your view's JS, as long as it happens before messages are posted to them. If you need the handler ready from the view's initialization, initialize them in the view's `init()` function.

### Receiving messages

```javascript
// In your HTML component

let client = new JourneyIFrameClient();

let tasks;

client.on('sendTasksToClient', function(value) {
  tasks = value;
});
```

```javascript
// In your view's JS

function sendTasksToClient() {
  component.html().post('sendTasksToClient', getTasksToSend());
}
```

> *Known limitation*: `.post` cannot be called from your view's `init()` function, since the HTML component has not been initialized yet.

## Methods

```typescript
post(cmd: string, param1?: any, ..., paramN?: any) : Promise<any>
```

```typescript
postNonBlocking(cmd: string, param1?: any, ..., paramN?: any) : Promise<any>
```

```typescript
on(cmd: string, (param1?: any, ..., paramN?: any) => any)
```

## Developing

### Running tests

We use [Jest](https://jestjs.io/) to test this library. 

To run tests:

```
yarn test
```

### Publishing a new version

```bash
yarn version # This sets the new version in package.json and creates a tag
git push origin master --tags # CircleCI will take care of the rest
```


