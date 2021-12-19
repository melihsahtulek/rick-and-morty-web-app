window.addEventListener("load", () => {
  const characters = document.querySelector("#characters");
  let currentPage = 1;
  const pagination = document.querySelector("#paginationID");

  const getCharacters = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
    const json = await response.json();
    return json;
  };

  getCharacters().then((json) => {
    let { results, info } = json;
    console.log(info);
    for (let i = currentPage; i <= 5; i++) {
      console.log(i);
    }
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
  });
});
