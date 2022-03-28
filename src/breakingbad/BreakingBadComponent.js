import React from 'react'
import getEpisodes from './breakingbadFetcher'

class BreakingBadComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { episodes: [], value: "" };
        this.format = this.format.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Formats a character's name by triming it and capitalizing it.
     * For example "wALTer WHITE" will return "Walter White"
     * 
     * @param {string} characterName 
     */
    format(characterName) {
        characterName = characterName.trim();
        return characterName.split(' ')
            .map((word) => {
                let result = word;
                result = result.trim();
                result = result[0].toUpperCase() + result.slice(1).toLowerCase();
                return result;
            })
            .join(' ');
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let characters = this.state.value;
        if (characters.includes(',')) {
            characters = characters.split(',');
            characters = characters.map((character) => this.format(character));
        } else {
            characters = this.format(characters);
        }
        console.log(characters);
        const episodes = await getEpisodes(characters);
        this.setState({ episodes: episodes });
    }

    render() {
        let i = 0;
        let episodes = this.state.episodes.map((episode) => {
            i += 1;
            return <li key={i} className='episode'>{episode}</li>;
        });

        return (
            <div id='breakingbad' className='component'>
                <h2>Breaking Bad episodes</h2>
                <p>Search Breakind Bad episodes in which one or multiple characters appear together</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Character(s) name
                        <input type='text' className='textfield' name='characters' onChange={this.handleChange} />
                    </label>
                    <input type='submit' className='submit'></input>
                </form>
                <ul>{episodes}</ul>
            </div>
        );
    }
}

export default BreakingBadComponent