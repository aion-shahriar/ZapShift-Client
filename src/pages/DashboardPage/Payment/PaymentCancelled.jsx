import React from 'react';

const PaymentCancelled = () => {
    return (
        <div>
            <h2>Payment cancelled</h2>
            <Link to='/dashboard/my-parcels'>
            <button className='btn btn-primary text-black'>Try Again</button>
            </Link>
        </div>
    );
};

export default PaymentCancelled;