/// <reference path="jquery.d.ts" />

class MartianRobotsManager {

    constructor(martiansWrapper: JQuery) {

        console.log(martiansWrapper);
    }

}

const martiansWrapper: JQuery = $('.martians-wrapper');
new MartianRobotsManager(martiansWrapper);