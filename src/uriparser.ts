//class that parses a URI into its components and returns path and parameters

export default class UriParser {
  // Class variables
  private readonly uri: string;
  private path: string;
  private parameters: { [key: string]: number | string };

  // Class constants, for validation
  private readonly validPath = "visma-identity://";
  private readonly validPaths = ["login", "confirm", "sign"];
  private readonly validKeys = {
    login: { source: "string" },
    confirm: { source: "string", paymentnumber: "number" },
    sign: { source: "string", documentid: "string" },
  };


  // Take the URI, set the path and parameters to empty strings & objects, call parseUri()
  constructor(uri: string) {
    this.uri = uri;
    this.path = "";
    this.parameters = {};
    this.parseUri();
  }

  // Validate the URI and check that path is a valid path
  private validateSchema(): boolean {
    return this.uri.indexOf(this.validPath) === 0; // Check that the URI starts with the valid path, return true or false
  }

  // Validate the path and check that it is a valid path
  private validatePath(): boolean {
    return this.validPaths.indexOf(this.path) !== -1; // Check that the path is a valid path (login, confirm or sign), return true or false
  }

  // Validate the key and value, return true or false
  private validateKeyAndValue(keyValuePair: { key: string; value: string | number }): boolean {

    //if the value is a number, convert it to a number
    if (!isNaN(Number(keyValuePair.value))) {
      keyValuePair.value = Number(keyValuePair.value);
    }

    // Set the switch to the path
    switch (this.path) {
      case "login":
        const validKeysForLogin = this.validKeys.login; // Set the valid keys to the login keys
        if (!validKeysForLogin.hasOwnProperty(keyValuePair.key)) return false; // check that the key has a valid name (source)
        if (keyValuePair.key === "source" && typeof keyValuePair.value !==this.validKeys.login["source"]) return false; // check that the source value is a string
        return true; // if the key and value are valid, return true
  
      case "confirm":
        const validKeysForConfirm = this.validKeys.confirm; // Set the valid keys to the confirm keys
        if (!validKeysForConfirm.hasOwnProperty(keyValuePair.key)) return false; // check that the key has a valid name (source or paymentnumber)
        if (keyValuePair.key === "paymentnumber" && isNaN(Number(keyValuePair.value))) return false; // check that the paymentnumber value is a number
        return true; // if the key and value are valid, return true
      case "sign":
        const validKeysForSign = this.validKeys.sign; // Set the valid keys to the sign keys
        if (!validKeysForSign.hasOwnProperty(keyValuePair.key)) return false; // check that the key has a valid name (source or documentid)
        if (keyValuePair.key === "source" && typeof keyValuePair.value !==this.validKeys.sign["source"]) return false; // check that the source value is a string
        if (keyValuePair.key === "documentid" && typeof keyValuePair.value !==this.validKeys.sign["documentid"]) return false; // check that the documentid value is a string
        return true;

      default:
        return false;
    }
  }

  // Parse the URI into path and parameters, return with getPath() and getParameters()
  private parseUri(): void {
    try {
    // Call validateSchema() to check if the URI is valid
    if (!this.validateSchema()) throw new Error("Invalid URI"); // If the URI is not valid, throw an error

    // Split the URI into parts, splitting at the question mark which separates the path from the parameters
    const uriParts = this.uri.split("?");
    // Set the path to the first part of the URI
    this.path = uriParts[0].replace(this.validPath, "");

    // Validate the path
    if (!this.validatePath()) throw new Error("Invalid path"); // If the path is not valid, throw an error

    // Split rest of the URI into parameters
    const parameters = uriParts[1].split("&");

    // Loop through the parameters, validate them and add them to the parameters array
    for (let parameter of parameters) {
      // Split the parameter into key and value
      const keyValue = parameter.split("=");

      // Set the key and value
      let key = keyValue[0];
      let value = keyValue[1];

    const keyValuePair = { key: keyValue[0], value: keyValue[1] };

      // Validate the key and value
      if (!this.validateKeyAndValue(keyValuePair)) throw new Error("Invalid key or value"); // If the key or value is not valid, throw an error

      //Add the parameters to the appropriate array, type cast if needed
      if (isNaN(Number(value))) { // If the value is not a number, add it as a string
        this.parameters[key] = value;
      } else {
        this.parameters[key] = Number(value);
      }
    }
  } catch (error) {
    // If there is an error, set the path and parameters to empty arrays
    this.path = "";
    this.parameters = {};
    if (error instanceof Error) {
      console.log({message : error.message, caused_by : this.uri})

    }
  }
}

  // Getters

  // Return the parameters
  public getParameters(): any {
    return this.parameters;
  }

  // Return the path
  public getPath(): string {
    return this.path;
  }

  // Setters

  // Set the path
  public setPath(path: string): void {
    this.path = path;
    // Validate the path
    this.parseUri();
  }
}
