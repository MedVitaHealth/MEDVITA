import React from "react";
import { MutatingDots } from "react-loader-spinner";

import "./LoadingSpinner.css";

const LoadingSpinner = props => {
    return (
        <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
            <MutatingDots 
                height="100"
                width="100"
                color= '#A3D3FF'
                secondaryColor= '#ec407a'
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <p className="load-text">{props.text}</p>
        </div>
    );
};

export default LoadingSpinner;

