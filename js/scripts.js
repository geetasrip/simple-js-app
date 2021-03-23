let pokemonList = [
  { name: "Happiny", height: 0.6, type: ["normal"] },
  { name: "Genesect", height: 0.6, type: ["steel", "bug"] },
  { name: "HappBulbasauriny", height: 0.7, type: ["grass", "poison"] }
];
let pokemonSizeThreshold = 0.7;

for(let i = 0; i <= pokemonList.length; i++){
    let pokemonString = `${pokemonList[i].name} ( Height: ${ pokemonList[i].height} )`;
    let pokeman = pokemonList[i].height >= pokemonSizeThreshold ? `<p> ${pokemonString} - Wow, that’s big! </p>` : `<p> ${pokemonString} </p>`;
    document.write(pokeman);
}
