import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase.config';
import useAuth from '../../hooks/useAuth';

const Wishlist = () => {

    const [wishlistItem, setWishlistItem] = useState([])
    const wishlistRef = collection(db, 'wishlist')

    const { user } = useAuth()

    useEffect(() => {
        const queryData = query(wishlistRef, where('email', "==", user.email))
        onSnapshot(queryData, (snapshot) => {
            setWishlistItem(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
    }, [])


    return (
        <div className='w-10/12 mx-auto my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {
                wishlistItem?.map(({ id, img, name, price }) =>
                    <div key={id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{name}</h2>
                            <p>Price : $ {price}</p>
                        </div>
                        <figure><img src={img} alt="" className='h-24 w-full object-cover' /></figure>
                    </div>
                )
            }
        </div>
    );
};

export default Wishlist;