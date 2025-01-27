import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home2 from "./pages/Home2";
import ProtectedComponent from "./components/ProtectedComponent";
import Detail from "./pages/Detail";
import Favorite from "./pages/Favorite";
import Footer from "./components/Footer";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data;
  };

  useEffect(() => {
    const getPokemonList = async () => {
      let pokemonArray = [];
      for (let i = 1; i <= 150; i++) {
        pokemonArray.push(await getPokemonData(i));
      }
      setPokemon(pokemonArray);
      setLoading(false);
    };
    getPokemonList();
  }, []);

  const handleToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home2
              pokemon={pokemon}
              loading={loading}
              handleToDetail={handleToDetail}
            />
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedComponent isLoggin={false}>
              <Login />
            </ProtectedComponent>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedComponent isLoggin={false}>
              <Register />
            </ProtectedComponent>
          }
        />
        <Route
          path="/detail/:pokemonId"
          element={
            <ProtectedComponent>
              <Detail />
            </ProtectedComponent>
          }
        />
        <Route
          path="/favorite"
          element={
            <ProtectedComponent>
              <Favorite handleToDetail={handleToDetail} />
            </ProtectedComponent>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
