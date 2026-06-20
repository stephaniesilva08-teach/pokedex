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
        const pokemonType = document.getElementById("pokemon-type");
        const tittleinfo = document.getElementById("titulo-info")
        const tittletype = document.getElementById("titulo-type")

        if (pokemonUrl === "") {
            pokemonImage.removeAttribute("src");
            pokemonName.textContent = "";
            pokemonStats.innerHTML = "";
            pokemonsAbs.innerHTML = "";
            titleAbilities.textContent = "";
            pokemonInfo.style.display = "none";
            pokemonType.textContent = "";
            tittleinfo.textContent = "";
            tittletype.textContent = "";
            
        } else {
            const response = await fetch(pokemonUrl).then(response => response.json());
            pokemonInfo.style.display = "inline-block";
            pokemonImage.src = response.sprites.front_default;
            pokemonName.textContent = response.name;

            pokemonStats.innerHTML = "";
            tittleinfo.textContent = "Informaccion del pokemon: ";

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

            tittletype.textContent = "Tipos de pokemon: ";

            pokemonImage.addEventListener("mouseenter", () => {
                response.types.forEach((data) => {
                    const li = document.createElement("li");
                    li.textContent = data.type.name;
                    pokemonType.appendChild(li);
                });
              });
    
            pokemonImage.addEventListener("mouseleave", () => {
                pokemonType.innerHTML = "";
                pokemonImage.style.opacity = "100%";
            });
        }
    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
};
