import React from 'react';
import './SearchBlock.css';
import '../components/inputs/Inputs.css'

const SearchBlock = () => {

    return (
        <div className="searchframe_position">
            <label>Поиск</label>
            <input type="text" id="search" name="search" style={{width: '60%'}}/>
        </div>
    );
}

export default SearchBlock;