import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export function Doughnutbader(props) {
    
    const  options={
        plugins: {
            lebels:ChartDataLabels,
           
            datalabels: {
                formatter: function(value, context) {
                    console.log("Value ", value, "  context ,", context)
                    return context.chart.data.labels[context.dataIndex];
                }
            }
          },
          onClick: function(evt, element) {
              console.log("Clicked on the element ",element)
            if(element.length > 0)
            {
              var ind = element[0]._index;
              console.log("data.datasets[0].data.splice(ind, 1); ",data.datasets[0].data.splice(ind, 1))
              console.log("data.labels.splice(ind, 1);",data.labels.splice(ind, 1))
            //   if(confirm('Do you want to remove this point?')){
            //     data.datasets[0].data.splice(ind, 1);
            //     data.labels.splice(ind, 1);
                
            //     }
            //   }
          }}
        
      }
    const plugins = [
        ChartDataLabels,
        {
        beforeDraw: function(chart) {
            
         var width = chart.width,
             height = chart.height,
             ctx = chart.ctx;
             ctx.restore();
             var fontSize = (height / 160).toFixed(2);
             ctx.font = fontSize + "em sans-serif";
             ctx.textBaseline = "top";
             var text = "Bader Data",
             textX = Math.round((width - ctx.measureText(text).width) / 2),
             textY = height / 2;
             ctx.fillText(text, textX, textY);
             ctx.save();
        } 
      }]
    const data = {
        labels:props.labels,
        datasets: [
          {
            datalabels: {
                color: '#FFCE56'
            },
            label: '# of Votes',
            
            data: props.mydata,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    return (
        <>
        <div className='header'>
          <h1 className='title'>Doughnut Chart</h1>
          <div className='links'>
          <Doughnut data={data} options={options}  plugins={plugins}  />

          </div>
        </div>
      </>
    )
}
