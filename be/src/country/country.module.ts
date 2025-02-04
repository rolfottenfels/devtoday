import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountryService } from './country.service'; // Importe o seu serviço
import { CountryController } from './country.controller';

@Module({
  imports: [HttpModule],
  providers: [CountryService],
  exports: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
