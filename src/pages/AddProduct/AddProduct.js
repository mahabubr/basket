import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';

const AddProduct = () => {

    const productsCollectionRef = collection(db, "products")

    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [price, setPrice] = useState(0)
    const [review, setReview] = useState(0)
    const [description, setDescription] = useState('')

    const navigate = useNavigate()

    const handleAddProduct = async () => {
        await addDoc(productsCollectionRef, { name, img, price, review, description })
        navigate('/')
        toast.success('Product Added')
    }

    return (
        <div className='my-20 w-10/12 mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <input required onBlur={(e) => setName(e.target.value)} type="text" placeholder="Product Name" className="input input-bordered w-full" />
                <input required onBlur={(e) => setImg(e.target.value)} type="text" placeholder="Product Image URL" className="input input-bordered w-full" />
                <input required onBlur={(e) => setPrice(e.target.value)} type="number" placeholder="Product Price" className="input input-bordered w-full" />
                <input required onBlur={(e) => setReview(e.target.value)} type="number" placeholder="Product Review" className="input input-bordered w-full" />
            </div>
            <textarea required onBlur={(e) => setDescription(e.target.value)} className="textarea textarea-bordered w-full my-4" placeholder="Description"></textarea>
            <button onClick={handleAddProduct} className='btn btn-primary'>Add Product</button>
        </div>
    );
};

export default AddProduct;