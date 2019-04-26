import React from "react";
import TableRow from "../TableRow"
import TimeTrackerCard from "../TimeTracker"
import Form from "../Form"
import JumbotronHeader from "../JumbotronHeader"




class MainLayout extends React.Component {
  state = {
    digitalTimers: [{ id: 1, name: "Amir", SAT: true, factor: 1 }, { id: 3, name: "jesse", ACT: true, factor: 1 }],
    
  }
  removeTimer = (id) => {

    this.setState({ digitalTimers: this.state.digitalTimers.filter((item) => !(item.id === id)) })
  }
  addTimer = (timer, resetForm) => {
    this.state.digitalTimers.push(timer);
    this.setState({ ...this.state }, resetForm)
  }
  render() {
    return (

      <div className="container bg-light pb-3">
        <JumbotronHeader/>
        <Form addTimer={this.addTimer} message="test timer"/>
        {/* we need to play a sound when timer is done and the skip a round option */}
        <TableRow testName="SAT">
          {this.state.digitalTimers.filter((item) => item.SAT).map((item) => {
            return <TimeTrackerCard name={item.name} SAT={item.SAT} id={item.id} key={item.id} factor={item.factor} removeTimer={this.removeTimer} />
          })}
        </TableRow>
        <TableRow testName="ACT">
          {this.state.digitalTimers.filter( item => item.ACT).map((item) => {
              return <TimeTrackerCard name={item.name} ACT={item.ACT} id={item.id} key={item.id} factor={item.factor} removeTimer={this.removeTimer} />
          })
          }
        </TableRow>
        
      </div>
    )
  }
}

export default MainLayout; 