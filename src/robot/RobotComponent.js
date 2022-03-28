import React from 'react'
import Robot from './Robot'

class RobotComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { robot: new Robot(), instruction: "", result: ""};
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const upperCaseInstruction = event.target.value.toUpperCase()
    this.setState({ instruction:  upperCaseInstruction});
    this.setState({result: this.state.robot.execute(upperCaseInstruction)})
  }

  /*
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      this.setState({result: this.state.robot.execute(this.state.instruction)});
    } catch (error) {
      console.log(error);
    }
  }
  */

  render() {
    return (
      <div id='robot' className='component'>
        <h2>Robot simulation</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Robot instructions
            <input type='text' className='textfield' name='characters' onChange={this.handleChange} />
          </label>
          {/*<input type='submit' className='submit'></input>*/}
        </form>
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default RobotComponent;