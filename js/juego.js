/*Configurations*/
const TS = "&ts=1";
const KEY_API = "&apikey=3bb70d706a9730be29cb1c76f9df1c1c";
const HASH = "&hash=c8347048ae8c9d6a58495c461d50b09b";
const BASE_URL = "https://gateway.marvel.com:443/v1/public/characters?name=";
const charactersList = [
    "Hulk",
    "Spider-Man",
    "Thor",
    "Thanos",
    "Black Widow",
    "Captain America",
    "Black Panther",
    "Iron Man",
    "Hawkeye",
    "Loki"
];

let URL_API = `${BASE_URL}${charactersList}${TS}${KEY_API}${HASH}`;

class Game {
    constructor(characters) {
        this.charactersNames = characters;
        this.characters = [];
        this.resultsPromises = [];

        this.getCharactersData();
        Promise.all(this.resultsPromises).then(characters => {
            this.characters = characters;
            this.start();
        });
    }

    start() {
        this.showCharacters();
        this.createCards();
    }

    getCharacters() {
        return this.characters;
    }

    showCharacters() {
        console.log(this.characters);
    }

    createCards() { /*Generador de las cartas HTML*/
        setTimeout(()=>{
            for (let i = 0; i < this.characters.length; i++) {
                let characterName = this.characters[i].name;
                let characterPicture = this.characters[i].thumbnail.path +"."+ this.characters[i].thumbnail.extension;

                /*Contenedor de Imagenes*/
                let container = document.querySelector(".cards__container");

                /*Contenedor de Imagen*/
                let div = document.createElement("div");
                div.classList.add("card-item");

                /*Imagen*/
                let img = document.createElement("img");
                let attr = document.createAttribute("src");
                attr.value = characterPicture;
                img.setAttributeNode(attr);
                attr = document.createAttribute("alt");
                attr.value = characterName;
                img.setAttributeNode(attr);

                /*Ubicaciones*/
                container.appendChild(div);
                div.appendChild(img);
            }
        },1000)
    }

    fetchCharacterData = (character) => {
        let URL_API = `${BASE_URL}${character}${TS}${KEY_API}${HASH}`;
        return new Promise( (resolve, reject)=> {
            let http = new XMLHttpRequest();
            http.open("GET", URL_API, true);
            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if(http.status === 200) {
                        console.log("Datos obtenidos");
                        let response = JSON.parse(http.responseText);
                        resolve(response.data.results[0]);
                    }
                    else {
                        reject(new Error("Error al obtener los datos" + URL_API));
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
}

let game = new Game(charactersList);