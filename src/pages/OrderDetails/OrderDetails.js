import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase.config';
import useAuth from '../../hooks/useAuth';

const OrderDetails = () => {

    const [details, setDetails] = useState([])
    const historyRef = collection(db, 'order-history')

    const { user } = useAuth()

    useEffect(() => {
        const queryData = query(historyRef, where('email', "==", user.email))
        onSnapshot(queryData, (snapshot) => {
            setDetails(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
    }, [])

    const getPriceSum = (items) => {
        let sum = 0
        for (let i = 0; i < items.length; i++) {
            sum += parseInt(items[i].price)
        }
        return sum
    }

    const sum = getPriceSum(details)

    return (
        <div className='w-10/12 mx-auto my-20'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            details.map(({ id, name, price }, i) =>
                                <tr key={id}>
                                    <th>{i + 1}</th>
                                    <td>{name}</td>
                                    <td>$ {price}</td>
                                </tr>
                            )
                        }
                        <tr className="active">
                            <th></th>
                            <th>Total Amount</th>
                            <th>$ {sum}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default OrderDetails;