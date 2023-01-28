# Visma Solutions - programming task

## How I understood the problem

The task was to create a program that takes in a URI in a string format, validates the scheme, path and parameters, then saves the required parts of the URI and returns them. I assumed that that the given URI always has a scheme, a path and parameters and no other parts. Also assumed that the URI is always given in a string format, and if the path was correct, and the parameters were correct as if their keys were correctly spelled and their values were of the correct type, then the URI is valid.

I chopped the problem into three parts:

- 1. Create a class that takes in a URI in a string format, and that has properties to save the required specs
- 2. Validate the URI and its parts
- 3. Save the required parts of the URI and return them


### 1. Creating a class that takes in a URI in a string format

I created a class called `UriParser` that takes in a URI in a string format. The class has three properties:

```typescript
  // Class variables
  private readonly uri: string;
  private path: string;
  private parameters: { [key: string]: number | string };
```

The constructor takes in the URI as a string and sets the properties. It also calls a method called `parseUri` that validates the URI and saves the required parts of the URI on creation of object.

```typescript
  constructor(uri: string) {
    this.uri = uri;
    this.path = "";
    this.parameters = {};
    this.parseUri();
  }
```

### 2. Validating the URI

Because the given URI consited of three parts, I wrote three methods for the class to validate each given part. 

- 1. `validateSchema` - validates the scheme part of the URI
- 2. `validatePath` - validates the path part of the URI
- 3. `validateKeyAndValue` - validates the key and value part of the URI

Validation methods check the given URIs parts by comparing them to pre-defined valid parts. If the given part is not valid, an error is thrown.

### 3. Saving the required parts of the URI and returning them

When validating the URI, properties of the class are being set. 

As parseUri runs, it sets the properties and checks if the parts are correct. If they are not, it throws an error and removes the properties. 
With simplified code, it looks like this:

```typescript
  private parseUri() {
    try {
      this.validateSchema();
      // set the path property here
      this.validatePath();
      // set the parameters property here
      this.validateKeyAndValue();
    } catch (error) {
      this.path = "";
      this.parameters = {};
      cosole.log(error);
    }
  }
```

To return the required parts of the URI, I created boilerplate getter methods for the properties:

```typescript
  public getPath() {
    return this.path; // returns a string
  }

  public getParameters() {
    return this.parameters; // returns an object with key-value pairs
  }
```

## Challenges and improvements

One challenge with the implementation is that the validation of the keys and values based on the path is done with a switch statement, making the code a bit repetitive and difficult to maintain. I really struggled with this part of the implementation, and took it actually took most of my time. I stuck with the switch statement because I couldn't think of a better way to do it, and my time was running out. I tried to make one loop that would validate the keys and values based on the path and pre-defined valid keys (See the validKeys variable in class UriParser). Something like this could be simpler and more maintainable, but I couldn't get it to work. 

The program also does not take into account the order of the keys and values, nor does it check if the parameters are given multiple times. These things could be also implemented and would make the program more robust.

I didn't have time to implement tests, but I would have liked to do that.


## Running the project

### Prerequisites

- Node.js
- npm

To install and run the project, clone the repository and run `npm install` in the src folder. I included typescript as a dev dependency, so you can run `npm run build` to compile the typescript to javascript, if typescript is not installed globally.

After installing the dependencies and compling the typescript, you can run the project with `npm start`. This will run the `dist/app.js` file, which is the compiled javascript file.

## Project structure

The project is structured as follows:

- `src` - contains the source code
- `src/uriparser.ts` - contains the uriparser class
- `src/client.ts` - contains the code that runs the uriparser class. This is a simple client that takes in a URI in a string format and runs the uriparser class on it.
- `src/app.ts` - contains the code that runs the project

## Output in terminal

If the URI is valid, the output will look like this:

```bash
npm start

> visma-task@1.0.0 start
> node dist/app.js


parameters :  { source: 'severa' }
path :  login
parameters :  { source: 'netvisor', paymentnumber: 102226 }
path :  confirm
parameters :  { source: 'vismasign', documentid: '105ab44' }

```

If the URI is invalid, the output will look like this:

```bash
npm start

> visma-task@1.0.0 start
> node dist/app.js

{
  message: 'Invalid URI',
  caused_by: 'visma-id://blaa?source=something'
}
parameters :  {}
path :  
{
  message: 'Invalid path',
  caused_by: 'visma-identity://please?source=me'
}
parameters :  {}
path :  
{
  message: 'Invalid key or value',
  caused_by: 'visma-identity://confirm?source=netvisor&paymentnumber=102226b'
}
parameters :  {}
path :  

```
