import React, { Component } from "react"
import Timer from "./Timer"
import DeleteBtn from "../DeleteBtn"
import "./TimeTrackerCard.css"
import alarmDefault from "../assets/alarmSoundDefault.mp3"

class TimeTrackerCard extends Component {
    resetTimer = null;
    testSAT = [.65, 35, 25, 55, 50];
    breakSAT = [10, 5, 2, 1];
    testACT = [50, 60, 35, 35, 40];
    testNameOrderSAT = ["Reading", "W & L ", "Math No Calc", "Math Calc", "Essay"];
    testNameOrderACT = ["English", "Math", "Reading", "Science", "Essay"];
    state = {
        factor: this.props.factor,
        testRound: 0,
        breakRound:0,
        percentage: 0,
        currentTest: "Reading"
    };
    componentDidMount() {
        if (!this.props.SAT) {
            this.setState({ currentTest: "English" })
        }
    };
    changeTest = (testRound) => {
        if (testRound > 4) {
            this.setState({ currentTest: "Done" })
        }
        else if (this.props.SAT) {
            this.setState({ currentTest: this.testNameOrderSAT[testRound] }, this.resetTimer)
        }
        else if (this.props.ACT) {

            this.setState({ currentTest: this.testNameOrderACT[testRound] }, this.resetTimer)
        }
    }
    changePercentage = (newPercentage) => {
        if ( newPercentage === 0){
            document.getElementById("soundAlarm").play()
        }
        if (this.props.SAT) {
            this.setState({ percentage: 100 - newPercentage / (this.testSAT[this.state.testRound] * 60 * this.state.factor) * 100 })
        } else if (this.props.ACT) {
            this.setState({ percentage: 100 - newPercentage / (this.testACT[this.state.testRound] * 60 * this.state.factor) * 100 })
        }
    }
    increaseTestRound = (cb) => {
        if (this.state.testRound >= 5) {
            this.setState({ testRound: 0 }, () => this.changeTest(0))
        }
        else {
            this.setState({ testRound: this.state.testRound + 1 }, () => { if (cb) { cb(this.state.testRound) } })
        }
    }
    skipTest = () => {
        this.increaseTestRound(this.changeTest)
    }
    handleSkipTest = (resetTimer, testId) => {
        if (!this.resetTimer) {
            this.resetTimer = resetTimer;  
        } 
        // if test timer then we will reset to the new test
        else if(testId === 1){
            this.setState({ percentage: 0 }, this.skipTest)
        }
        // if it is a test timer then we will foward to new break time
        else if (testId === 2){
            if (this.state.breakRound > 2){
                return this.setState({breakRound:0}, ()=> console.log(this.state.breakRound))
            }
            else{
                this.setState({breakRound:this.state.breakRound + 1},()=> console.log(this.state.breakRound))
            }
        }
    }
    render() {
        return (
            <div className="row card-body border-top mx-1 pb-0">
                <div className="col-md-2 col-sm-12" style={{overflow:"hidden"}}> <DeleteBtn onClick={() => this.props.removeTimer(this.props.id)} />
                    {this.props.name}
                </div>
                <div className="col-md-4 minHide">
                    <div className="row testBar">
                        <div className={`col-md-12 text-light btn btn-block bg text-center rounded emphasisBtn`} style={{ overflow: "hidden" }}>
                            <div style={{ width: `${this.state.percentage}%`, height: "100%", position: "absolute", top: 0, left: 0, backgroundImage: "linear-gradient(90deg, lightgreen,lightseagreen)", transition: "1s", opacity: .5 }} onClick={() => { document.getElementById("soundAlarm").pause() }}>
                            </div>
                            <b>{`${this.state.currentTest} - ${parseFloat(100 - this.state.percentage).toFixed(2)} %`}</b>
                        </div>
                        <audio id="soundAlarm" loop >
                            <source src={alarmDefault} ></source>
                        </audio>
                    </div>
                    
                    <div className="row maxHide">
                        <div className="col-md-12 col-12">
                            <div className="skipTest float-left" onClick={() => { document.getElementById("soundAlarm").pause() }}>Alarm off</div>
                            <div className="skipTest text-right" onClick={this.handleSkipTest}>Skip Test</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-12">
                    <Timer name={1} testTimes={{ SAT: this.testSAT, ACT: this.testACT }} SAT={this.props.SAT} factor={this.state.factor} color="lightseagreen" testRound={this.state.testRound} increaseTestRound={this.increaseTestRound} changePercentage={this.changePercentage} changeTest={this.changeTest} handleSkipTest={this.handleSkipTest} />

                </div>
                <div className="col-md-3 col-sm-12">
                    <Timer name={2} SAT={this.props.SAT} breakSAT={this.breakSAT} factor={this.state.factor} testRound={this.state.testRound} breakRound={this.state.breakRound} color="steelblue" handleSkipTest={this.handleSkipTest}/>
                </div>
            </div>
        )
    }
};
export default TimeTrackerCard; 