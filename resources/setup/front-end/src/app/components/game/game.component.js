import template from "./game.component.html"
import {
    Component
} from '../../utils/component'
import {
    parseUrl,
    environment
} from '../../utils/utils';
import {
    CardComponent
} from './card/card.component'

import localforage from 'localforage'

/* class GameComponent constructor */
export class GameComponent extends Component {
    // gather parameters from URL

    constructor() {
        super('game-component');
        const params = parseUrl();
        // save player name & game ize
        this._name = params.name;
        this._size = parseInt(params.size) || 9;
        this._flippedCard = null;
        this._matchedPairs = 0;
        this._currentConfig = null;
    }
    async init() {
        //est ce qu'il existe une configuration ?
        this._currentConfig = await localforage.getItem('configuration');

        //si oui on la récupère sinon on en crée une
        this._currentConfig == null ? this._config = await this.fetchConfig() : this._config = this._currentConfig.config_carte;

        this._cards = this._config.ids.map((id) => new CardComponent(id));

        this._boardElement = document.querySelector('.cards');

        this._cards.forEach((card) => {
            this._boardElement.appendChild(card.getElement());
            card.getElement().addEventListener('click', () => {
                this._flipCard(card)
            });
        });

        document.querySelector('.navbar-title').style.display = 'inline'

        this._cards.forEach((card) => {
            this._boardElement.appendChild(card.getElement());
            card.getElement().addEventListener('click', () => {
                this._flipCard(card)
            })
        });

        this.start();

    }
    start() {
        let seconds;

        //si il existe déjà un temps enregistré on le récupère
        this._currentConfig == null ? this._startTime = Date.now() : this._startTime = this._currentConfig.start_time;
        this._currentConfig == null ? seconds = 0 : seconds = this._currentConfig.current_time;

        document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}  Elapsed time:  ${seconds++}`;

        this._timer = setInterval(() =>

            document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}   Elapsed time:  ${seconds++}`, 1000);

        window.onbeforeunload = async() => {

            //si on recharge la page actuelle 
            //on update la configuration 
            if (location.href.includes('game')) {
                const my_config = {
                    config_carte: this._config,
                    start_time: this._startTime,
                    current_time: seconds
                };
                await localforage.setItem('configuration', my_config);
            }
        }
        window.onhashchange = (e) => {
            clearInterval(this._timer) //on arrete le timer
                //on fait disparaitre le temps si on retourne à l'accueil
            e.newURL == 'http://localhost:8080/#' ? document.querySelector('.navbar-title').style.display = 'none' : ''
        }

    }
    gotoScore() {
        const timeElapsedInSeconds = Math.floor((Date.now() - this._startTime) / 1000);
        clearInterval(this._timer); //on arrete le timer quand on a réussi le jeu


        setTimeout(async() => {
                window.location.hash = `score?name=${this._name}&size=${this._size}'&time=${timeElapsedInSeconds}`;
                await localforage.removeItem('configuration');
            },
            750);
    }

    async fetchConfig() {
        return fetch(`${environment.api.host}/board?size=${this._size}`, {
                method: "GET"
            })
            .then(response => response.json())
            .catch(error => console.log("Fetch config error", error));
    }

    _flipCard(card) {
        if (this._busy) {
            return;
        }

        if (card.flipped) {
            return;
        }


        // flip the card
        card.flip();

        // if flipped first card of the pair
        if (!this._flippedCard) {
            // keep this card flipped, and wait for the second card of the pair
            this._flippedCard = card;
        } else {
            // second card of the pair flipped...

            // if cards are the same
            if (card.equals(this._flippedCard)) {
                this._flippedCard.matched = true;
                card.matched = true;
                this._matchedPairs += 1;

                // reset flipped card for the next turn.
                this._flippedCard = null;

                if (this._matchedPairs === this._size) {
                    this.gotoScore();
                }
            } else {
                this._busy = true;

                // cards did not match
                // wait a short amount of time before hiding both cards

                setTimeout(() => {
                    // hide the cards
                    this._flippedCard.flip();
                    card.flip();
                    this._busy = false;

                    // reset flipped card for the next turn.
                    this._flippedCard = null;
                }, 500);
            }
        }
    }
    getTemplate() {
        return template;
    }
}