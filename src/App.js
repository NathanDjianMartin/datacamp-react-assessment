import React from 'react';
import getEpisodes from './breakingbad/breakingbadFetcher'
import Robot from './robot/Robot'

function App() {
  return (
    <div>
      <h1>DataCamp internship coding test</h1>
      <RobotComponent />
      <BreakingBad />
    </div>
  );
}

class RobotComponent extends React.Component {

  constructor(props) {
    super(props);
    //this.state = { robot: Robot(), value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    // TODO:
  }

  render() {
    return (
      <div id='robot' className='component'>
        <h2>Robot simulation</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Robot instructions (a sequence of A, L or R characters)
            <input type='text' name='characters' onChange={this.handleChange} />
          </label>
          <input type='submit' className='submit'></input>
        </form>
      </div>
    );
  }
}

class BreakingBad extends React.Component {

  constructor(props) {
    super(props);
    this.state = { episodes: [], value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let characters = this.state.value;
    if (characters.includes(',')) {
      characters = characters.split(',');
      characters.map((character) => character.trim())
    }
    const episodes = await getEpisodes(characters);
    this.setState({ episodes: episodes });
  }

  render() {
    let i = 0;
    let episodes = this.state.episodes.map((episode) => {
      i += 1
      return <li key={i}>{episode}</li>
    });

    return (
      <div id='breakingbad' className='component'>
        <h2>Breaking Bad episodes</h2>
        <p>Search Breakind Bad episodes in which one or multiple characters appear together</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Character(s) name
            <input type='text' name='characters' onChange={this.handleChange} />
          </label>
          <input type='submit' className='submit'></input>
        </form>
        <ul>{episodes}</ul>
      </div>
    );
  }
}

export default App;
