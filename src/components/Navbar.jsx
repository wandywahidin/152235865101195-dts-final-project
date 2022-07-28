import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const Navbar = () => {
  const [togleProfile, setTogleProfile] = useState(false);
  const [profileDb, setProfileDb] = useState({});
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const togleProfileHandler = () => {
    setTogleProfile(!togleProfile);
  };

  useEffect(() => {
    if(user) {
      onSnapshot(doc(db, "user", `${user.email}`), (doc) => {
        setProfileDb(doc.data().profile);
      });
    }
  }, [user]);

  const logOut = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between px-8 py-2 h-23 bg-yellow-400 text-gray-700 items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">PokeFake</h1>
        </Link>
        <div className="flex gap-3 font-bold">
          {loading ? "Initializing User" : null}
          {error ? error.message : null}
          {user ? (
            <div className="flex items-center">
              <div onClick={()=> navigate('/')} className='cursor-pointer'>Hallo, {profileDb.userName}</div>
              <div onClick={() => togleProfileHandler()} className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex text-sm "
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => togleProfileHandler()}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className=" h-14 w-14 bg-transparent"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${profileDb.avatar}.png`}
                      alt="snorlax"
                    />
                  </button>
                </div>
                { togleProfile ? (
                  <div
                    className="origin-top-right absolute top-13 -right-5 mt-3 w-40 text-center z-10 rounded-md shadow-lg py-1 bg-yellow-400 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link to='/favorite' role='menuitem' tabIndex='-1' id="user-menu-item-0" className="block px-4 py-2 text-sm text-gray-700">My Favorite</Link>
                    <button onClick={() => logOut()} role='menuitem' tabIndex='-1' id="user-menu-item-1" className="block mx-auto py-2 text-sm text-gray-700">Sign Out</button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
