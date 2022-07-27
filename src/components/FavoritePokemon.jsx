import React, { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {MdDeleteForever} from 'react-icons/md'

const FavoritePokemon = () => {
  const [pokemonDb, setPokemonDb] = useState([]);
  const [user] = useAuthState(auth);
  const dbPokemonUser = doc(db, "user", `${user.email}`);

  useEffect(() => {
    onSnapshot(doc(db, "user",`${user.email}`), (doc) => {
      setPokemonDb(doc.data().savedPokemon);
    });
  }, [user.email]);

  const deletePokemon = async (dbId) => {
    try {
      const result = pokemonDb.filter((item) => item.id !== dbId);
      await updateDoc(dbPokemonUser, {
        savedPokemon: result,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {pokemonDb.map((item, index) => {
        return (
            <div key={index}  className="w-[15%] mx-3">
              <div className="relative  break-words bg-gray-100 w-full mb-6 shadow-lg rounded mt-10 py-6">
                <div className="flex gap-2 justify-between">
                  <div className="relative">
                    <img
                      src={item.img}
                      className=" mx-24 absolute z-10 -top-5 left-5 max-w-[250px]"
                      alt={item.name}
                    />
                    <h3 className="text-sm text-slate-400 text-start mt-8 mx-6 font-bold leading-normal">
                      # {item.id}
                    </h3>
                    <h3 className="text-l text-slate-500 text-start mx-6 font-bold leading-normal ">
                      {item.name.toUpperCase()}
                    </h3>
                  </div>
                  <MdDeleteForever onClick={() => deletePokemon(item.id)} size={25} className="absolute top-1 right-1 text-gray-700 hover:scale-150 cursor-pointer z-50"/>
                </div>
              </div>
            </div>
        );
      })}
    </>
  );
};

export default FavoritePokemon;
