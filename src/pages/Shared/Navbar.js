import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/logo.png'

const Navbar = () => {

    const { user, logOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success('Sign Out Successful')
                navigate('login')
            })
    }

    const NavLinks = () => {
        return <>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/add-product'>Add Product</Link>
            </li>
        </>
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <NavLinks />
                    </ul>
                </div>
                <div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl">
                        <img className='w-12' src={logo} alt="" />
                        <p>Basket</p>
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <NavLinks />
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user && user?.uid &&
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} alt="" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li><p className="justify-between mb-2">{user?.displayName}</p></li>
                            <button onClick={handleSignOut} className="btn btn-warning">Log Out</button>
                        </ul>
                    </div>
                }
            </div>
        </div>

    );
};

export default Navbar;