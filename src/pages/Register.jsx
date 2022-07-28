import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pikachu from "../assets/pikachu.png";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth,db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [credential, setCredential] = useState({ email:"", password:"", userName:"" });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const inputUserNameChange = (event) => {
    setCredential({ ...credential, userName: event.target.value });
  };

  const inputEmailChange = (event) => {
    setCredential({ ...credential, email: event.target.value });
  };

  const inputPasswordChange = (event) => {
    setCredential({ ...credential, password: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(credential.email, credential.password);
    await setDoc(doc(db, 'user', credential.email), {
      savedPokemon : [],
      profile : {
        userName : credential.userName,
        email : credential.email,
        avatar : ''
      }
    });
  };

  useEffect(() => {
    if (user) {
      setCredential({ ...credential, email: "", password: "" });
      navigate("/");
    }
  }, [user, credential, navigate]);

  return (
    <>
      <section className="h-[90vh]">
        <div className="container px-6 py-4 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-5/12 mb-12 md:mb-0">
              <img src={pikachu} className="w-full" alt="Phone" />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 border-2 p-5 shadow-lg rounded">
              <h1 className="text-3xl font-bold mb-6">Register</h1>
              <form onSubmit={submitHandler}>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="User Name"
                    required
                    onChange={inputUserNameChange}
                    value={credential.userName}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    required
                    onChange={inputEmailChange}
                    value={credential.email}
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    required
                    onChange={inputPasswordChange}
                    value={credential.password}
                  />
                  <p>{error? error.message : null}</p>
                </div>

                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                 {loading ? 'Loading...' : 'Register'}
                </button>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">
                    I have Account?
                  </p>
                </div>
                <Link to='/login'
                  className="px-7 py-3 bg-[#8b9ec5] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
