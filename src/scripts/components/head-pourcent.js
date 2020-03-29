import Chart from 'chart.js';

const graph = document.querySelector('.head-pourcent__canvas').getContext('2d')
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
            datasets: [
                {
                    data: types.electric,
                    backgroundColor: 'transparent',
                    borderColor:'rgba(187, 255, 202, 1)',
                },
                {
                    data: types.hybride,
                    backgroundColor: 'transparent',
                    borderColor:'rgba(184, 255, 251, 1)',
                },
                //{
                //    data: types.essence,
                //    backgroundColor: 'transparent',
                //    borderColor:'rgba(255, 214, 108, 1)',
                //},
                //{
                //    data: types.diesel,
                //    backgroundColor: 'transparent',
                //    borderColor:'rgba(237, 228, 194, 1)',
                //},
                {
                    data: types.gaz,
                    backgroundColor: 'transparent',
                    borderColor:'rgba(253, 207, 207, 1)',
                }
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
                        max: 60000,
                        min: 1000
                    }
                }],
            }
        }
    })

})