import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Detail = () => {
  const [detail, setDetail] = useState([]);
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pokemonId } = useParams();

  useEffect(() => {
    try {
      const getSpecies = async () => {
        let pokemonSpecies = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        );
        setSpecies(pokemonSpecies.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      };

      const getDetail = async () => {
        let pokemonDetail = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        setDetail(pokemonDetail.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      };

      getDetail();
      getSpecies();
    } catch (error) {
      console.log(error.message);
    }
  }, [pokemonId]);


  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <>
          <div className="flex flex-col w-[80%] mx-auto mt-16 p-6 border shadow-xl">
            <div className="flex gap-6 ">
              <div className=" bg-gray-300 rounded">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                  alt={detail.name}
                />
              </div>
              <div
                className="w-full opacity-70 relative rounded"
                style={{
                  backgroundColor: `${species.color.name}`,
                }}
              >
                <h1 className="text-gray-900 mx-4 my-2 font-bold text-3xl">
                  {detail.name.toUpperCase()}
                </h1>
                <div className="p-2 bg-gray-300 mx-4 my-2 font-bold rounded backdrop-brightness-200">
                  <h1 className="text-xl">Description :</h1>
                  <p className="text-sm">{species.flavor_text_entries[0].flavor_text}</p>
                </div>
                <div className=" text-l p-2 bg-gray-300 font-bold mx-4 my-2 rounded">
                  <h1>Habitat : {species.habitat.name}</h1>
                  <h1>Body : {species.shape.name}</h1>
                  <h1>Height : {detail.height / 10} M</h1>
                  <h1>Weight : {detail.weight / 10} kg</h1>
                </div>
                <div className=" text-l p-2 bg-gray-300 font-bold mx-4 my-2 rounded">
                  <h1>
                    Type :{" "}
                    {detail.types.map((item, index) => {
                      return (
                        <span key={index} className="mx-1">
                          {item.type.name},
                        </span>
                      );
                    })}
                  </h1>
                </div>
                <div className="text-l p-2 gap-2 bg-gray-300 font-bold flex mx-4 mt-2 mb-4 rounded">
                  <h1>Ability : </h1>
                  {detail.abilities.map((item, index) => {
                    return <div key={index}>{item.ability.name},</div>;
                  })}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 text-gray-700 justify-between text-center mt-4 items-center gap-8">
              {detail.stats.map((item, index) => {
                return (
                  <div className=" w-full" key={index}>
                    <p className="font-bold">{item.stat.name.toUpperCase()}</p>
                    <div className="w-full bg-gray-300 rounded-full">
                      <div
                        className="text-xs font-medium text-blue-300 text-center p-0.5 leading-none rounded-l-full opacity-70 mt-2"
                        style={{
                          width: item.base_stat,
                          background: `${species.color.name}`,
                        }}
                      >
                        {item.base_stat}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div></div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
