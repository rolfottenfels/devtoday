'use client';

import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BorderCountries } from '@/components/BorderCountries';
import { PopulationChart } from '@/components/PopulationChart';

interface PopulationCount {
  year: number;
  value: number;
}

interface CountryBorder {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryBorder | null;
}

interface ApiResponse {
  name: string;
  flag: string;
  officialName: string;
}

export default function CountryPage() {
  const params = useParams();

  const [ countryData, setCountryData ] = useState<ApiResponse | null>(null)
  const [ populationData, setPopulationData] = useState<PopulationCount[]>([]);
  const [ countryBorder, setCountryBorder ] = useState<CountryBorder[]>([]);

  useEffect(() => {
    getCountryData()
  },[])

  async function getCountryData() { 
    if (!params?.country) return;
    const response = await fetch(`http://localhost:3055/country/${params?.country}`);
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
     
    setCountryData({
      name: data.countryInfo.commonName,
      flag: data.flagUrl.data.flag,
      officialName: data.countryInfo.officialName,
    })

    setCountryBorder(data.countryInfo.borders)

    setPopulationData(data.populationData.data.populationCounts)

    return
  }

  return (
    <Flex px='40px' mt={'30px'} flexDirection={'column'} alignItems={'center'} width={'full'}>
      {countryData && 
        <>
          <Flex flexDirection={'column'} alignItems={'center'} width={{base: '600px', lg: '980px'}} gap={'40px'} >
            <Flex background='#3d3d3d' padding={'20px'} borderRadius={'20px'} boxShadow={'md'} width={{base: '300px', md: '600px', lg: '800px'}} flexDirection={'column'}> {/* Entra Componente Widget */}
              <Flex mb='40px'>
                <Flex>
                <Image src={countryData.flag} alt={countryData.name} width={{base: '80px', md: '120px'}}  borderRadius={'8px'}/>
                  <Flex flexDirection={'column'}>
                    <Flex>
                      <Text fontSize={{base: '1.3rem', md: '1.8rem', lg: '2.2rem'}} fontWeight={'bold'} m={'0 0 0px 20px'}>{countryData.name}</Text>
                      <Text fontSize={{base: '1.3rem', md: '1.8rem', lg: '2.2rem'}} fontWeight={'300'} m={'0 0 0px 20px'}>({params?.country})</Text>
                    </Flex>
                    <Text ml='20px'>{countryData.officialName}</Text>
                  </Flex>
                </Flex>
              </Flex>
              <BorderCountries countryBorder={countryBorder}/>
              <PopulationChart populationData={populationData}/>
            </Flex>
          </Flex>
          <Button onClick={ () => window.location.href = '/'} color={'#eaeaea'} background={'#396f94'} borderRadius={'30px'} padding={'5px 15px'} my='40px'>Back to Countries List</Button>
        </>
      }
    </Flex>
  );
}
