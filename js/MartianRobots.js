/// <reference path="jquery.d.ts" />
class MartianRobotsManager {
    constructor(martiansWrapper) {
        console.log(martiansWrapper);
    }
}
const martiansWrapper = $('.martians-wrapper');
new MartianRobotsManager(martiansWrapper);
