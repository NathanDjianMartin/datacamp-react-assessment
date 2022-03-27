class Robot {
    constructor(x = 0, y = 0, bearing = 'NORTH') {
        this.x = x;
        this.y = y;
        this.bearing = bearing;
    }

    /**
     * Executes the given instruction and returns the robot's position and bearing.
     * If the instruction is not valid, returns an error message
     * 
     * @param {string} instruction 
     */
    execute(instruction) {
        if (this.#isValid(instruction) === false) { // I use explicit booleans test for reading purposes
            return `The instruction "${instruction}" is not valid.`;
        }

        const instructionParts = instruction.split(' ');
        this.x = parseInt(instructionParts[0]);
        this.y = parseInt(instructionParts[1]);
        this.bearing = instructionParts[2];
        const commands = instructionParts[3];

        for (let i in commands) {
            const command = commands[i];
            switch (command) {
                case 'A':
                    this.#advance();
                    break;
                case 'R':
                    this.#turnRight();
                    break;
                case 'L':
                    this.#turnLeft();
                    break;
                default:
                    throw Error(`${command} is not a valid command.`);
            }
        }

        return this.x + " " + this.y + " " + this.bearing;
    }

    /**
     * Advance the robot of one tile in his current direction
     */
    #advance() {
        switch (this.bearing) {
            case 'NORTH':
                this.y += 1;
                break;
            case 'SOUTH':
                this.y -= 1;
                break;
            case 'EAST':
                this.x += 1;
                break;
            case 'WEST':
                this.x -= 1;
                break;
            default:
                throw Error(`${this.bearing} is not a valid bearing, must be NORTH, SOUTH, WEST or EAST.`);
        }
    }

    /**
     * Turns the robot left
     */
    #turnLeft() {
        switch (this.bearing) {
            case 'NORTH':
                this.bearing = 'WEST';
                break;
            case 'SOUTH':
                this.bearing = 'EAST';
                break;
            case 'EAST':
                this.bearing = 'NORTH';
                break;
            case 'WEST':
                this.bearing = 'SOUTH';
                break;
            default:
                throw Error(`${this.bearing} is not a valid bearing, must be NORTH, SOUTH, WEST or EAST.`);
        }
    }

    /**
     * Turns the robot right
     */
    #turnRight() {
        switch (this.bearing) {
            case 'NORTH':
                this.bearing = 'EAST';
                break;
            case 'SOUTH':
                this.bearing = 'WEST';
                break;
            case 'EAST':
                this.bearing = 'SOUTH';
                break;
            case 'WEST':
                this.bearing = 'NORTH';
                break;
            default:
                throw Error(`${this.bearing} is not a valid bearing, must be NORTH, SOUTH, WEST or EAST.`);
        }
    }

    /**
     * Returns true if a given string is an instruction valid for the robot.
     * 
     * An instruction is in the format X Y BEARING COMMANDS where
     * - X is a number
     * - Y is a number
     * - BEARING is NORTH, WEST, SOUTH or EAST
     * - COMMANDS is a sequence of R, L or/and A characters
     * 
     * 
     * @param {string} instruction 
     */
    #isValid(instruction) {
        const regex = /^\d+ \d+ (NORTH|SOUTH|EAST|WEST) [R|L|A]*$/;
        return regex.test(instruction);
    }
}

export default Robot