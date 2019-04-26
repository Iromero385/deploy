import React from "react"
import logo from "../assets/bay-area-tutoring-logo.png"
import { FaUserClock } from "react-icons/fa";

const JumbotronHeader = () =>(
    <div className=" jumbotron h2 pb-2 pt-4 mt-3" style={{ backgroundColor: "steelblue" }}>
          <div className="row">
            <div className="col-6">
              <img src={logo} alt="BATC logo" />
            </div>
            <div className="col-4 offset-2 mt-1 ">
              <p className=" h2 text-right minHide" style={{ color: "darkslategray" }} > < FaUserClock style={{color:"lightseagreen", fontSize:"5rem"}}/> </p>
            </div>
          </div>
    </div>
)

export default JumbotronHeader;