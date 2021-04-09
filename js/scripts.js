let pokemonRepository = (function() {
  let repository = [];

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return repository;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
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
    pokemonRepository.loadDetails(pokemon);
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

//pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

console.log(pokemonRepository.getAll());
let pokemonlist = pokemonRepository.LoadList();

pokemonRepository.LoadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
