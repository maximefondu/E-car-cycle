import Chart from 'chart.js';

const graph = document.querySelector('.evolution').getContext('2d')
const types = {}

fetch(`./public/json/number-car.json`)
.then(response => response.json())
.then(data => {
    
    data.forEach(type => {
        const view = type['view']
        if(view){
            const slug = type['slug']
            const numbers = Object.values(type['numbers']);
            types[slug] = numbers
        }
    })

    const char = new Chart(graph, {
        type: 'line',
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019'],
            datasets: [
                {
                    data: types.electric,
                    backgroundColor: 'transparent',
                    borderColor:'rgba(169,255,203,1)',
                },
                {
                    data: types.hybride,
                    backgroundColor: 'transparent',
                    borderColor:'rgba(9,255,203,1)',
                },
            ]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                }],
    
                yAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                    },
    
                    ticks: {
                        max: 150000,
                        min: 1000,
                        stepSize: 1000
                    }
                }],
            }
        }
    })

})