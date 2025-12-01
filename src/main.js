import "./style.css";

// =========================
// DOM ELEMENTS
// =========================
const searchForm = document.getElementById("search-form");
const searchInputEl = document.getElementById("search-input");
const watchListBtn = document.getElementById("watchlist-btn");

const emptyResults = document.getElementById("empty-results");
const emptyWatchlistEl = document.querySelector(".empty-watchlist");

const resultsGridWrapper = document.getElementById("results-grid-wrapper");
const resultsGrid = document.getElementById("results-grid");

const searchSection = document.getElementById("search-section");
const resultsSection = document.getElementById("results-section");
const watchlistSection = document.getElementById("watchlist-section");

const watchlistText = document.querySelector(".watchlist-text");
const watchSvg = document.getElementById("watch-svg");
const watchlistBracket = document.getElementById("watchlist-bracket");

// =========================
// PAGE ROUTING
// =========================
function setPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => page.classList.remove("page--active"));

  const target = document.getElementById(pageId);
  if (target) target.classList.add("page--active");
}

// =========================
// UI HELPERS
// =========================
function show(el) {
  el.style.display = "block";
}

function hide(el) {
  el.style.display = "none";
}

// =========================
// MOVIE CARD RENDERING
// =========================
function renderMovieCards(movies) {
  hide(emptyResults);
  show(resultsGridWrapper);
  resultsGrid.innerHTML = "";

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    resultsGrid.appendChild(card);
  });
}

function showEmptyState() {
  show(emptyResults);
  hide(resultsGridWrapper);
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg shadow-md p-4";
  card.innerHTML = `
      <div class="bg-gray-200 h-64 rounded mb-2 flex items-center justify-center">
        <span class="text-gray-500">Poster</span>
      </div>
      <h4 class="font-medium text-gray-800">${movie.title}</h4>
      <p class="text-sm text-gray-600">${movie.year}</p>
    `;
  return card;
}

// =========================
// SEARCH FUNCTIONALITY
// =========================
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = searchInputEl.value.trim();

  if (!searchValue) {
    showEmptyState();
    return;
  }

  // TEMP test data
  const testMovies = [
    { title: searchValue, year: "2024" },
    { title: "Test Movie 2", year: "2023" },
    { title: "Test Movie 3", year: "2022" },
  ];

  renderMovieCards(testMovies);
});

// =========================
// WATCHLIST TOGGLE
// =========================
let watchlistOpen = false;

watchListBtn.addEventListener("click", (e) => {
  e.preventDefault();
  watchlistOpen = !watchlistOpen;

  if (watchlistOpen) {
    setPage("watchlist-section");
    hide(resultsSection);
    watchlistText.textContent = "Search Movies";
    watchSvg.style.display = "none";
    watchlistBracket.style.display = "none";
  } else {
    setPage("search-section");
    show(resultsSection);
    watchlistText.textContent = "Watchlist";
    watchSvg.style.display = "inline";
    watchlistBracket.style.display = "inline";
  }
});

// =========================
// EMPTY WATCHLIST CLICK: GO BACK TO SEARCH
// =========================
emptyWatchlistEl.addEventListener("click", () => {
  watchlistOpen = false;

  setPage("search-section");
  show(resultsSection);

  watchlistText.textContent = "Watchlist";
  watchSvg.style.display = "inline";
  watchlistBracket.style.display = "inline";
});
