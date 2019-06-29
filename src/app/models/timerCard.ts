import { Timer } from './timer';

export class TimerCard {

    constructor(
        public id: number,
        public name: string,
        public type: string,
        public timer: Timer,
        public process: NodeJS.Timeout
    ) { }

}