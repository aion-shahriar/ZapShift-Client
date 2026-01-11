import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-5xl">Payment History : {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Time of Payment</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                payments.map((payment, idx)=> <tr key={payment._id}>
              <th>{idx + 1}</th>
              <td>{payment.name}</td>
              <td>${payment.amount}</td>
              <td>{payment.paidAt}</td>
              <td>{payment.transactionId}</td>
            </tr>)
            }
            
            
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
