import './welcome.component.scss';
import template from "./welcome.component.html"
import {
    Component
} from '../../utils/component'



export class WelcomeComponent extends Component {
    constructor() {
        super('welcome-component')
    }
    init() {
        const form = document.querySelector('form.form-signin');

        form.addEventListener('submit', (event) => {

            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
                form.classList.add('was-validated');
            } else {
                let name = event.srcElement.querySelector('#nickname').value;
                let size = parseInt(event.srcElement.querySelector('#size').value);

                _startGame(name, size);
            }
        }, false);

        return this;
    }
    getTemplate() {
        return template;
    }

}

function _startGame(name, size) {
    window.location.hash = `game?name=${name}=name&size=${size}`;
}