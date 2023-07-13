const searchForm = document.querySelector("#searchForm");
const searchInput = searchForm.querySelector("input")
const searchIcon = searchForm.querySelector("img");

function handleSearch(event) {
    event.preventDefault();
    var searchQuery = searchInput.value;
    searchQuery.replace(/ /g,"%20");
    location.replace(`https://www.google.com/search?q=${searchQuery}`)
}

/* Beta Features
function searchInactive() {
    searchIcon.src = "search.png";
}

function searchActive() {
    searchIcon.src = "search_active.png";
}
*/

function init() {
    searchForm.addEventListener("submit",handleSearch);
    /* Beta Features
    searchInput.addEventListener("mouseover", searchActive);
    searchInput.addEventListener("mouseout", searchInactive);
    searchInput.addEventListener("focus", searchActive);
    */
}

init();