(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWU4OTc4YzZmNzUzMDdiN2VlYzZkMzNhZjRkOGYwNSIsIm5iZiI6MTc2NDU5MDYwMy45OTUwMDAxLCJzdWIiOiI2OTJkODQwYmYyMDBjZjQwZDQyNmVkMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Lk3CawT4RN7CIb0X54LLkT2y7obG5tgbzbLq8MobU78`,t=`https://api.themoviedb.org/3`,n={28:`Action`,12:`Adventure`,16:`Animation`,35:`Comedy`,80:`Crime`,99:`Documentary`,18:`Drama`,10751:`Family`,14:`Fantasy`,36:`History`,27:`Horror`,10402:`Music`,9648:`Mystery`,10749:`Romance`,878:`Science Fiction`,10770:`TV Movie`,53:`Thriller`,10752:`War`,37:`Western`};function r(e){return e?.length?e.map(e=>n[e]||`Unknown`).join(`, `):`Unknown`}async function i(n,r=``){try{let i=`${t}${n}${r}`,a=await fetch(i,{headers:{accept:`application/json`,Authorization:`Bearer ${e}`}});if(!a.ok)throw Error(`TMDB request failed`);return await a.json()}catch(e){return console.error(`TMDB Fetch Error:`,e),null}}function a(e){return{Poster:e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:`https://via.placeholder.com/500x750?text=No+Image`,Title:e.title||e.original_title||`Untitled`,imdbRating:e.vote_average?e.vote_average.toFixed(1):`N/A`,Runtime:e.release_date?e.release_date.split(`-`)[0]:`N/A`,Genre:r(e.genre_ids),Plot:e.overview||`No description available.`}}function o(e){return i(`/search/movie`,`?query=${encodeURIComponent(e)}&include_adult=false&language=en-US&page=1`)}var s=document.getElementById(`search-form`),c=document.getElementById(`search-input`),l=document.getElementById(`watchlist-btn`);document.getElementById(`search-section`);var u=document.getElementById(`results-section`);document.getElementById(`watchlist-section`);var d=document.querySelector(`#results-section #empty-results`),f=document.getElementById(`empty-watchlist-link`),p=document.getElementById(`results-grid-wrapper`),m=document.getElementById(`results-grid`),h=document.querySelector(`.watchlist-text`),g=document.getElementById(`watch-svg`);function _(){document.documentElement.style.setProperty(`--vh`,`${window.innerHeight}px`)}window.addEventListener(`load`,_),window.addEventListener(`resize`,_);function v(e){document.querySelectorAll(`.page`).forEach(e=>{e.classList.remove(`page--active`)});let t=document.getElementById(e);t&&t.classList.add(`page--active`)}var y=e=>e.style.display=`block`,b=e=>e.style.display=`none`;function x(e){let{Poster:t=``,Title:n=``,imdbRating:r=`N/A`,Runtime:i=`Unknown`,Genre:a=``,Plot:o=``}=e,s=o.split(` `).slice(0,30).join(` `)+`...`,c=document.createElement(`div`);return c.className=`movie-card bg-slate-800 rounded-2xl overflow-hidden h-[380px] p-2 flex flex-col shadow-md`,c.innerHTML=`
    <div class="relative h-[99%] rounded-xl bg-cover bg-center flex flex-col justify-end"
         style="background-image: url('${t}')">

      <div class="absolute inset-0 bg-gradient-to-t from-slate-100/90 dark:from-slate-900/90 via-slate-100/40 dark:via-slate-900/60 to-transparent rounded-xl"></div>

      <div class="relative z-10 p-3 text-white flex flex-col gap-2">

        <div class="flex items-center justify-between">
          <span class="text-xs bg-yellow-500 text-black px-2 py-[2px] rounded-md font-medium">
            ⭐ ${r}
          </span>
        </div>

        <p class="text-xs text-slate-300 line-clamp-2">${s}</p>

        <div class="flex items-center justify-between mt-1">
          <div class="flex gap-2 text-[10px] text-slate-300">
            <span>${i}</span>
            <span>${a.split(`,`)[0]||`N/A`}</span>
          </div>

          <button class="add-btn w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" fill="" />
              <path d="M12 6v12M6 12h12" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>

      </div>
      <h3 class="absolute top-3 left-3 font-semibold text-sm line-clamp-1 dark:text-slate-50 drop-shadow-lg shadow-white">${n}</h3>
    </div>
  `,c}function S(e){b(d),y(p),m.innerHTML=``,e.forEach(e=>{m.appendChild(x(e))})}function C(){y(d),b(p)}s.addEventListener(`submit`,async e=>{e.preventDefault();let t=c.value.trim();if(!t){C();return}let n=await o(t);if(!n||!n.results||n.results.length===0){C();return}S(n.results.map(a))});var w=!1;l.addEventListener(`click`,()=>{if(w=!w,w){v(`watchlist-section`),b(u),h.textContent=`Search Movies`,g.style.display=`none`;return}v(`search-section`),y(u),h.textContent=`Watchlist`,g.style.display=`inline`}),f.addEventListener(`click`,()=>{w=!1,v(`search-section`),y(u),h.textContent=`Watchlist`,g.style.display=`inline`});