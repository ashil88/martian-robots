/// <reference path="jquery.d.ts" />

class MartianRobotsManager {

    private coordinatesForm: JQuery;
    private instructionsForm: JQuery;
    private marsBounds: object;
    private orientation: Array<string>;
    private orientationStep: object;
    private robotInput: Array<string>;
    private robotInstructions: Array<any>;
    private robotPosition: Array<any>;
    private robotScents: Array<object>;

    constructor(martiansWrapper: JQuery) {

        this.coordinatesForm = martiansWrapper.find('#bounds');
        this.instructionsForm = martiansWrapper.find('#instructions');
        this.marsBounds = {'x': 0, 'y': 0};
        this.orientation = ['N', 'E', 'S', 'W'];
        this.orientationStep = {'N' : {'x' : 0, 'y' : 1}, 'E' : {'x' : 1, 'y' : 0}, 'S' : {'x' : 0, 'y' : -1}, 'W' : {'x' : -1, 'y' : 0}};
        this.robotScents = [];

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

    private submitCoordinatesForm() {
        this.marsBounds['x'] = parseFloat($('#coord_x').val().toString());
        this.marsBounds['y'] = parseFloat($('#coord_y').val().toString());

        this.coordinatesForm.find('input').attr('readonly', true);
        this.coordinatesForm.find('button').attr('disabled', true);

        return this.marsBounds;
    }

    private submitInstructionsForm() {
        let robot_input = this.instructionsForm.find('textarea').val(),
            robot_input_split = robot_input.split('\n');

        return robot_input_split;
    }

    private setInitialRobotPosition(inputPosition: string) {
        let initial_position = inputPosition.split(' '),
            initial_position_parsed = [{'x' : parseInt(initial_position[0]), 'y' : parseInt(initial_position[1])}, initial_position[2]];

        return initial_position_parsed;
    }

    private processRobotInstructions(inputInstructions: string) {
        let robot_position,
            input_instructions = inputInstructions.split('');

        input_instructions.forEach((instruction) => {
            if (instruction == 'L' || instruction == 'R') {
                this.getRobotOrientation(instruction);
            } else {
                robot_position = this.getRobotPosition(this.robotPosition[1]);
                this.checkMarsBounds(robot_position);
            }
        });

        console.log(JSON.stringify(this.robotPosition));

        return input_instructions;
    }

    private getRobotOrientation(direction: string) {
        let current_orientation = this.robotPosition[1],
            current_orientation_index = this.orientation.indexOf(current_orientation);

        (direction == 'R') ? current_orientation_index++ : current_orientation_index--;

        if (current_orientation_index == -1) current_orientation_index = 3;
        if (current_orientation_index == 4) current_orientation_index = 0;

        this.robotPosition[1] = this.orientation[current_orientation_index];

        return this.robotPosition;
    }

    private getRobotPosition(orientation: string) {
        let orientation_step_coords = this.orientationStep[orientation],
            new_x = this.robotPosition[0]['x'] + orientation_step_coords['x'],
            new_y = this.robotPosition[0]['y'] + orientation_step_coords['y'];

        let new_coords = {'x' : new_x, 'y': new_y};

        return new_coords;
    }

    private checkMarsBounds(coords: object) {

        // TODO: check coords against robot scents

        if ((coords['x'] > this.marsBounds['x']) || (coords['y'] > this.marsBounds['y'])) {
            this.robotScents.push(coords);
            console.log('OUT OF BOUNDS');
            // TODO: break here. Set orientation to 'LOST'. Don't execute any other instructions
        } else {
            this.robotPosition[0]['x'] = coords['x'];
            this.robotPosition[0]['y'] = coords['y'];
        }
    }
}

const martiansWrapper: JQuery = $('.martians-wrapper');
new MartianRobotsManager(martiansWrapper);