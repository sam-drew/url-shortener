import {
    Controller,
    Body,
    Get,
    Post,
    Param,
    Res,
    NotFoundException
} from '@nestjs/common';
import { UrlService } from './url.service';
import { DecodeDTO, EncodeDTO } from './dtos/url.dto';

@Controller()
export class UrlController {
    constructor(private readonly service: UrlService) {}

    // Apply url service for getting all to '/'.
    @Get()
    async getAll() {
        return this.service.getAll()
    }

    // Apply url service for encoding to '/encode'.
    @Post('encode')
    async encodeURL(
        @Body()
        url: EncodeDTO
    ) {
        return this.service.encodeUrl(url)
    }

    // Apply url service for decoding to '/decode'.
    @Post('decode')
    async decodeURL(
        @Body()
        url: DecodeDTO
    ) {
        try {
            return this.service.decodeUrl(url);
        } catch (error) {
            console.error(error);
            throw new NotFoundException("URL not found");
        }
    }

    // Apply url service for redirecting to '/:urlCode'.
    @Get(':urlCode')
    async redirect(
        @Res() res,
        @Param('urlCode')
        urlCode: String,
    ) {
        try {
            // Try finding the full url from urlCode, will throw exception if doesn't exist.
            const fullURL = await this.service.redirect(urlCode);
            console.log(`Redirect to ${fullURL}`)
            // If fullUrl exists, return it.
            return res.redirect(fullURL)
        } catch (error) {
            console.error(error);
            throw new NotFoundException("URL not found");
        }
    }
}
