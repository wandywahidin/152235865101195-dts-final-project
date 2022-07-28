import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db } from "../config/firebase";

const CardPokemon = ({ data, handleToDetail }) => {
  const [user] = useAuthState(auth);
  const [favorite, setFavorite] = useState(false);

  const onFavorite = async () => {
    const dbPokemonUser = doc(db, 'user', user.email)
    if(user.email) {
      setFavorite(true);
      await updateDoc(dbPokemonUser, {
        savedPokemon : arrayUnion({
          id : data.id,
          name : data.name, 
          img : data.sprites.front_default
        })
      })
    } else {
      <div>Please login to saved a pokemon</div>
    }
  };

  return (
    <>
      <div className="relative  break-words bg-gray-100 w-full mb-6 shadow-lg rounded mt-10 py-6">
        <div className=" bg-yellow-400 w-full opacity-0 hover:opacity-90 z-10 h-full absolute rounded top-0 flex flex-col justify-between">
          <div onClick={() => onFavorite()} className="flex items-center">
            {favorite ? (
              <>
                <FaHeart
                  color="gray"
                  className="m-2 cursor-pointer font-bold"
                />
                <p className="text-gray-600 text-sm ">Favorite</p>
              </>
            ) : (
              <>
                <FaRegHeart
                  color="gray"
                  className="m-2 cursor-pointer font-bold"
                />
                <p className="text-gray-600 text-sm ">Add Favorite</p>
              </>
            )}
          </div>
          <button
            onClick={() => handleToDetail(data.id)}
            className="text-gray-600 text-sm text-center w-[50%] border border-gray-600 font-bold p-1 mx-2 my-4 rounded-xl hover:bg-gray-300 hover:text-gray-600 hover:font-bold"
          >
            Detail
          </button>
        </div>
        <div className="flex flex-col justify-between">
          <div className="relative">
            <img
              src={data.sprites.front_default}
              className=" mx-24 absolute z-10 -top-5 left-5 max-w-[250px]"
              alt={data.name}
            />
            <h3 className="text-sm text-slate-400 text-start mt-8 mx-6 font-bold leading-normal">
              # {data.id}
            </h3>
            <h3 className="text-l text-slate-500 text-start mx-6 font-bold leading-normal ">
              {data.name.toUpperCase()}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPokemon;
