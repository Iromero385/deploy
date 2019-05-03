import React, { Component } from "react"
import moment from "moment"
import SkipButton from "./SkipButtton"

class Timer extends Component {
    intervalHandler;
    state = {
        timeStamp: null,
        status: false,
        timer: 0,
        elapseTime: 0
    };
    componentWillReceiveProps(nextProps, _nextState) {
        if (this.props.breakRound < nextProps.breakRound || nextProps.breakRound === 0) {
            const currentBreakTimeNeeded = this.props.breakSAT[nextProps.breakRound] * 60;
            this.setState({ timer: currentBreakTimeNeeded, elapseTime: currentBreakTimeNeeded })
        }
    }
    componentDidMount() {
        if (this.props.handleSkipTest) {
            this.props.handleSkipTest(this.resetTimer)
        }
        if (this.props.SAT && this.props.name === 1) {
            const currentTimeNeeded = this.props.testTimes.SAT[this.props.testRound] * 60 * this.props.factor;
            this.setState({ timer: currentTimeNeeded, elapseTime: currentTimeNeeded, testSAT: this.props.testTimes.SAT, testACT: this.props.testTimes.ACT })
        }
        else if (!this.props.SAT && this.props.name === 1) {
            const currentTimeNeeded = this.props.testTimes.ACT[this.props.testRound] * 60 * this.props.factor;
            this.setState({ timer: currentTimeNeeded, elapseTime: currentTimeNeeded, testSAT: this.props.testTimes.SAT, testACT: this.props.testTimes.ACT })
        }
        else {

            if (this.props.SAT) {
                const currentBreakTimeNeeded = this.props.breakSAT[this.props.breakRound] * 60;
                this.setState({ timer: currentBreakTimeNeeded, elapseTime: currentBreakTimeNeeded })
            }
            else {
                this.setState({ timer: 300, elapseTime: 300 })
            }

        }
    }
    timerResumes = () => {
        // elapseTime has reach zero 
        if (this.state.elapseTime <= 0) {
            if (this.props.SAT && this.props.name === 1) {
                const currentTimeNeeded = this.state.testSAT[this.props.testRound] * 60 * this.props.factor
                this.setState({ timer: currentTimeNeeded, elapseTime: currentTimeNeeded }, this.props.changeTest(this.props.testRound))
            }
            else if (!this.props.SAT & this.props.name === 1) {
                const currentTimeNeeded = this.state.testACT[this.props.testRound] * 60 * this.props.factor;
                this.setState({ timer: currentTimeNeeded, elapseTime: currentTimeNeeded }, this.props.changeTest(this.props.testRound))
            }
            else {
                if (this.props.SAT) {
                    const currentBreakTimeNeeded = this.props.breakSAT[this.props.breakRound] * 60 * this.props.factor;
                    this.setState({ timer: currentBreakTimeNeeded, elapseTime: currentBreakTimeNeeded })
                }
                else {
                    this.setState({ timer: 300, elapseTime: 300 })
                }
            }
        }
        // initialize timeStamp
        this.setState({ timeStamp: moment() })
        // using intervalHandler to display content on page every second
        
        this.intervalHandler = setInterval(() => {
            if (this.state.elapseTime <= 0) {
                console.log("it zero")
                // write what happens when the timer reaches zero
                this.props.pause(); 
                if (this.props.name === 1) {
                    this.props.increaseTestRound();
                }
                this.setState({ elapseTime: 0, status: false }, () => {
                    if (this.props.name === 1) {
                        this.props.changePercentage(0)
                    }

                })
                clearInterval(this.intervalHandler);
            }
            else {
                this.setState({ elapseTime: this.state.timer - Math.abs(this.state.timeStamp.diff(moment.now(), "seconds")) }, () => {
                    if (this.props.name === 1) {
                        this.props.changePercentage(this.state.elapseTime)
                    }
                })
            }
        }, 1000)
    }
    timerFreeze = () => {
        this.setState({ timer: this.state.elapseTime })
        clearInterval(this.intervalHandler)
    }
    toogleTimer = () => {
        if (!this.state.status) {
            this.setState({ status: !this.state.status }, this.timerResumes())
        }
        else {
            this.setState({ status: !this.state.status }, this.timerFreeze())
        }
    }
    timeConverter = (t) => {
        var hours = Math.floor(t / (60 * 60))
        var minutes = Math.floor((t % (60 * 60)) / 60)
        var seconds = t - hours * (60 * 60) - minutes * 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours === 0) {
            return `${minutes}:${seconds}`
        }
        else return `${hours}:${minutes}:${seconds}`
    }
    resetTimer = async () => {
        this.timerFreeze();
        if (this.state.status) {
            await this.setState({ status: !this.state.status })
        }
        if (this.props.SAT && this.props.name === 1) {
            const currentTimeNeeded = this.props.testTimes.SAT[this.props.testRound] * 60 * this.props.factor;
            this.setState({ timer: currentTimeNeeded, elapseTime: currentTimeNeeded, testSAT: this.props.testTimes.SAT, testACT: this.props.testTimes.ACT })
        }
        else if (!this.props.SAT && this.props.name === 1) {
            const currentTimeNeeded = this.props.testTimes.ACT[this.props.testRound] * 60 * this.props.factor;
            this.setState({ timer: currentTimeNeeded, elapseTime: currentTimeNeeded, testSAT: this.props.testTimes.SAT, testACT: this.props.testTimes.ACT })
        }
        else {

            if (this.props.SAT) {
                const currentBreakTimeNeeded = this.props.breakSAT[this.props.breakRound] * 60;
                this.setState({ timer: currentBreakTimeNeeded, elapseTime: currentBreakTimeNeeded })
            }
            else {
                this.setState({ timer: 300, elapseTime: 300 })
            }

        }
    }
    skipButton = () => {
        if (this.props.name === 2) {
            return <SkipButton name="Break" id={2} onClick={this.props.handleSkipTest} />
        }
        else {
            return <SkipButton name="Test" id={1} onClick={this.props.handleSkipTest} />
        }
    }
    render() {

        return (
            <div>
                <span className={`btn btn-block emphasisBtn`} style={{ backgroundColor: this.props.color }} onClick={() => (this.toogleTimer())}>
                    {(this.state.elapseTime === 0) ? "Next Test" : ((this.state.status) ? this.timeConverter(this.state.elapseTime) : (this.state.timer === this.state.elapseTime) ? `Start - ${this.timeConverter(this.state.elapseTime)}` : "Paused")}
                </span>
                {this.skipButton()}
            </div>

        )
    }
};
export default Timer; 