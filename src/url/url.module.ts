import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  providers: [UrlService],
  controllers: [UrlController],
  imports: [InMemoryDBModule.forFeature('url')]
})
export class UrlModule {}
