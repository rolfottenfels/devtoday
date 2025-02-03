"use client";

import { Flex, Text } from "@chakra-ui/react";
// import styles from "./page.module.css";
import { useEffect, useState } from "react";
import CountryList from "@/components/countryList";

interface Country {
  countryCode: string;
  name: string;
  cca2: string;
}

export default function Home() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountriesList = async () => {
      try {
        const response = await fetch("http://localhost:3055");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: Country[] = await response.json();
        setCountries(jsonData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); 
        } else {
            setError("Ocorreu um erro desconhecido.");
        }
      } finally {
        setLoading(false);
      }
    };

    getCountriesList();
  }, []);

  if (loading) {
    return <Flex align={ "center" } justify={ "center" } mt='20px'>Loading...</Flex>;
  }

  if (error) {
    return <Flex align={ "center" } justify={ "center" } mt='20px'>Error: {error}</Flex>;
  }

  if (!countries) {
    return <Flex align={ "center" } justify={ "center" } mt='20px'>No data available.</Flex>;
  }

  return (
    <Flex flexDirection={'column'} alignItems={'center'} width={'full'} gap={'40px'} px='20px' mt='30px'>
      <Flex background='#3d3d3d' padding={'40px'} borderRadius={'20px'} boxShadow={'md'} width={{sm: '600px', lg: '980px'}} flexDirection={'column'} wrap={'wrap'}>
        <Text fontSize={'1.5rem'} fontWeight={'bold'}>Choose the country for more information</Text>
        <Flex flexDirection={'column'} wrap={'wrap'}>
          <CountryList countries={countries}/>
        </Flex>
      </Flex>
    </Flex>
  );
}