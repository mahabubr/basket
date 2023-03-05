import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import Product from '../../../components/Product/Product';
import Loader from '../../../components/Loader/Loader';

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const productsCollectionRef = collection(db, "products")

    useEffect(() => {
        const getProducts = async () => {
            setLoading(false)
            const data = await getDocs(productsCollectionRef)
            setProducts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getProducts()
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <div className='w-10/12 mx-auto my-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    products?.map(product => <Product key={product.id} product={product} />)
                }
            </div>
        </div>
    );
};

export default Products;