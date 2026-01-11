import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();

    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    console.log(sessionId);

    const axiosSecure = useAxiosSecure();

    useEffect(()=> {
        if(sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId
                })
            })
        }
    }, [sessionId, axiosSecure])


    return (
        <div className='text-center my-5'>
            <h2 className="text-4xl">Successfully paid.</h2>
            <p>Your Transaction Id: {paymentInfo.transactionId}</p>
            <p>Your Parcel Tracking Id: {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;