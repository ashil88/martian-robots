/// <reference path="jquery.d.ts" />
class MartianRobotsManager {
    constructor(martiansWrapper) {
        this.coordinatesForm = martiansWrapper.find('#bounds');
        this.instructionsForm = martiansWrapper.find('#instructions');
        this.marsBounds = [];
        this.robotInstructions = [];
        this.coordinatesForm.on('submit', (e) => {
            e.preventDefault();
            this.submitCoordinatesForm();
        });
        this.instructionsForm.on('submit', (e) => {
            e.preventDefault();
            this.robotInstructions = this.submitInstructionsForm();
            console.log(this.robotInstructions);
        });
    }
    submitCoordinatesForm() {
        let coordinate_x = parseFloat($('#coord_x').val().toString()), coordinate_y = parseFloat($('#coord_y').val().toString());
        this.marsBounds = [coordinate_x, coordinate_y];
    }
    submitInstructionsForm() {
        let robot_input = this.instructionsForm.find('textarea').val(), robot_input_split = robot_input.split('\n');
        return robot_input_split;
    }
}
const martiansWrapper = $('.martians-wrapper');
new MartianRobotsManager(martiansWrapper);
