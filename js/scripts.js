let pokemonList = [];
pokemonList = [
  { name: 'Ivysaur', height: 1, type: ['Grass', 'Poison'] },
  { name: 'Butterfree', height: 1.1, type: ['Bug', 'Flying'] },
  { name: 'Noctowl', height: 1.6, type: ['Flying', 'Normal'] },
  { name: 'Azumarill', height: 0.8, type: ['Fairy', 'Water'] },
  { name: 'Cobalion', height: 2.1, type: ['Steel', 'Fighting'] },
];
//For loop that iterates over each item in pokemonList
for (let i = 0; i < pokemonList.length; i++) {
	//Conditional to check if the Pokémon's height is above 2.0 and print "Wow that's big!" for the largest Pokémon
	let highlight = '';
	if (pokemonList[i].height > 2.0) {
		highlight = " - Wow, that\’s big!";
	}

	document.write(`<li>${pokemonList[i].name} (height: ${pokemonList[i].height}) ${highlight}</li>`);
}
