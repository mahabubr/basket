import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase.config';
import useAuth from '../../hooks/useAuth';

const OrderHistory = () => {

    const [history, setHistory] = useState([])
    const historyRef = collection(db, 'order-history')

    const { user } = useAuth()

    useEffect(() => {
        const queryData = query(historyRef, where('email', "==", user.email))
        onSnapshot(queryData, (snapshot) => {
            setHistory(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
    }, [])


    return (
        <div className='w-10/12 mx-auto my-20'>
            {
                history?.map(({ id, name, price }, i) =>
                    <div className="overflow-x-auto" key={id}>
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{name.slice(0, 20)}...</td>
                                    <td>$ {price}</td>
                                    <td>
                                        <button className='btn btn-sm btn-accent' disabled>Complete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
};

export default OrderHistory;