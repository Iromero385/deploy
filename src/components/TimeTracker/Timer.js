import React, { Component } from "react"
import moment from "moment"
import db from "../utils/firebase"

class Timer extends Component {
    intervalHandler;
    state = {
        elapseTime: this.props.data.timer

    };
    componentWillReceiveProps(nextProps, _nextState) {
        if (this.props.data.status === false && nextProps.data.status === true && this.props.name === 1) {
            this.setInterval(); // begins clock without updating firebse
        }
        else if (this.props.data.status === true && nextProps.data.status === false && this.props.name === 1) {
            clearInterval(this.intervalHandler); // pauses clock without updating firebase
        }
    }
    componentDidMount() {
        if (this.props.handleSkipTest) {
            this.props.handleSkipTest(this.resetTimer)
        }
        this.updateTimer();
        if(this.props.data.status && this.props.name === 1){
            this.setInterval(); 
        }
    }
    setInterval() {
        clearInterval(this.intervalHandler);
        this.intervalHandler = setInterval(async () => {
            if (this.state.elapseTime <= 0) {
                // write what happens when the timer reaches zero
                this.timerFreeze();
                if (this.props.name === 1) {
                    await db.nextUpdate({ ...this.props.data, status: false, timer: -1 })
                    await this.setState({ elapseTime: 0 })
                }
            }
            else {
                this.setState({ elapseTime: Math.floor(this.props.data.timer - Math.abs(this.props.data.timeStamp - moment().valueOf() / 1000)) })
                if (this.props.name === 1) {
                    this.props.changePercentage(this.state.elapseTime)
                }

            }
        }, 1000)
    }
    async updateTimer() {
        if (this.props.data.SAT && this.props.name === 1) {
            const currentTimeNeeded = this.props.testTimes.SAT[this.props.data.testRound] * this.props.data.factor;
            //initialize timer in database to begin round
            if (this.props.data.timer <= 0) {
                await db.nextUpdate({ ...this.props.data, timer: currentTimeNeeded * 60 })
                await this.setState({ elapseTime: currentTimeNeeded * 60 })
            }
            else {
                await this.setState({ elapseTime: this.props.data.timer })
            }
        }
        else if (this.props.data.ACT && this.props.name === 1) {
            const currentTimeNeeded = this.props.testTimes.ACT[this.props.data.testRound] * this.props.data.factor;
            if (this.props.data.timer <= 0) {
                await db.nextUpdate({ ...this.props.data, timer: currentTimeNeeded * 60 })
                await this.setState({ elapseTime: currentTimeNeeded * 60 })
            } else {
                this.setState({ elapseTime: this.props.data.timer })
            }
        }
        else {
            if (this.props.data.SAT) {
                const currentBreakTimeNeeded = this.props.breakSAT[this.props.data.testRound];
                await this.setState({ elapseTime: currentBreakTimeNeeded * 60 })
            }
            else {
                await this.setState({ timer: 5 * 60, elapseTime: 5 * 60 })
            }

        }
    }
    timerResumes = async () => {
        // if new timer is needed because the old timer has reach zero
        this.updateTimer()
        // initialize timeStamp
        await db.nextUpdate({ ...this.props.data, timeStamp: Math.floor(moment().valueOf() / 1000) })
        this.setInterval();
    }
    timerFreeze = async () => {
        
        await db.nextUpdate({ ...this.props.data, timer: this.state.elapseTime, status: !this.props.data.status })
    }
    toogleTimer = async () => {
        if (!this.props.data.status) {
            await db.nextUpdate({ ...this.props.data, status: !this.props.data.status })
            this.timerResumes();    
        }
        else {
            this.timerFreeze(); 
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
    resetTimer = () => {
        this.timerFreeze();
        this.setState({ status: !this.state.status })
        if (this.props.SAT && this.props.name === 1) {
            const currentTimeNeeded = this.props.testTimes.SAT[this.props.testRound] * 60 * this.props.factor;
            this.setState({ timer: currentTimeNeeded, elapseTime: currentTimeNeeded })
        }
        else if (!this.props.SAT && this.props.name === 1) {
            const currentTimeNeeded = this.props.testTimes.ACT[this.props.testRound] * 60 * this.props.factor;
            this.setState({ timer: currentTimeNeeded, elapseTime: currentTimeNeeded })
        }
        else {

            if (this.props.SAT) {
                const currentBreakTimeNeeded = this.props.breakSAT[this.props.testRound] * 60;
                this.setState({ timer: currentBreakTimeNeeded, elapseTime: currentBreakTimeNeeded })
            }
            else {
                this.setState({ timer: 300, elapseTime: 300 })
            }

        }
    }
    render() {

        return (
            <span className={`btn btn-block emphasisBtn`} style={{ backgroundColor: this.props.color }} onClick={this.toogleTimer}>
                {(this.props.data.btimer <= 0) ? "Next Test" : ((this.props.data.status) ? this.timeConverter(this.state.elapseTime) : "Paused")}
            </span>
        )
    }
};
export default Timer; 