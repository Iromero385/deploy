import React from "react";

const TableRow = ({ testName, children }) => (
  <div className={`row mt-3 ${children.length === 0 ? "d-none": "" }`}>
    <div className="col-md-12" >
      <div className="card">
        <div className="card-header"> <b>In Progress: {testName} </b> </div>
        <div className="row card-title h5 mx-0 text-light" style={{backgroundColor:"darkslategray"}}>
          <div className="col-md-3 col-4">Name</div>
          <div className="col-md-4 minHide">
            <div className="row">
              <div className="col-md-12">
                Current Test
              </div>
            </div>
          </div>
          <div className="col-md-3 col-4">Test Timer</div>
          <div className="col-md-2 col-4">Break</div>
        </div>
        {children}
      </div>
    </div>
  </div>

);
export default TableRow;