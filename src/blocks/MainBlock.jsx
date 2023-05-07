import React from 'react';
import './MainBlock.css';
import SearchBlock from "./SearchBlock";
import NavigationBlock from "./NavigationBlock";
import ListBlock from "./ListBlock";

const MainBlock = () => {

    return (
        <div className="mainframe_position">
            <div className="left_position">
                <SearchBlock/>
                <div style={{height: '2vh'}}/>
                <NavigationBlock/>
                <div style={{height: '2vh'}}/>
                <ListBlock/>
            </div>
            <div className="right_position">

            </div>
        </div>
    );
}

export default MainBlock;