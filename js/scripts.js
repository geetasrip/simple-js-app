let pokemonRepository = (function() {
  let pokemonList = [
    { name: "Happiny", height: 0.6, type: ["normal"] },
    { name: "Genesect", height: 0.6, type: ["steel", "bug"] },
    { name: "HappBulbasauriny", height: 0.7, type: ["grass", "poison"] }
  ]; 
  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  };
})();

let pokemonSizeThreshold = 0.7;
pokemonRepository.getAll().forEach(function(pokemon) {
  let pokemonString = `${pokemon.name} ( Height: ${pokemon.height} )`;
  let pokemanItem =
    pokemon.height >= pokemonSizeThreshold
      ? `<p> ${pokemonString} - Wow, that’s big! </p>`
      : `<p> ${pokemonString} </p>`;
  document.write(pokemanItem);
});
