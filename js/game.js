import config from "./config.js";
import Card from "./card.js";

const movementElement = document.querySelector(".info-mov > .info-data");
const timeElement = document.querySelector(".info-time > .info-data");
const preloaderElement = document.querySelector(".preloader__container");
const moveElement = document.querySelector(".info-mov");
const timerElement = document.querySelector(".info-time");
const audioElement = document.querySelector(".audio__container");

class Game {
    constructor(characters) {
        this.urlAPI = [];
        this.charactersNames = characters;
        this.characters = [];
        this.resultsPromises = [];
        this.cards = Array(20);
        this.cardsFlipped = 0;
        this.movements = 0;
        this.isFirstCardFlipped = true;
        this.timeId = 0;
        this.time = 0;

        this.hideTimer();
        this.hideMove();
        this.hideAudio();
    }

    init() {
        this.getCharactersData();
        Promise.all(this.resultsPromises)
        .then(characters => {
            this.characters = characters;
        })
        .then(()=>{
            this.hidePreloader();
            this.showTimer();
            this.showMove();
            this.showAudio();
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
            this.resultsPromises.push(this.fetchCharacterData(character));
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

    startClock(){
        this.timeId = setInterval(() => {
            this.time++;
            this.showTime();
        },1000);
    }

    stopClock(){
        clearInterval(this.timeId);
    }

    showTime() {
        timeElement.innerHTML = "Time "+this.time;
    }

    addMovement(){
        this.movements++;
    }

    showMovements() {
        movementElement.innerHTML = "Mov "+this.movements;
    }

    resetMovements(){
        this.movements = 0; 
    }

    showAudio(){
        audioElement.style.display = "flex";
    }

    showMove(){
        moveElement.style.display = "flex";
    }

    showTimer(){
        timerElement.style.display = "flex";
    }

    hideAudio(){
        audioElement.style.display = "none";
    }

    hideMove(){
        moveElement.style.display = "none";
    }

    hideTimer(){
        timerElement.style.display = "none";
    }

    victory(){
        alert("Haz Ganado");
        this.resetMovements();
        this.showMovements();
        this.stopClock();
    }

    hidePreloader(){
        preloaderElement.style.display = "none";
    }

    eventClickGenerator(newCard) {
        newCard.card.addEventListener("click", (e)=>{
            if(this.isFirstCardFlipped) {
                this.isFirstCardFlipped = false;
                this.startClock();
            }

            newCard.card.classList.add("is-flipped");
            let cardsSelected = document.querySelectorAll(".is-flipped");
            console.log(cardsSelected);

            if(cardsSelected.length <= 2){
                if(cardsSelected.length === 2) {
                    this.addMovement();
                    this.showMovements();
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
                                this.victory();
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