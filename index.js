"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "api_key=0decbb49ed9b3d0c6017d7721a14c106";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY + "&query=";
const moviescontainer = document.querySelector(".moviescontainer");
const input = document.querySelector(".input");
const Button = document.querySelector(".searchButton");
getMovie(API_URL);
function displayMovies(result) {
    result.forEach((movie) => {
        const { title, poster_path } = movie;
        let moviediv = document.createElement("div");
        moviediv.classList.add("movie");
        moviediv.innerHTML = `
        <h3  class="movietitle" >${title}</h3>
    <button class="readmore" > Read More </button>
    `;
        moviediv.style.backgroundImage = `
        url(${movie.poster_path
            ? IMG_URL + poster_path
            : "http://via.placeholder.com/1080x1580"})
          `;
        moviediv.style.backgroundSize = "cover";
        moviescontainer.appendChild(moviediv);
    });
}
function getMovie(url) {
    return __awaiter(this, void 0, void 0, function* () {
        moviescontainer.innerHTML = "";
        const res = yield fetch(url);
        const data = yield res.json();
        const result = data.results;
        if (result.length === 0) {
            const noResultDiv = document.createElement("div");
            noResultDiv.classList.add("noResultDiv");
            noResultDiv.innerHTML = `
        <h2>Sorry,there is no result for keyword you searched</h2>
        <img src="errorImage.svg" alt="background">
        `;
            moviescontainer.appendChild(noResultDiv);
        }
        else {
            displayMovies(result);
        }
    });
}
Button.addEventListener("click", (e) => {
    e.preventDefault();
    let searchValue = input.value;
    if (searchValue) {
        getMovie(searchURL + searchValue);
    }
    else {
        getMovie(API_URL);
    }
});
