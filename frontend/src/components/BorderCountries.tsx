'use client';
import { Flex, Link, Text } from '@chakra-ui/react';
import { Tag } from "@/components/ui/tag"

interface Border {
  commonName: string;
  countryCode: string;
}

interface CountryBorder {
  commonName: string;
  countryCode: string;
}

interface BorderCountriesProps {
  countryBorder: CountryBorder[]; 
}


export function BorderCountries({ countryBorder }: BorderCountriesProps)  {

  return (
  <>
    <Text fontWeight={'700'} mb='10px'>Borders Countries</Text>
    <Flex gap={'10px'} wrap={'wrap'}>
      {countryBorder && countryBorder.map(( border: Border ) => (
        <Link href={`/country/${border.countryCode}`} key={border.countryCode} borderRadius={'20px'}>
          <Tag color={'#eaeaea'} background={'#396f94'} padding={'5px 10px'} borderRadius={'20px'}>
            {border.commonName}
          </Tag>
        </Link>
      ))}
    </Flex>
  </>);
}