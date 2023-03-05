import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';
import useAuth from '../../hooks/useAuth';

const CartItem = ({ item: { id, name, img, price, quantity } }) => {

    const totalPrice = quantity * price

    const { user } = useAuth()

    const productsCollectionRef = collection(db, "wishlist")

    const handleRemoveCart = async (id) => {
        const productDoc = doc(db, 'cart', id)
        await deleteDoc(productDoc)
        toast.success('Cart Item Deleted Successfully')
    }

    const handleMinusQuantity = async () => {
        if (quantity === 0) {
            handleRemoveCart(id)
            return
        }
        const quantityDoc = doc(db, 'cart', id)
        const updateQuantityNumber = { quantity: quantity - 1 }
        await updateDoc(quantityDoc, updateQuantityNumber)
    }
    const handlePlusQuantity = async () => {
        const quantityDoc = doc(db, 'cart', id)
        const updateQuantityNumber = { quantity: quantity + 1 }
        await updateDoc(quantityDoc, updateQuantityNumber)
    }

    const handleWishlist = async () => {
        await addDoc(productsCollectionRef, { name, img, price, email: user.email, quantity })
        toast.success('Added Wishlist')
    }

    return (
        <li key={id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="md:flex w-full space-x-2 sm:space-x-4">
                <img className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-gray-500" src={img} alt="" />
                <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold leading-snug sm:pr-8">{name}</h3>
                            <p className="text-lg font-semibold text-pink-600">Price : ${totalPrice}</p>
                            <div className='flex justify-start gap-5 items-center h-8'>
                                <svg onClick={handleMinusQuantity} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:w-8 hover:h-8 duration-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                </svg>
                                <p className="text-lg font-black">{quantity}</p>
                                <svg onClick={handlePlusQuantity} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:w-8 hover:h-8 duration-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                        </div>
                    </div>
                    <div className="md:flex text-sm divide-x">
                        <button onClick={() => handleRemoveCart(id)} type="button" className="text-red-500 flex items-center px-2 py-1 pl-0 space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                <rect width="32" height="200" x="168" y="216"></rect>
                                <rect width="32" height="200" x="240" y="216"></rect>
                                <rect width="32" height="200" x="312" y="216"></rect>
                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                            </svg>
                            <span>Remove</span>
                        </button>
                        <button onClick={handleWishlist} type="button" className="flex items-center px-2 py-1 space-x-1 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                            </svg>
                            <span>Add to Wishlist</span>
                        </button>
                        <Link to={`/checkout/${id}`}>
                            <button type="button" className="flex items-center px-2 py-1 space-x-1 text-teal-600 font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                <span>Check Out</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartItem;