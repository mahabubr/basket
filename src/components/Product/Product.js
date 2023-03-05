import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { toast } from 'react-hot-toast';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';
import useAuth from '../../hooks/useAuth';

const Product = ({ product: { name, img, price, review, id } }) => {

    const { user } = useAuth()

    const cartCollectionRef = collection(db, "cart")

    const handleAddProduct = async () => {
        const email = user.email
        await addDoc(cartCollectionRef, { name, img, price, email, quantity: 1 })
        toast.success('Added Your Product in Cart')
    }


    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img src={img} className='h-52 w-full object-cover' alt="" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg">{name.slice(0, 50)}</h2>
                <p className='text-green-700 font-bold'>Price: $ {price}</p>
                <div className='flex items-center'>
                    <ReactStars
                        count={5}
                        size={24}
                        edit={false}
                        value={parseFloat(review)}
                        activeColor="#F7C04A"
                    />
                    <p className='ml-2'>{review}</p>
                </div>
                <div className="flex justify-center items-center gap-3">
                    <Link to={`/product/${id}`} className="inline-flex">
                        <button className="btn btn-primary">
                            View Details
                        </button>
                    </Link>
                    <button onClick={handleAddProduct} className="btn btn-secondary">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Product;