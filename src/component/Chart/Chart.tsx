import React, { useEffect, useState } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart Revenue',
    },
  },
};
interface Props {
  style: {},
  dataSource: [],

}
const  ChartBar = ( props: any) => {
  const { dataSource } = props;
  const [labels,setLabels] = useState<string[]>([])
  const [dataS,setData] = useState<number[]>([])

useEffect(() => {
  const dataLabels = dataSource.map((item: any) => item.Report_Time)
    const dataList = dataSource.map((item: any) => Number.parseInt(item?.Report_Value))
    setLabels(dataLabels);
    setData(dataList)
  
    console.log(props)
},[props.dataSource])

  const data = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: dataS,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar style={props.style} options={options} data={data} />;
}
export default ChartBar