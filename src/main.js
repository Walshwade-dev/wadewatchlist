import "./style.css";

import { searchMovies, formatTmdbMovie } from "./api/tmdb.js";







// =========================
// DOM ELEMENTS
// =========================

// Search
const searchForm = document.getElementById("search-form");
const searchInputEl = document.getElementById("search-input");

// Buttons
const watchListBtn = document.getElementById("watchlist-btn");

// Sections
const searchSection = document.getElementById("search-section");
const resultsSection = document.getElementById("results-section");
const watchlistSection = document.getElementById("watchlist-section");

const emptyResults = document.querySelector("#results-section #empty-results");
const emptyWatchlistLink = document.getElementById("empty-watchlist-link");

// Results grid
const resultsGridWrapper = document.getElementById("results-grid-wrapper");
const resultsGrid = document.getElementById("results-grid");

// Watchlist button UI
const watchlistText = document.querySelector(".watchlist-text");
const watchSvg = document.getElementById("watch-svg");


// =========================
// MOBILE VH FIX (for bottom gaps)
// =========================
function fixMobileVH() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`);
}
window.addEventListener("load", fixMobileVH);
window.addEventListener("resize", fixMobileVH);


// =========================
// PAGE ROUTING
// =========================
function setPage(pageId) {
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.remove("page--active");
  });

  const target = document.getElementById(pageId);
  if (target) target.classList.add("page--active");
}


// =========================
// SIMPLE HELPERS
// =========================
const show = (el) => (el.style.display = "block");
const hide = (el) => (el.style.display = "none");


// =========================
// MOVIE CARD BUILDER
// =========================


function createMovieCard(movie) {
  const {
    Poster = "",
    Title = "",
    imdbRating = "N/A",
    Runtime = "Unknown",
    Genre = "",
    Plot = "",
  } = movie;

  const safePlot = Plot.split(" ").slice(0, 30).join(" ") + "...";

  const card = document.createElement("div");

  card.className =
    "movie-card bg-slate-800 rounded-2xl overflow-hidden h-[380px] p-2 flex flex-col shadow-md";

  card.innerHTML = `
    <div class="relative h-[99%] rounded-xl bg-cover bg-center flex flex-col justify-end"
         style="background-image: url('${Poster}')">

      <div class="absolute inset-0 bg-gradient-to-t from-slate-100/90 dark:from-slate-900/90 via-slate-100/40 dark:via-slate-900/60 to-transparent rounded-xl"></div>

      <div class="relative z-10 p-3 text-white flex flex-col gap-2">

        <div class="flex items-center justify-between">
          <span class="text-xs bg-yellow-500 text-black px-2 py-[2px] rounded-md font-medium">
            ⭐ ${imdbRating}
          </span>
        </div>

        <p class="text-xs text-slate-300 line-clamp-2">${safePlot}</p>

        <div class="flex items-center justify-between mt-1">
          <div class="flex gap-2 text-[10px] text-slate-300">
            <span>${Runtime}</span>
            <span>${Genre.split(",")[0] || "N/A"}</span>
          </div>

          <button class="add-btn w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" fill="" />
              <path d="M12 6v12M6 12h12" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>

      </div>
      <h3 class="absolute top-3 left-3 font-semibold text-sm line-clamp-1 dark:text-slate-50 drop-shadow-lg shadow-white">${Title}</h3>
    </div>
  `;

  return card;
}


// =========================
// RENDER & EMPTY STATE
// =========================
function renderMovieCards(movies) {
  hide(emptyResults);
  show(resultsGridWrapper);
  resultsGrid.innerHTML = "";

  movies.forEach((movie) => {
    resultsGrid.appendChild(createMovieCard(movie));
  });
}

function showEmptyState() {
  show(emptyResults);
  hide(resultsGridWrapper);
}


// =========================
// SEARCH FORM
// =========================
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = searchInputEl.value.trim();

  if (!query) {
    showEmptyState();
    return;
  }

  const res = await searchMovies(query);

  if (!res || !res.results || res.results.length === 0) {
    showEmptyState();
    return;
  }

  const formattedMovies = res.results.map(formatTmdbMovie);

  renderMovieCards(formattedMovies);
});



// =========================
// WATCHLIST TOGGLING
// =========================
let watchlistOpen = false;

watchListBtn.addEventListener("click", () => {
  watchlistOpen = !watchlistOpen;

  if (watchlistOpen) {
    setPage("watchlist-section");
    hide(resultsSection);
    watchlistText.textContent = "Search Movies";
    watchSvg.style.display = "none";
    return;
  }

  setPage("search-section");
  show(resultsSection);
  watchlistText.textContent = "Watchlist";
  watchSvg.style.display = "inline";
});


// =========================
// EMPTY WATCHLIST → GO BACK TO SEARCH
// =========================
emptyWatchlistLink.addEventListener("click", () => {
  watchlistOpen = false;
  setPage("search-section");
  show(resultsSection);

  watchlistText.textContent = "Watchlist";
  watchSvg.style.display = "inline";
});
