const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();
const pokemonSelected = async (pokemonUrl) => {
    try {
        const pokemonImage = document.getElementById("pokemon-image");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonStats = document.getElementById("pokemon-stats");
        const pokemonsAbs = document.getElementById("pokemon-abs");
        const titleAbilities = document.getElementById("title-abilities");
        const pokemonInfo = document.getElementById("pokemon-info");

        if (pokemonUrl === "") {
            pokemonImage.removeAttribute("src");
            pokemonName.textContent = "";
            pokemonStats.innerHTML = "";
            pokemonsAbs.innerHTML = "";
            titleAbilities.textContent = "";
            pokemonInfo.style.display = "none";
        } else {
            const response = await fetch(pokemonUrl).then(response => response.json());
            pokemonInfo.style.display = "inline-block";
            pokemonImage.src = response.sprites.front_default;
            pokemonName.textContent = response.name;

            pokemonStats.innerHTML = "";

            response.stats.forEach(stat => {
                const li = document.createElement("li");
                li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
                pokemonStats.appendChild(li);

            })

            pokemonsAbs.innerHTML = "";
            titleAbilities.textContent = "Habilidades del pokemon: ";

            response.abilities.forEach(data => {
                const li = document.createElement("li");
                li.textContent = data.ability.name;
                pokemonsAbs.appendChild(li);
            });
        }
    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
};
