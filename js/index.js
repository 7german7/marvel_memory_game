const TS = "&ts=1";
const KEY_API = "&apikey=3bb70d706a9730be29cb1c76f9df1c1c";
const HASH = "&hash=c8347048ae8c9d6a58495c461d50b09b";
const BASE_URL = "https://gateway.marvel.com:443/v1/public/characters?name=";

let personName = "Hulk";
/*
1. Spider-Man
2. Thor
3. Hulk
4. Thanos
5. Black Widow
6. Captain America
7. Black Panther
8. Iron Man
9. Hawkeye
10. Loki
*/

let URL_API = `${BASE_URL}${personName}${TS}${KEY_API}${HASH}`;

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

fetchData(URL_API)
    .then(response => {
        console.log(response.data.results[0]);
        let imgUrl = response.data.results[0].thumbnail.path;
        let extension = response.data.results[0].thumbnail.extension;
        console.log(imgUrl+"."+extension);
        console.log(response.data.results[0].description);
    })
    .catch(error =>{
        console.error(error);
    });