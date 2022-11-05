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

	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('pokemon-button');
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
		button.addEventListener('click', function (ev) {
			showDetails(pokemon);
		});
	}

	function showDetails(pokemon) {
		console.log(pokemon);

	}


	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem
	};

}) ();

pokemonRepository.add({ name: 'Ivysaur', height: 1, type: ['Grass', 'Poison'] });
pokemonRepository.add({ name: 'Butterfree', height: 1.1, type: ['Bug', 'Flying'] });
pokemonRepository.add({ name: 'Noctowl', height: 1.6, type: ['Flying', 'Normal'] });
pokemonRepository.add({ name: 'Azumarill', height: 0.8, type: ['Fairy', 'Water'] });
pokemonRepository.add({ name: 'Cobalion', height: 2.1, type: ['Steel', 'Fighting'] });

//forEach() function to iterate over the Pokémon in the pokemonList array (external function)
pokemonRepository.getAll().forEach(printDetails);
function printDetails (pokemon) {
	let highlight = '';
	if (pokemon.height > 2.0) {
		highlight = " - Wow, that\’s big!";
	}
	pokemonRepository.addListItem(pokemon);
}

function findPokemons (query) {
	return pokemonRepository.getAll().filter(function (pokemon) {
		return pokemon.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
	});
}

console.log(findPokemons('Iv'))
