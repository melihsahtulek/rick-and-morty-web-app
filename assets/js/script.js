window.addEventListener("load", () => {
  const characters = document.querySelector("#characters");
  let currentPage = 1;

  const getCharacters = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
    const json = await response.json();
    writeCharacters(json.results);
  };

  const writeCharacters = (results) => {
    characters.innerHTML = null;
    results.forEach((character) => {
      characters.innerHTML += `
        <a href="#" class="card">
          <div class="top">
            <img src=${character.image} alt="" />
          </div>
          <div class="bottom">
            <h3>${character.name}</h3>
          </div>
        </a>
      `;
    });
  };

  getCharacters();
});
