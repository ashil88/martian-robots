/// <reference path="jquery.d.ts" />
class MartianRobotsManager {
    constructor(martiansWrapper) {
        this.coordinatesForm = martiansWrapper.find('#bounds');
        this.instructionsForm = martiansWrapper.find('#instructions');
        this.marsBounds = { 'x': 0, 'y': 0 };
        this.orientation = ['N', 'E', 'S', 'W'];
        this.coordinatesForm.on('submit', (e) => {
            e.preventDefault();
            this.submitCoordinatesForm();
        });
        this.instructionsForm.on('submit', (e) => {
            e.preventDefault();
            this.robotInput = this.submitInstructionsForm();
            this.robotPosition = this.setInitialRobotPosition(this.robotInput[0]);
            this.processRobotInstructions(this.robotInput[1]);
        });
    }
    submitCoordinatesForm() {
        this.marsBounds['x'] = parseFloat($('#coord_x').val().toString()),
            this.marsBounds['y'] = parseFloat($('#coord_y').val().toString());
        return this.marsBounds;
    }
    submitInstructionsForm() {
        let robot_input = this.instructionsForm.find('textarea').val(), robot_input_split = robot_input.split('\n');
        return robot_input_split;
    }
    setInitialRobotPosition(inputPosition) {
        let initial_position = inputPosition.split(' '), initial_position_parsed = [{ 'x': parseInt(initial_position[0]), 'y': parseInt(initial_position[1]) }, initial_position[2]];
        return initial_position_parsed;
    }
    processRobotInstructions(inputInstructions) {
        let input_instructions = inputInstructions.split('');
        input_instructions.forEach((instruction) => {
            console.log(instruction);
        });
        return input_instructions;
    }
}
const martiansWrapper = $('.martians-wrapper');
new MartianRobotsManager(martiansWrapper);
