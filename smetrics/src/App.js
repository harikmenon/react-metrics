import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js';
import ReactDOM from 'react-dom';
const PlotlyComponent = createPlotlyComponent(Plotly);

class App extends Component {

    render() {
        const element = <div id="graphRoot">
            <div id="graphRow1">
                <div id="graph1"></div>
                <div id="graph2"></div>
            </div>
            <div id="graphRow2">
                        <div id="graph3"></div>
                        <div id="graph4">
                    </div>
                    </div>
            <div id="graphRow3">
                <div id="graph5"></div>
                <div id="graph6"></div>
            </div>
         </div>;

        ReactDOM.render(
            element,
            document.getElementById('root')
        );

        Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/wind_speed_laurel_nebraska.csv', function(rows){
            var trace = {
                type: 'scatter',                    // set the chart type
                mode: 'lines',                      // connect points with lines
                x: rows.map(function(row){          // set the x-data
                    return row['Time'];
                }),
                y: rows.map(function(row){          // set the x-data
                    return row['10 Min Sampled Avg'];
                }),
                line: {                             // set the width of the line.
                    width: 1
                },
                error_y: {
                    array: rows.map(function(row){    // set the height of the error bars
                        return row['10 Min Std Dev'];
                    }),
                    thickness: 0.5,                   // set the thickness of the error bars
                    width: 0
                }
            };

            var layout = {
                yaxis: {title: "Wind Speed"},       // set the y axis title
                xaxis: {
                    showgrid: false,                  // remove the x-axis grid lines
                    tickformat: "%B, %Y"              // customize the date format to "month, day"
                },
                margin: {                           // update the left, bottom, right, top margin
                    l: 40, b: 10, r: 10, t: 20
                }
            };

            Plotly.plot(document.getElementById('graph1'), [trace], layout, {showLink: false});
            Plotly.plot(document.getElementById('graph2'), [trace], layout, {showLink: false});


        });
    }
}

export default App;
