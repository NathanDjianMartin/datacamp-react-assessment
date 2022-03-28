import React from 'react'
import Robot from './Robot'

class RobotComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { robot: new Robot(), instruction: "", result: ""};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const upperCaseInstruction = event.target.value.toUpperCase();
    this.setState({ instruction:  upperCaseInstruction});
    this.setState({result: this.state.robot.execute(upperCaseInstruction)});
  }

  render() {
    return (
      <div id='robot' className='component'>
        <h2>Robot simulation</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Robot instructions
            <input type='text' className='textfield' name='characters' onChange={this.handleChange} />
          </label>
        </form>
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default RobotComponent;