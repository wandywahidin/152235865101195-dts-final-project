import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPokemon from "../components/CardPokemon";

const Home2 = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  // const getPokemonList = async () => {
  //   let pokemonArray = [];
  //   for (let i = 1; i <= 151; i++) {
  //     pokemonArray.push(await getPokemonData(i));
  //   }
  //   console.log(pokemonArray);
  //   setPokemon(pokemonArray);
  //   setLoading(false);
  // };

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };

  useEffect(() => {
    const getPokemonList = async () => {
      let pokemonArray = [];
      for (let i = 1; i <= 150; i++) {
        pokemonArray.push(await getPokemonData(i));
      }
      console.log(pokemonArray);
      setPokemon(pokemonArray);
      setLoading(false);
    };
    getPokemonList();
  }, []);

  return (
    <>
    {loading ? <h1>Loading</h1> :
    <>
    <div className="">
      <input type="text" className="w-[50%] p-2 rounded border border-black" placeholder="masukan nama pokemon" />
    </div>
    <div className="flex justify-center align-middle flex-wrap">
      {
        pokemon.map((item, index) => (
          <div className="w-[15%] mx-3" key={index}>
            <CardPokemon data={item.data} />
          </div>
        ))
      }
    </div>
    </>}
    </>
  )
};

export default Home2;
