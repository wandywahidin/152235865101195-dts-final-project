import React, { useState } from "react";
import CardPokemon from "../components/CardPokemon";
import pokeball from "../assets/ball.png";
import Loading from "../components/Loading";

const Home2 = ({ pokemon, loading, handleToDetail }) => {
  const [query, setQuery] = useState("");

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-center mt-7 gap-2 items-center">
            <div className="w-[30%] relative">
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="w-full p-3 rounded border border-gray-200 shadow-md"
                placeholder="Cari Pokemon"
              />
              <img
                src={pokeball}
                alt="pokeball"
                className=" absolute bottom-0 right-1"
              />
            </div>
          </div>
          <div className="flex justify-center align-middle flex-wrap">
            {pokemon
              .filter((search) => search.name.toLowerCase().includes(query))
              .map((item, index) => (
                <div className="w-[15%] mx-3" key={index}>
                  <CardPokemon data={item} handleToDetail={handleToDetail} />
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home2;
