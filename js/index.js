/*
API: Marvel
*/

/*Parametros para conectar con la API*/
const TS = "&ts=1";
const KEY_API = "&apikey=3bb70d706a9730be29cb1c76f9df1c1c";
const HASH = "&hash=c8347048ae8c9d6a58495c461d50b09b";
const BASE_URL = "https://gateway.marvel.com:443/v1/public/characters?name=";

let characters = [];
let charactersList = [
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

/*Funcion para obtener los datos de los Personajes*/
let fetchData = (URL_API) => {
    return new Promise( (resolve, reject)=> {
        let http = new XMLHttpRequest();
        http.open("GET", URL_API, true);
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if(http.status === 200) {
                    //console.log("Datos obtenidos");
                    resolve(JSON.parse(http.responseText));
                }
                else {
                    reject(new Error("Error al obtener los datos" + URL_API));
                }
            }
        }
        http.send();
    });
}

/*Funcion para mostrar los datos de los personajes*/
function showCharacters(characters) {
    characters.forEach(character => {
        let div = document.createElement("div");
        div.innerHTML = character.name;
        document.body.appendChild(div);
    });
}




/*Cuerpo Principal de mi APP*/
charactersList.forEach(character => {
    let URL_API = `${BASE_URL}${character}${TS}${KEY_API}${HASH}`;
    fetchData(URL_API)
    .then(characterInfo => {
        return characterInfo.data.results[0];
    })
    .then(characterInfo =>{
        let name = characterInfo.name;
        let imgUrl = characterInfo.thumbnail.path + characterInfo.thumbnail.extension;
        characters.push({
            "name": name,
            "imgUrl": imgUrl
        });
        if(character.length===10){
            console.log(characters);
            showCharacters(characters);
        };
    })
    .catch(error =>{
        console.error(error);
    });
});