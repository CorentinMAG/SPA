import {
    parseUrl
} from '../../utils/utils';
// TODO Step 6 import "./game.component.html"

(function() { // TODO Step 6 remove this closure
    var environment = {
        api: {
            host: 'http://localhost:8081'
        }
    };

    const params = parseUrl()

    /* class GameComponent constructor */
    class GameComponent {
        // gather parameters from URL

        constructor() {
            // save player name & game ize
            this._name = params.name;
            this._size = parseInt(params.size) || 9;
            this._flippedCard = null;
            this._matchedPairs = 0;

        }
        async init() {
            this._config = await this.fetchConfig()

            // create a card out of the config
            this._cards = this._config.ids.map((id) => new CardComponent(id))

            this._boardElement = document.querySelector('.cards');

            this._cards.forEach((card) => {
                this._boardElement.appendChild(card.getElement());
                card.getElement().addEventListener('click', function() {
                    this._flipCard(card)
                }.bind(this));
            })

            this._cards.forEach((card) => {
                this._boardElement.appendChild(card.getElement());
                card.getElement().addEventListener('click', function() {
                    this._flipCard(card)
                }.bind(this))
            })

            this.start();

        }
        start() {
            this._startTime = Date.now();
            var seconds = 0;
            document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}  Elapsed time:  ${seconds++}`;

            this._timer = setInterval(() =>

                document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}   Elapsed time:  ${seconds++}`, 1000);
        }
        gotoScore() {
            var timeElapsedInSeconds = Math.floor((Date.now() - this._startTime) / 1000);
            clearInterval(this._timer);

            setTimeout(() =>
                // TODO Step 6: change path to: `score?name=${this._name}&size=${this._size}'&time=${timeElapsedInSeconds}`;
                window.location = `../score/score.component.html?name=${this._name}&size=${this._size}&time=${timeElapsedInSeconds}`, 750); // TODO Step 3.2: Why bind(this)?
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
    }
    // put component in global scope, tu be runnable right from the HTML.
    // TODO Step 6: export GameComponent
    window.GameComponent = GameComponent;
})();