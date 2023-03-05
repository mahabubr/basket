import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import { db } from '../../firebase/firebase.config';
import useAuth from '../../hooks/useAuth';

const Cart = () => {

    const { user } = useAuth()
    const [cartItems, setCartItems] = useState([])

    const cartRef = collection(db, 'cart')

    useEffect(() => {
        const queryData = query(cartRef, where('email', "==", user.email))
        onSnapshot(queryData, (snapshot) => {
            setCartItems(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
    }, [])

    const getPriceSum = (items) => {
        let sum = 0
        for (let i = 0; i < items.length; i++) {
            sum += parseInt(items[i].price * items[i].quantity)
        }
        return sum
    }

    const sum = getPriceSum(cartItems)

    return (
        <div className='my-20 w-10/12 mx-auto'>
            <div className="flex flex-col p-6 space-y-4 sm:p-10">
                <h2 className="text-xl font-semibold">Your cart</h2>
                <ul className="flex flex-col divide-y divide-gray-700">
                    {
                        cartItems?.map((item) => <CartItem item={item} key={item.id} />)
                    }
                </ul>
                <div className="space-y-1 text-right">
                    <p>Total amount:
                        <span className="font-semibold"> $ {sum}</span>
                    </p>
                    <p className="text-sm text-gray-400">Not including taxes and shipping costs</p>
                </div>
                <div className="md:flex justify-end md:space-x-4">
                    <Link to='/'>
                        <button className='btn btn-primary w-full'>Back To Shop</button>
                    </Link>
                    <Link to='/checkout-all'>
                        <button className='btn btn-outline btn-primary w-full mt-4 md:mt-0'>Check Out</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;