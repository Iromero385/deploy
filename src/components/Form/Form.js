import React, { Component } from "react";
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import "./Form.css";

class Form extends Component {

  state = {
    name: "",
    testType: "",
    factor: "",
    displayAdd: false,
  };
  componentDidMount() {

    if (this.props.message[0] === "s") {
      const defaultNames = {
        name: "temp",
        testType: "single",
        factor: 1,
      }
      this.setState(defaultNames)
    }
    else {
      this.setState({ testType: "SAT", factor: 1 })
    }
  };
  handleInputChange = event => {

    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = event => {

    event.preventDefault();
    if (this.state.name) {
      const newTimer = {
        id: Math.floor(Math.random() * 999999999 + 12),
        name: this.state.name,
        SAT: this.state.testType === "SAT" ? true : false,
        ACT: this.state.testType === "ACT" ? true : false,
        factor: this.state.factor
      }
      this.props.addTimer(newTimer, this.setState(
        {
          ...this.state, name: ""
        }
      ));
    }
  };
  openAddMenu = () => {
    this.setState({ displayAdd: !this.state.displayAdd })
  };
  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <div className="row">
          <div className="col-11 lead">
            {this.state.displayAdd ? `Adding ${this.props.message} in progress...` : `Click on the add symbol to add a ${this.props.message} timer. `}
          </div>
          <div className="col-1 text-cente">
            <div style={{ fontSize: "1.75rem", color: "lightseagreen", cursor: "pointer" }}> {this.state.displayAdd ? <IoIosCloseCircleOutline onClick={this.openAddMenu} /> : <IoIosAddCircleOutline onClick={this.openAddMenu} />}</div>
          </div>
        </div>
        <div className={`row pt-2 pb-4 mx-0 my-2 rounded ${this.state.displayAdd ? "" : "d-none"}`} style={{ backgroundColor: "lightseagreen", transition: "5s" }}>
          <div className="col-12" >
            <div className="row ">
              <div className="col-4">
                <label>Name </label>
                <input className="form-control"
                  value={this.state.name}
                  name="name"
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="col-4">
                <label>Test </label>
                <select className="form-control" name="testType" onChange={this.handleInputChange} >
                  <option>SAT</option>
                  <option>ACT</option>
                </select>
              </div>
              <div className="col-4">
                <label>Time Factor</label>
                <select className="form-control" name="factor" onChange={this.handleInputChange} >
                  <option>1</option>
                  <option>1.5</option>
                  <option>2</option>
                </select>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-2 offset-10">
                <button type="submit" className="btn btn-block" onClick={this.handleFormSubmit} style={{ backgroundColor: "darkslategray", color: "white" }}>Submit</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Form;
