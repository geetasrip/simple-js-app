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
    $('<div class="new-class">Content is here!</div>');
    let pokemonList = $(".list-group");
    let listpokemon = $('<li class="group-list-item"></li>');
    let button = $('<button class="btn btn-light"></button>');
    button.text(pokemon.name);
    button.attr("data-target", "#exampleModal");
    button.attr("data-toggle", "modal");
    listpokemon.append(button);
    pokemonList.append(listpokemon);
    buttonClickAction(button, pokemon);
  }
  function buttonClickAction(button, pokemon) {
    button.on("click", function() {
      showDetails(pokemon);
    });
  }
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      let modalContainer = $("#exampleModal");
      let titleElement = $(".modal-title");
      titleElement.text(pokemon.name);
      let contentElement = $(".modal-image");
      contentElement.attr("src", pokemon.imageUrl);
      let pokemonHeight = $(".modal-data");
      pokemonHeight.text("Height : " + pokemon.height);
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
