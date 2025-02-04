import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: BorderCountry[] | null;
}

export interface CountryInfoType {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: BorderCountry[];
}

export interface PopulationCount {
  year: number;
  value: number;
}

export interface PopulationData {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationCount;
  };
}

interface FlagData {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export interface FlagResponse {
  error: boolean;
  msg: string;
  data: FlagData;
}

export interface CountryData {
  countryInfo: CountryInfoType;
  flagUrl: FlagResponse;
  populationData: PopulationData;
}

@Injectable()
export class CountryService {
  countriesNowBaseUrl = process.env.COUNTRIES_NOW_BASEURL;
  dateNagerBaseUrl = process.env.DATE_NAGER_BASEURL;

  async getCountryData(countryCode: string): Promise<CountryData> {
    try {
      const countryInfo = await this.getCountryInfo(countryCode);

      const populationData = await this.getPopulationData(
        countryInfo.commonName,
      );
      const flagUrl = await this.getFlagUrl(countryInfo.countryCode);

      return {
        countryInfo,
        flagUrl,
        populationData,
      };
    } catch (error) {
      console.error('Erro ao buscar dados do país:', error);
      throw error; // Re-lança o erro para ser tratado no controller
    }
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfoType> {
    try {
      const response = await axios.get<CountryInfoType>(
        `${this.dateNagerBaseUrl}/CountryInfo/${countryCode}`,
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar a flag:', error);
      throw error;
    }
  }

  async getPopulationData(countryName: string): Promise<PopulationData> {
    try {
      const response = await axios.post<PopulationData>(
        `${this.countriesNowBaseUrl}/countries/population`,
        { country: countryName },
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar a flag:', error);
      throw error;
    }
  }

  async getFlagUrl(countryCode: string): Promise<FlagResponse> {
    try {
      const response = await axios.post<FlagResponse>(
        `${this.countriesNowBaseUrl}/countries/flag/images`,
        { iso2: countryCode },
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar a flag:', error);
      throw error;
    }
  }
}
