/*
API: Marvel
*/

/*Parametros para conectar con la API*/
const TS = "&ts=1";
const KEY_API = "&apikey=3bb70d706a9730be29cb1c76f9df1c1c";
const HASH = "&hash=c8347048ae8c9d6a58495c461d50b09b";
const BASE_URL = "https://gateway.marvel.com:443/v1/public/characters?name=";

let characters = [
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

let fetchData = (URL_API) => {
    return new Promise( (resolve, reject)=> {
        let http = new XMLHttpRequest();
        http.open("GET", URL_API, true);
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if(http.status === 200) {
                    console.log("Datos obtenidos");
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

characters.forEach(character => {
    let URL_API = `${BASE_URL}${character}${TS}${KEY_API}${HASH}`;
    fetchData(URL_API)
    .then(characterInfo => {
        //console.log(characterInfo.data.results[0]);
        let name = characterInfo.data.results[0].name;
        let imgUrl = characterInfo.data.results[0].thumbnail.path;
        let extension = characterInfo.data.results[0].thumbnail.extension;
        console.log(name);
        console.log(imgUrl+"."+extension);
        console.log(characterInfo.data.results[0].description);
    })
    .catch(error =>{
        console.error(error);
    });
});