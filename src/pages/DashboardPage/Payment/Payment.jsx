import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Payment = () => {
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();

    const {isLoading, data: parcel} = useQuery({
        queryKey: ['parcels' , parcelId],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    // const handlePayment = async()=> {
    //     const paymentInfo = {
    //         cost: parcel.cost,
    //         parcelId: parcel._id,
    //         senderEmail: parcel.senderEmail,
    //         parcelName: parcel.parcelName
    //     }

    //     const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    //     console.log(res.data);

    //     window.location.href=res.data.url;

    // }

    const handlePayment = async () => {
  try {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName
    };

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

    if (res?.data?.url) {
      window.location.href = res.data.url;
    } else {
      console.error('No checkout url in response', res.data);
      Swal.fire('Payment Error', 'Unexpected response from server', 'error');
    }
  } catch (err) {
    console.error('Payment request failed', err);
    const message = err?.response?.data || err.message || 'Unknown error';
    Swal.fire('Payment Error', String(message), 'error');
  }
};

    if(isLoading) {
        return <div>
            <span className='loading loading-infinity loading-xl'></span>
        </div>
    }
    return (
        <div className='text-center mt-10'>
            <h2>Payment pending for : {parcel.parcelName}</h2>
            <p>Cost: {parcel.cost}</p>
            <button onClick={handlePayment} className="btn btn-primary text-black mt-3">Pay Now</button>
        </div>
    );
};

export default Payment;