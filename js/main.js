
const PUBLIC_KEY = "ad8faca1b15ee2366a0dca2f78fe20e7";
const PRIVATE_KEY = "9f6d2b0b618eb3f5582e81146425622639021fc9";
const TS = Date.now();
const HASH = MD5(TS + PRIVATE_KEY + PUBLIC_KEY);


let keybinding = true;
let OFFSET = 0;
let NAME_STARTS_WITH = null;


const fetchHeros = () => {
  const url = `http://gateway.marvel.com/v1/public/characters?apikey=${PUBLIC_KEY}&hash=${HASH}&ts=${TS}&offset=${OFFSET}${
    NAME_STARTS_WITH ? `&nameStartsWith=${NAME_STARTS_WITH}` : ""
  }`;

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(response => {
      const { data } = response;

      const container = document.querySelector(".results");
      container.innerHTML = "";

      data.results.forEach(element => {
        const box = document.createElement("div");
        box.classList.add("results__item");

        const image = document.createElement("img");
        image.classList.add("results__item-image");
        image.src = element.thumbnail.path + "." + element.thumbnail.extension;
        image.alt = element.name;

        const description = document.createElement("h3");
        description.classList.add("results__item-description");
        description.innerHTML = element.description;
        
        if(description.innerHTML == ""){
          description.innerHTML = element.name;
        }
        

        
        box.appendChild(image);
        box.appendChild(description);
        container.appendChild(box);
      });

      const showImage = document.querySelectorAll("img");
      const showDescription = document.querySelectorAll("h3");

      for(let i = 0; i < showImage.length; i++){
        showImage[i].addEventListener("click", e =>{
          showDescription[i].style.display = "block";
        });  
      }

      prevButton.disabled = data.offset === 0;
      nextButton.disabled = data.offset + 20 > data.total;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    })
    .catch(e => {
      console.log(e);
    });
};

const fetchComics = () => {
  const url = `https://gateway.marvel.com:443/v1/public/comics?apikey=${PUBLIC_KEY}&hash=${HASH}&ts=${TS}&offset=${OFFSET}${
    NAME_STARTS_WITH ? `&titleStartsWith=${NAME_STARTS_WITH}` : ""
  }`;

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(response => {
      const { data } = response;

      const container = document.querySelector(".results");
      container.innerHTML = "";

      data.results.forEach(element => {
        const box = document.createElement("div");
        box.classList.add("results__item");

        const image = document.createElement("img");
        image.classList.add("results__item-image");
        image.src = element.thumbnail.path + "." + element.thumbnail.extension;
        image.alt = element.title;

        const description = document.createElement("h3");
        description.classList.add("results__item-description");
        description.innerHTML = element.title;
        
        if(description.innerHTML == ""){
          description.innerHTML = element.title;
        }
        

        
        box.appendChild(image);
        box.appendChild(description);
        container.appendChild(box);
      });

      const showImage = document.querySelectorAll("img");
      const showDescription = document.querySelectorAll("h3");

      for(let i = 0; i < showImage.length; i++){
        showImage[i].addEventListener("click", e =>{
          showDescription[i].style.display = "block";
        });  
      }

      prevButton.disabled = data.offset === 0;
      nextButton.disabled = data.offset + 20 > data.total;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    })
    .catch(e => {
      console.log(e);
    });
};

const prevButton = document.querySelector(".pagination__button-prev");
const nextButton = document.querySelector(".pagination__button-next");
const herossButton = document.querySelector(".heros__button");
const comicsButton = document.querySelector(".comics__button");
const searchForm = document.getElementById("searchForm");

document.addEventListener("DOMContentLoaded", function(event) {
  if(keybinding){
    fetchHeros();
  }
  else{
  fetchComics();
  }
  
  herossButton.addEventListener("click", e => {
    keybinding = true;
    OFFSET = 0;
    fetchHeros();
  });

  comicsButton.addEventListener("click", e => {
    keybinding = false;
    OFFSET = 0;
    fetchComics();
  });
  
  prevButton.addEventListener("click", e => {
    OFFSET = OFFSET - 20;
    if(keybinding){
      fetchHeros();
    }
    else{
    fetchComics();
    }
  });

  nextButton.addEventListener("click", e => {
    OFFSET = OFFSET + 20;
    if(keybinding){
      fetchHeros();
    }
    else{
    fetchComics();
    }
  });

  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const heroName = document.getElementById("heroName").value;
    OFFSET = 0;
    NAME_STARTS_WITH = heroName;
    if(keybinding){
      fetchHeros();
    }
    else{
    fetchComics();
    }
  });

  
});
