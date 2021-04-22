let pokemonRepository = (function() {
  let repository = [];

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      repository.push(pokemon);
    } else {
    }
  }
  function getAll() {
    return repository;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-light");
    listpokemon.classList.add("group-list-item");
    button.setAttribute("data-target", "#exampleModal");
    button.setAttribute("data-toggle", "modal");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    buttonClickAction(button, pokemon);
  }
  function buttonClickAction(button, pokemon) {
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }
  function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function() {
      let modalContainer = document.querySelector("#exampleModal");
      let titleElement = document.querySelector(".modal-title");
      titleElement.innerText = pokemon.name;
      let contentElement = document.querySelector(".modal-image");
      contentElement.src = pokemon.imageUrl;
      let pokemonHeight = document.querySelector(".modal-data");
      pokemonHeight.innerText = "Height : " + pokemon.height;
      button.setAttribute("data-target", "#exampleModal");
      button.setAttribute("data-toggle", "modal");
    });
  }
  function LoadList() {
    return fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(function(response) {
        return response.json(); // This returns a promise!
      })
      .then(function(pokemonList) {
        pokemonList.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        }); // The actual JSON response
      })
      .catch(function() {
        // Error
      });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json(); // This returns a promise!
      })
      .then(function(PokemonDetails) {
        item.imageUrl = PokemonDetails.sprites.front_default;
        item.height = PokemonDetails.height;
        console.log("PokemonDetails", item); // The actual JSON response
      })
      .catch(function() {
        // Error
      });
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    LoadList: LoadList,
    loadDetails: loadDetails
  };
})();

console.log(pokemonRepository.getAll());
let pokemonlist = pokemonRepository.LoadList();

pokemonRepository.LoadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
