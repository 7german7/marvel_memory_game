import config from "./config.js";
import Card from "./card.js";

class Game {
    constructor(characters) {
        this.urlAPI = [];
        this.charactersNames = characters;
        this.characters = [];
        this.resultsPromises = [];
        this.cards = Array(20);
        this.cardsFlipped = 0;
    }

    init() {
        this.getCharactersData();
        Promise.all(this.resultsPromises).then(characters => {
            this.characters = characters;
            this.start();
        });
    }

    start() {
        this.showCharacters();
        this.cardsGenerator();
    }

    getCharacters() {
        return this.characters;
    }

    showCharacters() {
        console.log(this.characters);
    }

    cardsGenerator() { /*Generador de las cartas HTML*/
        setTimeout(()=>{
            let randomCharacters = this.randomCharacters();
            let cardsContainer = document.querySelector(".cards__container");
            randomCharacters.forEach(character => {
                let characterPicture = character.thumbnail.path +"."+ character.thumbnail.extension;

                /*Propiedades*/
                let newCard = new Card(cardsContainer);
                newCard.setProperties(
                    character.name,
                    characterPicture //character.image
                );
                
                newCard.loadElements();
                newCard.render();
                this.eventClickGenerator(newCard);
                this.cards.push(newCard);
            });
        }, 1000)
    }

    randomCharacters(){
        let charactersDuplicated = this.duplicateCharacters();
        let charactersShuffled = this.shuffleCharacters(charactersDuplicated);
        
        console.table(charactersShuffled);
        return charactersShuffled;
    }

    duplicateCharacters() {
        let copyCharacters = [...this.characters];
        let charactersDuplicated = this.characters.concat(copyCharacters);
        return charactersDuplicated;
    }

    shuffleCharacters(charactersDuplicated) {
       return charactersDuplicated.sort(function() { return Math.random() - 0.5 });
    }

    fetchCharacterData = (character) => {
        this.urlApiGenerator(config, "getCharacters", character);
        return new Promise( (resolve, reject)=> {
            let http = new XMLHttpRequest();
            http.open("GET", this.urlAPI, true);
            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if(http.status === 200) {
                        console.log("Datos obtenidos");
                        let response = JSON.parse(http.responseText);
                        resolve(response.data.results[0]);
                    }
                    else {
                        reject(new Error("Error al obtener los datos" + this.urlAPI));
                    }
                }
            }
            http.send();
        });
    }

    getCharactersData = async () => {
        await this.charactersNames.forEach(character => {
            this.character = this.fetchCharacterData(character);
            this.resultsPromises.push(this.character);
        });
    }

    urlApiGenerator(config, status, character){
        switch (status) {
            case "getCharacters":
                this.urlAPI = `${config.BASE_URL}${character}${config.TS}${config.KEY_API}${config.HASH}`;
                break;
        
            case "newGame":
                this.urlAPI = `${config.BASE_URL}${config.charactersList}${config.TS}${config.KEY_API}${config.HASH}`;
                break;
        }
    }

    eventClickGenerator(newCard) {
        newCard.card.addEventListener("click", (e)=>{
            newCard.card.classList.add("is-flipped");
            let cardsSelected = document.querySelectorAll(".is-flipped");
            console.log(cardsSelected);

            if(cardsSelected.length <= 2){
                if(cardsSelected.length === 2) {
                    if(cardsSelected[0].dataset.set!==cardsSelected[1].dataset.set) {
                        setTimeout( ()=>{
                            cardsSelected.forEach(cardSelected => {
                                cardSelected.classList.remove("is-flipped");
                            });
                        },1100);
                    }
                    else {
                        console.log("Son iguales");
                        this.cardsFlipped++;
                        setTimeout(()=>{
                            cardsSelected.forEach(cardSelected => {
                                cardSelected.classList.remove("is-flipped");
                                cardSelected.classList.add("is-flipped--bloqued");
                                console.log(cardSelected);
                            });
                            if(this.cardsFlipped===10) {
                                alert("Haz Ganado");
                            }
                        }, 1000);
                    }
                }
            }
            else{
                cardsSelected.forEach(cardSelected => {
                    cardSelected.classList.remove("is-flipped");
                });
            }
        });
    }
}

let game = new Game(config.charactersList);
game.urlApiGenerator(config, "newGame", "");
game.init();