import React, { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillCloseCircle } from "react-icons/ai";

const FavoritePokemon = ({ handleToDetail }) => {
  const [pokemonDb, setPokemonDb] = useState([]);
  const [user] = useAuthState(auth);
  const dbPokemonUser = doc(db, "user", `${user.email}`);

  useEffect(() => {
    onSnapshot(doc(db, "user", `${user.email}`), (doc) => {
      setPokemonDb(doc.data().savedPokemon);
    });
  }, [user.email]);

  const deletePokemon = async (dbId) => {
    try {
      const result = pokemonDb.filter((item) => item.id !== dbId);
      await updateDoc(dbPokemonUser, {
        savedPokemon: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {pokemonDb.map((item, index) => {
        return (
          <div key={index} className="md:w-[70%] md:mx-3 mx-1 mt-4 md:mt-7">
            <div className="relative  break-words bg-gray-100 w-full mb-6 shadow-lg rounded mt-10 py-6">
              <div className="flex flex-col justify-between">
                <div
                  onClick={() => handleToDetail(item.id)}
                  className="relative"
                >
                  <img
                    src={item.img}
                    className=" mx-24 absolute -top-5 left-1 max-w-[450px]"
                    alt={item.name}
                  />
                  <h3 className="text-sm text-slate-400 text-start mt-8 mx-6 font-bold leading-normal">
                    # {item.id}
                  </h3>
                  <h3 className="text-l text-slate-500 text-start mx-6 font-bold leading-normal ">
                    {item.name.toUpperCase()}
                  </h3>
                </div>
                <AiFillCloseCircle
                  onClick={() => deletePokemon(item.id)}
                  size={20}
                  className="absolute top-1 left-2 z-10 text-gray-700 hover:scale-150 cursor-pointer"
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FavoritePokemon;
