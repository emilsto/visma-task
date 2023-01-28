//This is the dummy client that tests the URI parser
import UriParser from "./uriparser";

export default class Client {
  private uriParser: UriParser;
  private path : string;
  private parameters: { [key: string]: number | string };


  // The constructor takes a URI as a parameter
  // and creates a new UriParser object
  constructor(uri: string) {
    this.uriParser = new UriParser(uri);
    this.path = this.uriParser.getPath();
    this.parameters = this.uriParser.getParameters();
  }

  // getters

  public getParameters(): any {
    return this.parameters;
  }

  public getPath(): string {
    return this.path;
  }

}
