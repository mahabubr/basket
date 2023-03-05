import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';
import useAuth from '../../hooks/useAuth';

const CheckOut = () => {


    const { id } = useParams()
    const { user } = useAuth()
    const [{ name, price, img, quantity }, setCheckOutData] = useState([])
    const checkOutCollectionRef = doc(db, 'cart', id)
    const historyCollectionRef = collection(db, "order-history")

    useEffect(() => {
        onSnapshot(checkOutCollectionRef, (doc) => {
            setCheckOutData(doc.data(), doc.id);
        })
    }, [])

    const handlePayNow = async () => {
        toast.success('Payment Complete')
        await addDoc(historyCollectionRef, { name, img, price, email: user?.email })
        toast.success('Saved in History')
    }

    return (
        <div className='w-10/12 mx-auto my-20'>
            <img className='h-32 rounded-full drop-shadow-2xl w-full object-cover mb-4 border border-gray-900' src={img} alt="" />
            <h2 className='text-center text-teal-700 font-black text-2xl'>{name}</h2>
            <p className='text-center font-bold text-indigo-600'>Price: $ {price * quantity}</p>
            <div className='mt-8'>
                <button onClick={handlePayNow} className='className="inline-block w-full py-3 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer mt-10"'>
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default CheckOut;