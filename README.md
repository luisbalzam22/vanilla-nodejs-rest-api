# Vanilla Node.js REST API (No Express/3rd Party Frameworks)

This is a very simple, yet quite functional **REST API built only in Node.js, without the implementation of any 3rd party framework** like Express.js:

- It provides **full CRUD functionality**.
- It's developed mainly to both, provide a **look at how frameworks like Express.js work under the hood** for API development, and as a **starting boilerplate** for the development of a more robust API.
- It works on a "database" emulated through the file system module (fs) and a .json file containing the collection and records.
- Makes use of the "uuid" module (listed as a dependency in the package.json file) to generate IDs for each new item that's added to the .json file (the "database").
- **Completely open to extension and modification** for anyone that desires to build a REST API in vanilla Node.js with full CRUD functionality.
- The package.json file contains the "nodemon" package listed as a Dev Dependency (for ease of testing and debugging after each change done to source code).
