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

let config = {
    "charactersList": charactersList,
    "TS": TS,
    "KEY_API": KEY_API,
    "HASH": HASH,
    "BASE_URL": BASE_URL
};

export default config;