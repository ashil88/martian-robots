/// <reference path="jquery.d.ts" />
class MartianRobotsManager {
    constructor(martiansWrapper) {
        this.coordinatesForm = martiansWrapper.find('#bounds');
        this.instructionsForm = martiansWrapper.find('#instructions');
        this.marsBounds = { 'x': 0, 'y': 0 };
        this.orientation = ['N', 'E', 'S', 'W'];
        this.orientationStep = { 'N': { 'x': 0, 'y': 1 }, 'E': { 'x': 1, 'y': 0 }, 'S': { 'x': 0, 'y': -1 }, 'W': { 'x': -1, 'y': 0 } };
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
        this.marsBounds['x'] = parseFloat($('#coord_x').val().toString());
        this.marsBounds['y'] = parseFloat($('#coord_y').val().toString());
        this.coordinatesForm.find('input').attr('readonly', true);
        this.coordinatesForm.find('button').attr('disabled', true);
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
        let robot_position, input_instructions = inputInstructions.split('');
        input_instructions.forEach((instruction) => {
            if (instruction == 'L' || instruction == 'R') {
                this.getRobotOrientation(instruction);
            }
            else {
                robot_position = this.getRobotPosition(this.robotPosition[1]);
                this.checkMarsBounds(robot_position);
            }
        });
        console.log(JSON.stringify(this.robotPosition));
        return input_instructions;
    }
    getRobotOrientation(direction) {
        let current_orientation = this.robotPosition[1], current_orientation_index = this.orientation.indexOf(current_orientation);
        (direction == 'R') ? current_orientation_index++ : current_orientation_index--;
        if (current_orientation_index == -1)
            current_orientation_index = 3;
        if (current_orientation_index == 4)
            current_orientation_index = 0;
        this.robotPosition[1] = this.orientation[current_orientation_index];
        return this.robotPosition;
    }
    getRobotPosition(orientation) {
        let orientation_step_coords = this.orientationStep[orientation], new_x = this.robotPosition[0]['x'] + orientation_step_coords['x'], new_y = this.robotPosition[0]['y'] + orientation_step_coords['y'];
        let new_coords = { 'x': new_x, 'y': new_y };
        return new_coords;
    }
    checkMarsBounds(coords) {
        this.robotPosition[0]['x'] = coords['x'];
        this.robotPosition[0]['y'] = coords['y'];
    }
}
const martiansWrapper = $('.martians-wrapper');
new MartianRobotsManager(martiansWrapper);
