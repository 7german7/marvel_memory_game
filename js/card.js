class Card {
  constructor(cardsContainer){
    this.cardsContainer = cardsContainer;
  }

  setProperties(name, characterPicture){
    this.characterName = name;
    this.characterPicture = characterPicture;
  }

  loadElements() {
    this.cardScene = document.createElement("div");
    this.cardScene.classList.add("scene");
    this.card = document.createElement("div");
    this.card.addEventListener("click", ()=>{
      this.card.classList.toggle('is-flipped');
    });
    this.card.classList.add("card");
    this.cardFaceFront = document.createElement("div");
    this.cardFaceFront.classList.add("card__face", "card__face--front");
    this.cardFaceBack = document.createElement("div");
    this.cardFaceBack.classList.add("card__face", "card__face--back");

    this.image = document.createElement("img");
    let attr = document.createAttribute("src");
    attr.value = this.characterPicture;
    this.image.setAttributeNode(attr);
    attr = document.createAttribute("alt");
    attr.value = this.characterName;
    this.image.setAttributeNode(attr);
  }

  render(){
    this.cardsContainer.appendChild(this.cardScene);
    this.cardScene.appendChild(this.card);
    this.card.appendChild(this.cardFaceFront);
    this.cardFaceFront.appendChild(this.image);
    this.card.appendChild(this.cardFaceBack);
  }
}

export default Card;