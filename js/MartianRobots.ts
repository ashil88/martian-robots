/// <reference path="jquery.d.ts" />

class MartianRobotsManager {

    private coordinatesForm: JQuery;
    private marsBounds: Array<number>;

    constructor(martiansWrapper: JQuery) {

        this.coordinatesForm = martiansWrapper.find('#form');
        this.marsBounds = [];

        this.coordinatesForm.on('submit', (e) => {
            e.preventDefault();
            this.submitCoordinatesForm();
        });
    }

    private submitCoordinatesForm() {
        let coordinate_x = parseFloat($('#coord_x').val().toString()),
            coordinate_y = parseFloat($('#coord_y').val().toString());

        this.marsBounds = [coordinate_x, coordinate_y];

        console.log(this.marsBounds);
    }

}

const martiansWrapper: JQuery = $('.martians-wrapper');
new MartianRobotsManager(martiansWrapper);