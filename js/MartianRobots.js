/// <reference path="jquery.d.ts" />
class MartianRobotsManager {
    constructor(martiansWrapper) {
        this.coordinatesForm = martiansWrapper.find('#form');
        this.marsBounds = [];
        this.coordinatesForm.on('submit', (e) => {
            e.preventDefault();
            this.submitCoordinatesForm();
        });
    }
    submitCoordinatesForm() {
        let coordinate_x = parseFloat($('#coord_x').val().toString()), coordinate_y = parseFloat($('#coord_y').val().toString());
        this.marsBounds = [coordinate_x, coordinate_y];
        console.log(this.marsBounds);
    }
}
const martiansWrapper = $('.martians-wrapper');
new MartianRobotsManager(martiansWrapper);
