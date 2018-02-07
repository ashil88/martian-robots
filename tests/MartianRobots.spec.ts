import MartianRobotsManager from '../js/MartianRobots';
import {expect} from 'chai';
import 'mocha';

describe('Set initial robot position function', () => {
    it("should return [{'x': 1, 'y': 1}, 'E']", () => {
        const result = MartianRobotsManager.setInitialRobotPosition('1 1 E');
        expect(result).to.equal([{'x': 1, 'y': 1}, 'E']);
    });
});

describe('Robot Orientation (turning R)', () => {
    it('should return S', () => {
        const position = MartianRobotsManager.getRobotOrientation('R');
        expect(position[1]).to.equal('S');
    });
});

describe('Robot Orientation (turning L)', () => {
    it('should return N', () => {
        const position = MartianRobotsManager.getRobotOrientation('L');
        expect(position[1]).to.equal('N');
    });
});

describe('Calculate new robot position', () => {
    it("should return {'x': 2, 'y': 1}", () => {
        const position = MartianRobotsManager.getRobotPosition('E');
        expect(position).to.equal({'x': 2, 'y': 1});
    });
});

describe('Check robot scents', () => {
    it("should return true", () => {
        const skip_forward_step = MartianRobotsManager.checkRobotScents({'x': 2, 'y': 1});
        expect(skip_forward_step).to.equal(true);
    });
});