window.addEventListener("load", () => {
  const characters = document.querySelector("#characters");
  const pagination = document.querySelector("#paginationUl");
  let currentPage = 1;

  class Characters {
    async get() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
      const json = await response.json();
      return json;
    }
  }

  const writeCharacters = (json) => {
    const { results, info } = json;
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

    writePaginationItems(info);
  };

  const writePaginationItems = (info) => {
    pagination.innerHTML = null;
    let start = currentPage < 3 ? 1 : currentPage;

    if (currentPage > 1) {
      pagination.innerHTML += `
      <li>
        <a href="#" class="pIcons" id="prevPageBtn"><span class="material-icons">west</span></a>
      </li>`;
    }

    if (currentPage <= info.pages - 3) {
      for (let i = start >= 3 ? start - 1 : start; i <= 2 + start; i++) {
        pagination.innerHTML += `
        <li>
          <a href="#" class="${i === currentPage && "currentPageNumber"}" data-page-number=${i}><span>${i}</span></a>
        </li>
        `;
      }
    }

    if (currentPage > info.pages - 3) {
      for (let i = info.pages - 4; i < info.pages; i++) {
        pagination.innerHTML += `
        <li>
          <a href="#" class="${i === currentPage && "currentPageNumber"}" data-page-number=${i}><span>${i}</span></a>
        </li>
        `;
      }
    }

    if (currentPage < info.pages - 3) {
      pagination.innerHTML += `
      <li>
        <a href="#"><span class="material-icons">more_horiz</span></a>
      </li>`;
    }

    pagination.innerHTML += `
    <li>
      <a href="#" class="${info.pages === currentPage && "currentPageNumber"}" data-page-number=${info.pages}><span>${info.pages}</span></a>
    </li>
    `;

    if (currentPage < info.pages) {
      pagination.innerHTML += `
      <li>
        <a href="#" class="pIcons" id="nextPageBtn"><span class="material-icons">east</span></a>
      </li>`;
    }

    paginationEvent(info);
  };

  const paginationEvent = (info) => {
    const paginationItems = document.querySelectorAll("[data-page-number]");
    const nextPageBtn = document.querySelector("#nextPageBtn");
    const prevPageBtn = document.querySelector("#prevPageBtn");

    paginationItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = parseInt(item.getAttribute("data-page-number"));
        new Characters().get().then((json) => writeCharacters(json));
      });
    });

    nextPageBtn?.addEventListener("click", (e) => {
      currentPage++;
      new Characters().get().then((json) => writeCharacters(json));
    });

    prevPageBtn?.addEventListener("click", (e) => {
      currentPage--;
      new Characters().get().then((json) => writeCharacters(json));
    });
  };

  new Characters().get().then((json) => writeCharacters(json));
});
