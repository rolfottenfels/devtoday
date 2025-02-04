import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface Country {
  countryCode: string;
  countryName: string;
}

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Country[] | null;
}

export interface PopulationItem {
  country: string;
  populationCounts: { year: number; value: number }[];
}

@Injectable()
export class AppService {
  async getAvailableCountries(): Promise<Country[]> {
    const dateNagerBaseUrl = process.env.DATE_NAGER_BASEURL;

    try {
      const response = await axios.get<Country[]>(
        `${dateNagerBaseUrl}/AvailableCountries`,
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
