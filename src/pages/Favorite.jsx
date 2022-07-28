import React from "react";
import FavoritePokemon from "../components/FavoritePokemon";

const Favorite = ({ handleToDetail }) => {
  return (
    <>
    <div className="text-center font-bold text-2xl mt-2">My Favorite Pokemon</div>
      <div className=" grid grid-cols-2 md:grid-cols-5 mx-2 px-1">
        <FavoritePokemon handleToDetail={handleToDetail} />
      </div>
    </>
  );
};

export default Favorite;
