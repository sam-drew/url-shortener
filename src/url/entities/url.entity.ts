import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

// Define the shape of our url data that will be stored in the in memory database.
// Storing both the shortUrl and urlCode may seem redundant, but it saves us
// from having to destructure the shortUrl when we receive a /decode request.
export interface Url extends InMemoryDBEntity {
    fullUrl: string,
    shortUrl: string,
    urlCode: string
}