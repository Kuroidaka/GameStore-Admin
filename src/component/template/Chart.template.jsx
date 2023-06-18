import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const ChartTemp = (props) => {

    const { chart } = props

    const { waiting, done, decline, none } = chart
    const data = {
        labels: none? ["NO DATA"] : ['DECLINE', 'WAITING', 'DONE'],
        datasets: [
          {
            label: 'Order',
            data: none ? [1] : [decline, waiting, done],
            backgroundColor: none 
            ? ['rgba(143, 142, 142, 0.2)',] 
            : [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(7, 161, 38, 0.2)',
            ],
            borderColor: none
            ? ['rgba(0, 0, 0, 0.2)']
            :[
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgb(21, 231, 80)', 
            ],
            borderWidth: 2,
          },
        ],
      };

return <Doughnut data={data} width="100%"/>;
}

export default ChartTemp