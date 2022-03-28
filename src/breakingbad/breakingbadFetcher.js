const axios = require('axios')

/**
 * Returns all of the Breaking Bad episodes in which the given character(s) appear(s).
 * 
 * @param {string | string[]} characters 
 * @returns 
 */
async function getEpisodes(characters) {
    let result = []
    await axios
        .get('https://breakingbadapi.com/api/episodes')
        .then(res => {
            const filteredEpisodes = res.data.filter(episode => {
                return arrayContainsCharacters(episode.characters, characters)
            })
            // TODO: extract in function
            filteredEpisodes.forEach(element => {
                let string = `S${getTwoDigitsNumber(element.season)}${getTwoDigitsNumber(element.episode)} - ${element.title}`
                result.push(string)
            });
        })
        .catch(error => {
            console.error(error)
        })
    return result
}

/**
 * Returns true if the string(s) is (are) contained in the given array.
 * 
 * @param {string[]} array the array which should contain the string(s)
 * @param {string | string[]} characters a string or an array of strings
 */
function arrayContainsCharacters(array, characters) {
    if (typeof characters == "string") { // we have a single string
        return array.includes(characters)
    } else if (Array.isArray(characters)) { // we have an array of strings
        return characters.every(value => {
            return array.includes(value)
        })
    }
}

/**
 * Returns an episode or season value based on a given number.
 * For example passing 1 will return "01" and passing 12 will return "12".
 * The number must be between 0 and 99.
 * 
 * @param {number} n a number between 0 and 99
 */
function getTwoDigitsNumber(n) {
    const stringNumber = String(n).trim()
    if (stringNumber.length === 1) {
        return "0" + stringNumber
    } else if (stringNumber.length === 2) {
        return stringNumber
    } else {
        throw new Error(`The given number ${n} is not between 0 and 99.`)
    }
}

export default getEpisodes;