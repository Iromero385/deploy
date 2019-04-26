import React from "react";
import TableRow from "../TableRow"
import TimeTrackerCard from "../TimeTracker"
import Form from "../Form"
import JumbotronHeader from "../JumbotronHeader"
import db from "../utils/firebase";



class MainLayout extends React.Component {
  state = {
    digitalTimers: [],
    // singleTimers:[{id:876, duration:360, }]
  }
  componentDidMount(){
      const activeTimers = []
      db.read((data)=>{

        for(const key in data){
          activeTimers.push(data[key])
        }
        this.setState({digitalTimers:activeTimers})
      })
      db.connection(data => {
          const newState = this.state.digitalTimers.map(function(card){
            if(card.id === data.id){
              return data; 
            }
            else{
              return card; 
            }
          })
          this.setState({digitalTimers:newState}) 
      })
    
  }
  ChangeTestForChildren(id){
    const newState = this.state.digitalTimers.map((item)=>{
      if(item.id === id){
        item.testRound = item.testRound+1; 
      }
      return item
    })
    this.setState({digitalTimers: newState})
  }
  removeTimer = (id) => {

    this.setState({ digitalTimers: this.state.digitalTimers.filter((item) => !(item.id === id)) })
    console.log("timer " + id + " was removed")
  }
  addTimer = (timer, resetForm) => {
    this.state.digitalTimers.push(timer);
    this.setState({ ...this.state }, resetForm)
    


  }
  render() {
    return (

      <div className="container bg-light pb-3">
        <JumbotronHeader/>
        {/* <div className="bg-dark" > add a cloud timer</div> */}
        <Form addTimer={this.addTimer} message="test timer"/>
        {/* this willl be the single timer feature for running individual timers */}
        {/* <TableRow testName="Single Timers">
          {this.state.singleTimers.map((item) => {
              return <TimeTrackerCard name={item.name} ACT={item.ACT} id={item.id} key={item.id} factor={item.factor} removeTimer={this.removeTimer} />
              })
          }
        </TableRow> */}
        <TableRow testName="SAT">
          {this.state.digitalTimers.filter((item) => item.SAT).map((item) => {
            return <TimeTrackerCard changeTest={()=> {this.ChangeTestForChildren(item.id)}} key={item.id}  data={item} removeTimer={this.removeTimer}/>
          })}
        </TableRow>
        <TableRow testName="ACT">
          {this.state.digitalTimers.filter( item => item.ACT).map((item) => {
              return <TimeTrackerCard changeTest={()=> {this.ChangeTestForChildren(item.id)}} key={item.id}  data={item} removeTimer={this.removeTimer}/>
          })
          }
        </TableRow>
        
      </div>
    )
  }
}

export default MainLayout; 