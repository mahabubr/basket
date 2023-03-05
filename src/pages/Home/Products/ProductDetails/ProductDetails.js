import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../../firebase/firebase.config';
import useAuth from '../../../../hooks/useAuth';

const ProductDetails = () => {

    const { user } = useAuth()

    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState([])
    const productsCollectionRef = doc(db, 'products', id)

    const cartCollectionRef = collection(db, "cart")

    useEffect(() => {
        onSnapshot(productsCollectionRef, (doc) => {
            setProduct(doc.data(), doc.id);
        })
    }, [])

    const handleAddProduct = async () => {
        const name = product.name
        const price = product.price
        const img = product.img
        const email = user.email

        await addDoc(cartCollectionRef, { name, img, price, email, quantity: 1 })
        navigate('/cart')
        toast.success('Added Your Product in Cart')
    }

    return (
        <div className='w-10/12 mx-auto my-20'>
            <img className='w-full h-52 object-cover rounded-lg border-gray-500 border-2 shadow-2xl' src={product.img} alt="" />
            <div className='mt-8'>
                <h2 className='text-3xl font-bold'>{product.name}</h2>
                <p className='text-green-700 font-bold text-xl mt-1'>Price: $ {product.price}</p>
                <p className='text-gray-600 mt-2 text-justify'>{product.description}</p>
            </div>
            <div className="flex justify-center items-center mt-4">
                <button onClick={handleAddProduct} className="btn btn-secondary">Add To Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;