import React from "react";

const SkipButton = (props) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <p className="skipTest text-right" onClick={()=> props.onClick(null, props.id)}>Skip {props.name}</p>
            </div>
        </div>
            )
        
        }
        
export default SkipButton; 