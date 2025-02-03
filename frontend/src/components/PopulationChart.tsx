import { Text } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface PopulationCount {
  year: number;
  value: number;
}

interface PopulationChartProps {
  populationData: PopulationCount[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function PopulationChart({ populationData }: PopulationChartProps){

  const options = {
    responsive: true,
    aspectRatio: window.innerWidth < 640 ? 0.85 : 2,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Population Growth',
      },
    },
  };

  const data = {
    labels: populationData?.map((item) => item.year.toString()), 
    datasets: [
      {
        label: 'Population',
        data: populationData?.map((item) => item.value),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <>
      <Text fontWeight={'700'} mt='40px' mb='10px'>Population Over Time</Text>
      {populationData && (<Bar options={options} data={data} />)}
    </>
  )
}