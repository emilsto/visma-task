import Client from "./client.js";

const exampleUris = [
  // Valid URIs
  "visma-identity://login?source=severa",
  "visma-identity://confirm?source=netvisor&paymentnumber=102226",
  "visma-identity://sign?source=vismasign&documentid=105ab44",
  "visma-identity://sign?documentid=105ab44&source=vismasign",

  // Invalid URIs
  "visma-id://blaa?source=something",
  "visma-identity://please?source=me",
  "visma-identity://confirm?source=netvisor&paymentnumber=102226b",
  "visma-identity://login?source=severa&paymentnumber=102a226",
  "visma-identity://sign?source=vismasign&documentid=105",

];

// Simulate clients with different URIs, sort of test the class
for (let uri of exampleUris) {
  const client = new Client(uri);
  console.log("parameters : ", client.getParameters());
  console.log("path : ", client.getPath());
}
