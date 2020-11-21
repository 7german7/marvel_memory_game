const TS = "1";
const KEY_API = "3bb70d706a9730be29cb1c76f9df1c1c";
const HASH = "c8347048ae8c9d6a58495c461d50b09b";
let personName = "Loki";

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

let URL_API = `https://gateway.marvel.com:443/v1/public/characters?name=${personName}&ts=${TS}&apikey=${KEY_API}&hash=${HASH}`;

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


/*Obtener la imagen de una personaje*/

// URL =
// let response = JSON.parse(http.responseText);
// let imgUrl = response.data.results[0].thumbnail.path;
// let extension = response.data.results[0].thumbnail.extension;
// console.log(imgUrl+"."+extension);

/*Obtener el ID del comic avengers */

// url = https://gateway.marvel.com:443/v1/public/comics?title=avengers&apikey=3bb70d706a9730be29cb1c76f9df1c1c
