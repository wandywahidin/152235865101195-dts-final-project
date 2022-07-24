import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [detail, setDetail] = useState([]);
  const [img, setImg] = useState([])
  const defaultDetail = "https://pokeapi.co/api/v2/pokemon/1/"

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      setAllPokemon(response.data.results);
    });
  }, []);
  
  useEffect(() => {
    axios.get(defaultDetail).then((response) => {
      setDetail(response.data)
      setImg(response.data.sprites.front_default)
    })
  },[])

  const GetDetail = (url) => {
    axios.get(url).then((response) => {
      setDetail(response.data)
      setImg(response.data.sprites.front_default)
    })
  };
  console.log(detail);

  return (
    <div className="flex justify-evenly">
      <div className="border border-black">
        <h1>List Pokemon</h1>
        <ol>
          {allPokemon.map((pokemon, index) => (
            <div
              className="flex gap-2 my-2"
              key={index}
              onClick={() => GetDetail(pokemon.url)}
            >
              <p>{index + 1}.</p>
              <p>{pokemon.name}</p>
            </div>
          ))}
        </ol>
      </div>
      <div className="border border-black">
        <img className="w-[200px] object-cover bg-black" src={img} alt="gb" />
      </div>
    </div>
  );
};

export default Home;
