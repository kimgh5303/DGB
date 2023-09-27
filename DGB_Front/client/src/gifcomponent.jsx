/* eslint-disable */
import React from 'react';

export const GifComponent = ({ gif, className="block w-3/4 h-3/4 m-auto"}) => {
    return (
        <div>
            <img className={className} src={gif} alt="..." />
        </div>
    );
};