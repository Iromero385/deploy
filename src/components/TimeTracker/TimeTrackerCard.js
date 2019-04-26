import React, { Component } from "react"
import Timer from "./Timer"
import DeleteBtn from "../DeleteBtn"
import alarmDefault from "../assets/alarmSoundDefault.mp3"
import "./TimeTrackerCard.css"
// import style from "./TimeTrackerCard.module.css"

class TimeTrackerCard extends Component {
   
    resetTimer = null;
    alarm = null; 
    testSAT = [65, 35, 25, 55, 50];
    breakSAT = [10, 5, 2];
    testACT = [50, 60, 35, 35, 40];
    testNameOrderSAT = ["Reading", "W & L ", "Math No Calc", "Math Calc", "Essay"];
    testNameOrderACT = ["English", "Math", "Reading", "Science", "Essay"];
    state = {
        percentage: 0,
    };
    componentDidMount() {

        if (!this.props.data.SAT) {
            this.setState({ currentTest: "English" , factor:this.props.data.factor, testRound:this.props.data.testRound})
        }
        else{
            this.setState({factor:this.props.data.factor, testRound:this.props.data.testRound})
        }
    };
    changeTest = () => {
        this.props.changeTest(); 
    };
    changePercentage = (newPercentage) => {
        
        if ( newPercentage === 0){
            document.getElementById("soundAlarm").play()
        }
        if (this.props.data.SAT) {
            this.setState({ percentage: 100 - newPercentage / (this.testSAT[this.props.data.testRound] * 60 * this.props.data.factor) * 100 })
        } else if (this.props.data.ACT) {
            this.setState({ percentage: 100 - newPercentage / (this.testACT[this.props.data.testRound] * 60 * this.props.data.factor) * 100 })
        }
    };
    handleSkipTest = (resetTimer) => {
        if (!this.resetTimer) {
            this.resetTimer = resetTimer;
        } else {
            this.setState({ percentage: 0 }, this.changeTest)
        }
    };
    render() {
        return (
            <div className="row card-body border-top mx-1 pb-0">
                <div className="col-md-3 col-sm-12"> <DeleteBtn onClick={() => this.props.removeTimer(this.props.data.id)} />
                    {this.props.data.name}
                </div>
                <div className="col-md-4 minHide">
                    <div className="row testBar">
                        <div className="col-md-12 text-light btn btn-block bg text-center rounded emphasisBtn" style={{ overflow: "hidden" }}>
                            <div style={{ width: `${this.state.percentage}%`, height: "100%", position: "absolute", top: 0, left: 0, backgroundImage: "linear-gradient(90deg, lightgreen,lightseagreen)", transition: "1s", opacity: .5 }} 
                            onClick={()=> {document.getElementById("soundAlarm").pause()}}></div>
                            <b>{
                                this.props.data.SAT ? `${this.testNameOrderSAT[this.props.data.testRound]} - ${parseFloat(100 - this.state.percentage).toFixed(2)} %` : `${this.testNameOrderACT[this.props.data.testRound]} - ${parseFloat(100 - this.state.percentage).toFixed(2)} %`

                            }</b>
                            <audio id="soundAlarm" loop >
                                <source src={alarmDefault} ></source>
                            </audio>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 offset-7 pr-0">
                            <p className="skipTest text-right" onClick={this.handleSkipTest}>Skip Test</p>
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-12"> 
                    <Timer name={1} testTimes={{ SAT: this.testSAT, ACT: this.testACT }} color="lightseagreen" changePercentage={this.changePercentage} changeTest={this.changeTest} handleSkipTest={this.handleSkipTest} data={this.props.data} />
                    <div className="row maxHide">
                        <div className="col-md-12 col-12">
                            <div className="skipTest float-left" onClick={()=> {document.getElementById("soundAlarm").pause()}}>Alarm off</div>
                            <div className="skipTest text-right" onClick={this.handleSkipTest}>Skip Test</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 col-sm-12">
                    <Timer name={2} data={this.props.data} breakSAT={this.breakSAT} color="steelblue" />
                </div>
            </div>
        )
    }
};
export default TimeTrackerCard; 