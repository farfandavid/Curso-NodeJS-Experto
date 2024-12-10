const { httpClientPlugin } = require("../plugins");

const getPokemonById = async (id/* , callback */) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemon = await httpClientPlugin.get(url);

  /* const response = await fetch(url);
  const pokemon = await response.json(); */
  //throw new Error('Error');

  return pokemon.name;
  /*   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return //await fetch(url)
      .then((res) =>
        res.json()
      )
      .then((pokemon) => pokemon.name);
    //return `Pokemon with id ${id}`; */
};

module.exports = getPokemonById;