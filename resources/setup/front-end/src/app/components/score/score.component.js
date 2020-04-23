import './score.component.scss';
import template from "./score.component.html"
import {
    parseUrl
} from '../../utils/utils';
import {
    Component
} from '../../utils/component'



/* class ScoreComponent constructor */

export class ScoreComponent extends Component {
    constructor() {
        super('score-component')
        const params = parseUrl()
        this.name = params.name;
        this.size = parseInt(params.size);
        this.time = parseInt(params.time);
    }

    init() {
        document.getElementById('name').innerText = this.name;
        document.getElementById('size').innerText = this.size;
        document.getElementById('time').innerText = this.time;
    }
    getTemplate() {
        return template;
    }
}