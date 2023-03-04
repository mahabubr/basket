import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const product = ({ product: { name, img, price, review, id } }) => {
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
                    <button className="btn btn-primary">
                        <Link to={`/product/${id}`}>
                            View Details
                        </Link>
                    </button>
                    <button className="btn btn-secondary">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default product;