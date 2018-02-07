/// <reference path="jquery.d.ts" />
class MartianRobotsManager {
    constructor(martiansWrapper) {
        this.coordinatesForm = martiansWrapper.find('#bounds');
        this.instructionsForm = martiansWrapper.find('#instructions');
        this.instructionsWrapper = martiansWrapper.find('.instructions-wrapper');
        this.instructionsOutput = this.instructionsWrapper.find('ul');
        this.marsBounds = { 'x': 0, 'y': 0 };
        this.orientation = ['N', 'E', 'S', 'W'];
        this.orientationStep = { 'N': { 'x': 0, 'y': 1 }, 'E': { 'x': 1, 'y': 0 }, 'S': { 'x': 0, 'y': -1 }, 'W': { 'x': -1, 'y': 0 } };
        this.robotPosition = [];
        this.robotScents = [];
        this.coordinatesForm.on('submit', (e) => {
            e.preventDefault();
            this.submitCoordinatesForm();
            this.instructionsWrapper.fadeIn('slow');
        });
        this.instructionsForm.on('submit', (e) => {
            e.preventDefault();
            this.robotInput = this.submitInstructionsForm();
            this.robotPosition.length = 0;
            this.robotPosition = MartianRobotsManager.setInitialRobotPosition(this.robotInput[0]);
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
        let robot_input = this.instructionsForm.find('textarea').val();
        return robot_input.split('\n');
    }
    static setInitialRobotPosition(inputPosition) {
        let initial_position = inputPosition.split(' '), initial_position_parsed = [{ 'x': parseInt(initial_position[0]), 'y': parseInt(initial_position[1]) }, initial_position[2]];
        return initial_position_parsed;
    }
    processRobotInstructions(inputInstructions) {
        let skip_instruction = false, over_the_edge = false, robot_position, input_instructions = inputInstructions.split('');
        for (let instruction of input_instructions) {
            if (instruction == 'L' || instruction == 'R') {
                this.getRobotOrientation(instruction);
            }
            else {
                robot_position = this.getRobotPosition(this.robotPosition[1]);
                if (this.robotScents.length > 0)
                    skip_instruction = this.checkRobotScents(robot_position);
                if (!skip_instruction)
                    over_the_edge = this.checkMarsBounds(robot_position);
                if (over_the_edge)
                    break;
            }
        }
        this.outputRobotPosition(this.robotPosition);
        return this.robotPosition;
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
        return { 'x': new_x, 'y': new_y };
    }
    checkRobotScents(coords) {
        let skip_forward_step = false;
        for (let scent of this.robotScents) {
            if (scent['x'] == coords['x'] && scent['y'] == coords['y']) {
                skip_forward_step = true;
                break;
            }
        }
        return skip_forward_step;
    }
    checkMarsBounds(coords) {
        let out_of_bounds = false;
        if ((coords['x'] > this.marsBounds['x']) || (coords['y'] > this.marsBounds['y'])) {
            this.robotScents.push(coords);
            this.robotPosition.push('LOST');
            out_of_bounds = true;
        }
        else {
            this.robotPosition[0]['x'] = coords['x'];
            this.robotPosition[0]['y'] = coords['y'];
        }
        return out_of_bounds;
    }
    outputRobotPosition(finalPosition) {
        let output = `<li class="list-group-item">`;
        finalPosition.forEach((position, i) => {
            if (i == 0) {
                output += `${position['x']} ${position['y']}`;
            }
            else {
                output += ` ${position}`;
            }
        });
        output += `</li>`;
        this.instructionsOutput.append(output);
        return output;
    }
}
const martiansWrapper = $('.martians-wrapper');
new MartianRobotsManager(martiansWrapper);
