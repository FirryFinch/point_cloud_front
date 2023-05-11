import React from 'react';

import './ViewBlock.css';
import '../General.css'

import Plot from 'react-plotly.js'


class ViewBlock extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            displayInfo: false
        };
    }

    x_array = []
    y_array= []
    z_array= []

    traces = Array(1).fill(0).map((_, i) => {
        return {
            x: this.x_array,
            y: this.y_array,
            z: this.z_array,
            mode: 'markers',
            marker:
                {
                    size: 2,
                    color: '#EC6442',
                    opacity: 0.5,
                },
            type: 'scatter3d',
            hoverlabel:
                {
                    bgcolor: '#FFFFFF',
                    font:
                        {
                            family: 'Roboto, serif'
                        },
                },
        };
    });

    render() {
        if (this.props.obj.file_data_x)
        {
            this.x_array.splice(0, this.x_array.length)
            this.y_array.splice(0, this.y_array.length)
            this.z_array.splice(0, this.z_array.length)

            for(let i = 0; i < this.props.obj.file_data_x.length; i++){
                this.x_array[i] = this.props.obj.file_data_x[i];
                this.y_array[i] = this.props.obj.file_data_y[i];
                this.z_array[i] = this.props.obj.file_data_z[i];
            }

            return(
                <>
                    <div className="spaceFont"/>
                    <div className="header">
                        <div className="name_text">
                            {this.props.obj.name}
                        </div>
                        <div className="info"/>
                        <div className="download" onClick={() => {window.location = this.props.obj.file_url}}/>
                    </div>
                    <div style={{height: '2vh'}}/>
                    <div className="plot">
                        <Plot
                            data={this.traces}
                            layout=
                                {{
                                    paper_bgcolor: '#F7F7F9',
                                    height: 490,
                                    width: 680,
                                    font:
                                        {
                                            family: 'Roboto, serif',
                                            size: 14
                                        },
                                    margin:
                                        {
                                            b: 20,
                                            l: 20,
                                            r: 20,
                                            t: 20,
                                        }
                                }}
                            config=
                                {{
                                    displayModeBar: false
                                }}
                        />
                    </div>
                </>
            )
        }
        else
        {
            this.x_array.splice(0, this.x_array.length)
            this.y_array.splice(0, this.y_array.length)
            this.z_array.splice(0, this.z_array.length)
            return(
                <div className="choose_parent">
                    <div className="choose_child">
                        <div className="object_image"/>
                        <div className="space20"/>
                        Выберите объект для отображения...
                    </div>
                </div>
            )
        }
    }
}
export default ViewBlock;