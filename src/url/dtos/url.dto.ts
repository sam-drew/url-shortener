import { IsString, IsNotEmpty } from 'class-validator';

// Define the encode data transfer object.
// When encoding a url we want a 'fullUrl' that is a string and is not empty.
export class EncodeDTO {
    @IsString()
    @IsNotEmpty()
    fullUrl: string;
}

// Define the decode data transfer object.
// When decoding a url we want a 'shortUrl' that is a string and is not empty.
export class DecodeDTO {
    @IsString()
    @IsNotEmpty()
    shortUrl: string;
}