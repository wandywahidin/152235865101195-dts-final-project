import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
    navigate('/')
  }
  return (
    <>
    <div className='flex justify-between px-8 py-2 bg-yellow-400 text-gray-700 items-center'>
        <Link to='/'>
            <h1 className='text-2xl font-bold'>PokeFake</h1>
        </Link>
        <div className='flex gap-3 font-bold'>
          {loading ? 'Initializing User' : null }
          {error ? error.message : null}
          {user ? (
            <>
            <Link to='/favorite'>My Favorite {user.email}</Link>
            <Link to='/' onClick={() => logOut()}>Sign Out</Link>
            </> ) : 
            (<>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            </>
            )
          }
        </div>
    </div>
    </>
  )
}

export default Navbar