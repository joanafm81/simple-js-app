let pokemonRepository = (function () {
	
	let pokemonList = [];

	function add (pokemon) {
		if (typeof pokemon === 'object' && pokemon.name && pokemon.height && pokemon.type && Object.keys(pokemon).length === 3) {
			pokemonList.push(pokemon);
		} else {
			return `${pokemon} is not a Pokémon. Pokémon must be an object with the keys name, height and type`;
		}
	}

	function getAll () {
		return pokemonList
	}

	return {
		add: add,
		getAll: getAll

	};

}) ();

pokemonRepository.add({ name: 'Ivysaur', height: 1, type: ['Grass', 'Poison'] });
pokemonRepository.add({ name: 'Butterfree', height: 1.1, type: ['Bug', 'Flying'] });
pokemonRepository.add({ name: 'Noctowl', height: 1.6, type: ['Flying', 'Normal'] });
pokemonRepository.add({ name: 'Azumarill', height: 0.8, type: ['Fairy', 'Water'] });
pokemonRepository.add({ name: 'Cobalion', height: 2.1, type: ['Steel', 'Fighting'] });

let pokemonList = pokemonRepository.getAll();


//forEach() function to iterate over the Pokémon in the pokemonList array (external function)
pokemonList.forEach(printDetails);
function printDetails (pokemon) {
	let highlight = '';
	if (pokemon.height > 2.0) {
		highlight = " - Wow, that\’s big!";
	}
	document.write(`<li>${pokemon.name} (height: ${pokemon.height}) ${highlight}</li>`);
}

 let pokemonNames = [];
 for (let i = 0; i < pokemonList.length; i++) {
   pokemonNames.push(pokemonList[i].name);
 }

function findPokemons (query) {
	return pokemonNames.filter(function (name) {
		return name.toLowerCase().indexOf(query.toLowerCase()) > -1;
	});
}

console.log(findPokemons('Iv'))
