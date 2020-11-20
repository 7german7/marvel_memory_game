const URL_API = "https://gateway.marvel.com:443/v1/public/characters?name=Spider-Man&apikey=3bb70d706a9730be29cb1c76f9df1c1c";

let http = new XMLHttpRequest();

http.open("GET", URL_API, true);

http.onreadystatechange = () => {
    if (http.readyState === 4) {
        if(http.status === 200) {
            console.log("Datos obtenidos");
            console.log(JSON.parse(http.responseText));
            console.log(JSON.parse(http.responseText.data));
            console.log(JSON.parse(http.responseText.data.results[0]));
        }
        else {
            console.log("Error al obtener los datos");
        }
    }
}

http.send();