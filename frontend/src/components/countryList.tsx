import { Flex, Tabs } from '@chakra-ui/react';
import Link from 'next/link';

interface Country {
  name: string;
  countryCode: string;
}

export default function CountryList({ countries }: { countries: Country[] }) {
  const groupedCountries = countries.reduce<Record<string, Country[]>>((acc, country) => {
    const firstLetter = country.name[0].toUpperCase(); // Pega a primeira letra
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(country);
    return acc;
  }, {});

  return (
    <Flex direction="column" mt='20px' wrap={'wrap'}>
      <Tabs.Root defaultValue="A" variant='enclosed' size={'sm'}>
        {Object.keys(groupedCountries)
          .sort()
          .map((letter) => (
            <Tabs.List key={letter} mr='3px' mb='3px' borderRadius={'20px'} width={'35px'} background={'#2d2d2d'}>
              <Tabs.Trigger value={letter} borderRadius={'20px'} width={'35px'} padding={'3px'}  color='#eaeaea'>
                {letter}
              </Tabs.Trigger>  
          </Tabs.List>
          ))}
        {Object.keys(groupedCountries).map((letter) => (
          <Tabs.Content value={letter} key={letter} mt='20px'>
              {groupedCountries[letter].map((country) => (
              <Flex key={country.countryCode} pl={4} pt='10px'>
                <Link href={`/country/${country.countryCode}`} >
                  {country.name}
                </Link>
              </Flex>
            ))}
            </Tabs.Content>
        ))}
        </Tabs.Root>
    </Flex>
  );
}
