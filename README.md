## journey-iframe-client

[![CircleCI](https://circleci.com/gh/journeyapps/journey-iframe-client.svg?style=svg)](https://circleci.com/gh/journeyapps/journey-iframe-client)

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

```javascript
// In your view's JS

component.html().on('sum', function(p1, p2) {
  return p1 + p2;
});
```

### Receiving messages

```javascript
// In your HTML component

let client = new JourneyIFrameClient();

let magicValue;

client.on('set-value', function(value) {
  magicValue = value;
});
```

```javascript
// In your view's JS

function setMagicValue() {
  component.html().post('set-value', magicValue);
}
```

## Methods

```typescript
post(cmd: string, param1?: any, ..., paramN?: any) : Promise<any>
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