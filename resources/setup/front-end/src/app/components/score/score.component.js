import './score.component.scss';
import template from "./score.component.html"
import {
    parseUrl,
    environment
} from '../../utils/utils';
import {
    Component
} from '../../utils/component'
import localforage from "localforage";



/* class ScoreComponent constructor */

export class ScoreComponent extends Component {
    constructor() {
        super('score-component');
        const params = parseUrl();
        this.name = params.name;
        this.size = parseInt(params.size);
        this.time = parseInt(params.time);
    }

    async init() {
        document.getElementById('name').innerText = this.name;
        document.getElementById('size').innerText = this.size;
        document.getElementById('time').innerText = this.time;

        //on POST nos scores des que le component est chargé
        await this.postResult(this.name, this.size, this.time)

        //ensuite on récupère les scores existants
        this.getData();


    }
    async postResult(name, size, time) {
        await fetch('http://localhost:8081/scores', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                time,
                size
            })
        });

    }
    async getData() {
        const dataComponent = document.querySelector('.get_data');
        const scores = await fetch(`${environment.api.host}/scores`, {
            method: 'GET'
        });
        if (scores.ok) {
            const data = await scores.json();
            for (const score of data) {
                this.construction(score, dataComponent)
            }
        }

    }
    construction(score, parent) {
        let div_score = document.createElement('div');
        div_score.classList = "score"
        for (const [key, value] of Object.entries(score)) {
            let span_score = document.createElement('span');
            span_score.textContent = `  ${key} : ${value}  `;
            div_score.appendChild(span_score)
        }
        parent.appendChild(div_score)


    }
    getTemplate() {
        return template;
    }
}