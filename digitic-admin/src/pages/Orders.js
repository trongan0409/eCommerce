import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { changeStatusOrder, getOrders } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const [status, setStatus] = React.useState()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);

  const copyState = [...orderState];
  copyState.reverse();

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].shippingInfo.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i]._id}`}>
          View Orders
        </Link>
      ),
      amount: '$' + orderState[i].totalPrice,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  const handleChange = async (value, item) => {
    const id = item._id;
    const res = await dispatch(changeStatusOrder({ id, value }));
    if (res) {
      alert('Change status successfully!')
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">SNo</th>
              <th scope="col">Name</th>
              <th scope="col">Product</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              {/* <th scope="col">Status</th> */}
              <th scope="col">Change status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {copyState && copyState.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.shippingInfo.firstname} {item.shippingInfo.lastname}</td>
                  <td>
                    <Link to={`/admin/order/${copyState._id}`}>
                      View Orders
                    </Link>
                  </td>
                  <td>${item.totalPrice}</td>
                  <td>{new Date(Date.parse(item.createdAt)).toLocaleString()}</td>
                  {/* <td>{item.orderStatus}</td> */}
                  <td>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => handleChange(e.target.value, item)}>
                      <option value='' disabled>{item.orderStatus}</option>
                      <option value='Comfirming'>Comfirming</option>
                      <option value="Delivering">Delivering</option>
                      <option value="Celivered">Celivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                  <td>
                    <Link to="/" className=" fs-3 text-danger">
                      <BiEdit />
                    </Link>
                    <Link className="ms-3 fs-3 text-danger" to="/">
                      <AiFillDelete />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
