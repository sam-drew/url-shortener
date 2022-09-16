import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';

@Module({
  imports: [UrlModule, InMemoryDBModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
