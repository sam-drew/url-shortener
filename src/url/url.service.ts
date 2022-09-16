import {
    Injectable,
    BadRequestException,
    NotFoundException,
    UnprocessableEntityException
} from '@nestjs/common';
import { DecodeDTO, EncodeDTO } from './dtos/url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlService {
    constructor(private readonly urlService: InMemoryDBService<Url>) { }

    // Define method for encoding a url from a fullUrl to a shortUrl.
    async encodeUrl(url: EncodeDTO) {
        const { fullUrl } = url;

        // Check if fullUrl is a valid URL.
        if (!isURL(fullUrl)) {
            throw new BadRequestException('String Must be a Valid URL');
        }

        const baseURL = 'http://localhost:3000';

        try {
            // Check if the URL has already been shortened.
            const urlData = this.urlService.query(
                (record) => record.fullUrl === fullUrl,
            );
            // Return it if it exists
            if (urlData.length > 0) {
                // Extract the shortUrl from the in memory db return object.
                const url = urlData[0].shortUrl;
                // Nest will automatically send the response as JSON if the service returns a JSON type object.
                return { shortUrl: url };
            }

            // If the url doesn't already exist, shorten it by generating a code with nanoid.
            const urlCode = nanoid(10);
            const shortUrl = `${baseURL}/${urlCode}`;

            // Add an object representing the newly shortened url to memory.
            this.urlService.create({
                fullUrl: fullUrl,
                shortUrl: shortUrl,
                urlCode: urlCode
            })

            // Return the shortened URL.
            return { shortUrl };
        } catch (error) {
            console.error(error);
            throw new UnprocessableEntityException('Server Error');
        }
    }

    // Define method for decoding fullUrl from a shortUrl.
    async decodeUrl(url: DecodeDTO) {
        const { shortUrl } = url;

        console.log(`Decoding shortUrl: ${shortUrl}`);

        // Check if shortUrl is a valid url.
        // Set require_tld option to false so that it works with localhost in testing.
        if (!isURL(shortUrl, { require_tld: false })) {
            throw new BadRequestException('Short URL must be a valid URL');
        }

        try {
            // Try to find the associate record in memory.
            const urlData = this.urlService.query(
                (record) => record.shortUrl == shortUrl,
            );

            if (urlData.length > 0) {
                // Extract the fullUrl from the in memory db return object.
                const url = urlData[0].fullUrl;
                // Nest will automatically send the response as JSON if the service returns a JSON type object.
                return { fullUrl: url };
            }
            // If the record does not exist, throw an exception.
            throw new NotFoundException("Short URL does not exist");
        } catch (error) {
            console.error(error);
            throw new UnprocessableEntityException('Server Error');
        }
    }

    // Define method for redirecting from shortUrl to fullURl.
    async redirect(urlCode: String) {
        // Try to get the full url of the url code provided.
        const urlData = this.urlService.query(
            (record) => record.urlCode === urlCode,
        );
        // If the url code is in memory, return it.
        if (urlData.length > 0) {
            // Extract the fullUrl from the in memory db return object.
            const url = urlData[0].fullUrl;
            return url;
        }
        // Else, throw an exception.
        throw new NotFoundException("URL record not found with that urlCode");
    }

    // Define method for returning all stored urls.
    async getAll() {
        const urlsData = this.urlService.getAll();
        return { urls: urlsData }
    }
}
