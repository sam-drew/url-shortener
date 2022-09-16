# URL Shortener
Intent Full Stack JS Developer Exercises - Task 1

- Requests to `/encode` and `/decode` should be made with a JSON body using either the `fullUrl` or `shortUrl` keys respectively. See below for an example request to `/encode`:

```json
{
  "fullUrl": "https://www.google.co.uk"
}
```

- Requests to `/` (get all) are made with no parameters.

- Requests to a short url (`/:urlCode`, a redirect) are also made with no parameters.

- For easier testing and scalability, the url shortening endpoints are defined in their own module.
  - This makes it easier to scale in terms of adding functionality. For example, if we wanted to add a location shortener to the service (similar to What Three Words) we could simply add a new 'location' module and move existing routes to `/url/`.
  - In a similar vein, compartmentalising the url shortening routes makes it easier to perform unit tests on these routes specifically.

- I used InMemoryDB to store data in memory, allowing me to use structured data. Plus, one of the things I like about NestJS is that the opinionated nature of the framework means that it usually makes more sense to use structured data stores anyway.

- I handle edge-cases by using class-validator to check that the urls submitted are valid, and don't check for a valid tld when doing a decode so that the service works when running on localhost. Additionally, by defining the data transfer objects we ensure that the incoming data is structured in the way that we want it to be.