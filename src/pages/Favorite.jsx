import React from "react";
import FavoritePokemon from "../components/FavoritePokemon";

const Favorite = ({handleToDetail}) => {
  return (
    <>
      <div className="flex justify-center align-middle flex-wrap">
        <FavoritePokemon handleToDetail={handleToDetail} />
      </div>
    </>
  );
};

export default Favorite;
