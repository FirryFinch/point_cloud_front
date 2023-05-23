import React from 'react';
import {ScatterGL} from "scatter-gl";

import './PlotBlock.css';

class PlotBlock extends React.Component {

    renderContent() {
        const dataset = new ScatterGL.Dataset(this.props.data);
        const scatterGL = new ScatterGL(document.getElementById('spaceforplot'));
        scatterGL.render(dataset)
    }

    render() {
        return(
            <div id='spaceforplot' className="plot">
                {this.renderContent}
            </div>
        );
    }
}

export default PlotBlock;