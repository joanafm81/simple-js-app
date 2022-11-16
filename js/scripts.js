let pokemonRepository = (function () {
	
	let pokemonList = [];
	let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function add (pokemon) {
		if (typeof pokemon === 'object' && pokemon.name && pokemon.detailsUrl /*&& pokemon.height && pokemon.type && Object.keys(pokemon).length === 3*/) {
			pokemonList.push(pokemon);
		} else {
			return `${pokemon} is not a Pokémon. Pokémon must be an object with the keys name, height and type`;
		}
	}

	function getAll () {
		return pokemonList;
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
		pokemonRepository.loadDetails(pokemon).then(function() {
			console.log(pokemon);
			showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
		});
	}

	function showModal(name, height, imageUrl) {
		let modalContainer = document.querySelector('#modal-container');
		
		//Clear all existing modal content
		modalContainer.innerText = ' ';

		let modal = document.createElement ('div');
		modal.classList.add('modal');

		//Add the new modal content
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);

		let titleElement = document.createElement('h1');
		titleElement.innerText = name;

		let contentElement = document.createElement('p');
		contentElement.innerText = 'Height: ' + height;

		let imageElement = document.createElement('img');
		imageElement.classList.add('image');
		imageElement.src = imageUrl;


		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(contentElement);
		modal.appendChild(imageElement)
		modalContainer.appendChild(modal);
		
		modalContainer.classList.add('is-visible');

		modalContainer.addEventListener('click', (e) => {
			let target = e.target;
			if (target === modalContainer) {
				hideModal();
			}
		});
	}

	function hideModal() {
		let modalContainer = document.querySelector('#modal-container');
		modalContainer.classList.remove('is-visible');
	}

	window.addEventListener('keydown', (e) => {
		let modalContainer = document.querySelector('#modal-container');
		if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	function loadList() {
		showLoadingMessage();
		return fetch(apiURL).then(function(response) {
			return response.json();
		}).then(function(json) {
			json.results.forEach(function(item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
			});

			hideLoadingMessage();
		}).catch(function(e) {
			console.error(e);
			hideLoadingMessage();
		});
	}

	function loadDetails(item) {
		showLoadingMessage();
		let url = item.detailsUrl;
		return fetch(url).then(function(response) {
			return response.json();
		}).then(function(details) {
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.type = details.types;
			hideLoadingMessage();
		}).catch(function(e) {
			console.error(e);
			hideLoadingMessage();
		});
	}

	function showLoadingMessage() {
		let messages = document.querySelector('#messages');
		let message = document.createElement('span');
		message.id = 'loading';		
		message.innerText= "Loading...";
		messages.appendChild(message);
	}

	function hideLoadingMessage() {
		//let messages = document.querySelector('#messages');
		let message = document.querySelector('#loading');
		message.parentElement.removeChild(message);
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails
	};

}) ();

//forEach() function to iterate over the Pokémon in the pokemonList array (external function)
pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(printDetails);
	function printDetails (pokemon) {
		let highlight = '';
		// if (pokemon.height > 2.0) {
		// highlight = " - Wow, that\’s big!";
		//}
		pokemonRepository.addListItem(pokemon);
	}

	console.log(findPokemons('iv'));
});

function findPokemons (query) {
	return pokemonRepository.getAll().filter(function (pokemon) {
		return pokemon.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
	});
}
