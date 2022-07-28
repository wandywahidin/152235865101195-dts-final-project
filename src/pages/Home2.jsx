import React, { useState } from "react";
import CardPokemon from "../components/CardPokemon";
import pokeball from '../assets/ball.png'
import Loading from "../components/Loading";

const Home2 = ({pokemon, loading, handleToDetail}) => {
  const [query, setQuery] = useState("")

  return (
    <>
    {loading ? <Loading/> :
    <>
    <div className="flex justify-center mt-7 gap-2 items-center">
      <div className=" w-[80%] md:w-[30%] relative">
        <input onChange={(e) => setQuery(e.target.value)} type="text" className="w-full p-3 rounded border border-gray-200 shadow-md" placeholder="Cari Pokemon" />
        <img src={pokeball} alt="pokeball" className=" absolute bottom-0 right-1" />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 mx-2 px-1">
      {
        pokemon.filter((search) => search.name.toLowerCase().includes(query)).map((item, index) => (
          <div className=" md:w-[70%] md:mx-3 mx-1 mt-4 md:mt-7" key={index}>
            <CardPokemon data={item} handleToDetail={handleToDetail} />
          </div>
        ))
      }
    </div>
    </>}
    </>
  )
};

export default Home2;
