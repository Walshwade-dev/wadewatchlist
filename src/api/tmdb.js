// ============================
// ENV
// ============================
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

const BASE_URL = "https://api.themoviedb.org/3";

// ============================
// GENRE MAP
// ============================
const GENRE_MAP = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
};

export function getGenresFromIds(ids) {
    if (!ids?.length) return "Unknown";
    return ids.map(id => GENRE_MAP[id] || "Unknown").join(", ");
}

// ============================
// MAIN FETCH WRAPPER
// ============================
export async function tmdbFetch(endpoint, queryParams = "") {
    try {
        const url = `${BASE_URL}${endpoint}${queryParams}`;

        const response = await fetch(url, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${TMDB_TOKEN}`
            }
        });

        if (!response.ok) throw new Error("TMDB request failed");

        return await response.json();

    } catch (err) {
        console.error("TMDB Fetch Error:", err);
        return null;
    }
}

// ============================
// FORMAT MOVIE OBJECT
// ============================
export function formatTmdbMovie(movie) {
    return {
        Poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image",

        Title: movie.title || movie.original_title || "Untitled",

        imdbRating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",

        Runtime: movie.release_date
            ? movie.release_date.split("-")[0]
            : "N/A",

        Genre: getGenresFromIds(movie.genre_ids),

        Plot: movie.overview || "No description available."
    };
}

// ============================
// SEARCH MOVIE WRAPPER
// ============================
export function searchMovies(query) {
    return tmdbFetch(
        `/search/movie`,
        `?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
    );
}
