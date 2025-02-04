import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country') // Define a rota base para este controller
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get(':countryCode') // Rota para buscar dados por código de país
  async getCountry(@Param('countryCode') countryCode: string) {
    return this.countryService.getCountryData(countryCode);
  }
}
