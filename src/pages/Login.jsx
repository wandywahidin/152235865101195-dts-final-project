import React, {useState, useEffect} from "react";
import pink from '../assets/pink.jpg'
import {useNavigate, Link} from 'react-router-dom'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from "../config/firebase";

const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const inputEmailChange = (event) => {
    setCredential({ ...credential, email: event.target.value });
  };

  const inputPasswordChange = (event) => {
    setCredential({ ...credential, password: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(credential.email, credential.password);
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
              <img
                src={pink}
                className="w-[80%]"
                alt="Phone"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 border-2 p-5 shadow-lg rounded">
              <h1 className="text-3xl font-bold mb-6">Login</h1>
              <form onSubmit={submitHandler}>
                <div className="mb-6">
                  <input
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    onChange={inputEmailChange}
                    value={credential.email}
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
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
                  {loading ? 'Loading...' : 'Sign In'}
                </button>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <a
                  className="px-7 py-3 bg-[#3b5998] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="w-3.5 h-3.5 mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                    />
                  </svg>
                  Continue with Facebook
                </a>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">
                    Not have Account?
                  </p>
                </div>
                <a
                  className="px-7 py-3 bg-[#8b9ec5] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <Link to='register'>Register</Link>
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
