import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJs, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
ChartJs.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement)
import { useTheme } from '@mui/material/styles';

export default function Graphs({ data }) {
  console.log("data in graphs", data);
  const theme = useTheme();
  return (
    <>
      {data.length > 0 &&
        <Bar
          pointstyle="star"
          data={{
            labels: data?.map((item) => { return item._doc.userName }),
            responsive: true,
            // offset: true,
            datasets: [
              {
                label: "Student's Data",
                pointstyle: "rectRounded",
                backgroundColor: theme.palette.secondary.main,
                barThickness: 'flex',
                lineTension: 0,
                fill: false,
                borderJoinStyle: "round",
                borderColor: "black",
                borderWidth: 0.5,
                barPercentage: 1,
                categoryPercentage: 1,
                data: data?.map((item) => { return item.marks }), //From API
              }
            ],
          }}
          height={400}
          options={{
            // offsetGridLines: true,
            // drawTicks: true,
            // layout: {
            //   padding: {
            //     top: 30,
            //     right: 40,
            //     bottom: 40,
            //   },
            // },
            // legend: {
            //   display: true,
            //   position: "right",
            //   align: "start",
            //   labels: {
            //     usePointStyle: true,
            //   },
            // },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  stacked: true,
                  ticks: {
                    padding: 5,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              yAxes: [
                {
                  stacked: false,
                  gridLines: {
                    drawBorder: false,
                  },
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 6,
                    padding: 20,
                    callback(n) {
                      if (n < 1e3) return n;
                      if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
                    },
                  },
                },
              ],
            },
          }}

          plugins={[
            {
              afterDatasetDraw: () => {
                console.log("called");
              }
            }
          ]}
        />
      }
    </>
  );
}
