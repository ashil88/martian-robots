/// <reference path="jquery.d.ts" />

class MartianRobotsManager {

    private coordinatesForm: JQuery;
    private instructionsForm: JQuery;
    private marsBounds: Array<number>;
    private orientation: Array<string>;
    private robotInput: Array<string>;
    private robotInstructions: Array<any>;
    private robotPosition: Array<any>;

    constructor(martiansWrapper: JQuery) {

        this.coordinatesForm = martiansWrapper.find('#bounds');
        this.instructionsForm = martiansWrapper.find('#instructions');
        this.marsBounds = [];
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

    private submitCoordinatesForm() {
        let coordinate_x = parseFloat($('#coord_x').val().toString()),
            coordinate_y = parseFloat($('#coord_y').val().toString());

        this.marsBounds = [coordinate_x, coordinate_y];
    }

    private submitInstructionsForm() {
        let robot_input = this.instructionsForm.find('textarea').val(),
            robot_input_split = robot_input.split('\n');

        return robot_input_split;
    }

    private setInitialRobotPosition(inputPosition: string) {
        let initial_position = inputPosition.split(' ');

        initial_position[0] = parseInt(initial_position[0]);
        initial_position[1] = parseInt(initial_position[1]);

        return initial_position;
    }

    private processRobotInstructions(inputInstructions: string) {
        let input_instructions = inputInstructions.split('');

        input_instructions.forEach((instruction) => {
           console.log(instruction);
        });

        return input_instructions;
    }
}

const martiansWrapper: JQuery = $('.martians-wrapper');
new MartianRobotsManager(martiansWrapper);