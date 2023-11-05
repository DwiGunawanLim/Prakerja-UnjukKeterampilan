import dbPool from "../utils/db.js";

// Buat Pesanan
const createOrderData = (customer_id, jumlah_order) => {
    const query = "INSERT INTO Orders (customer_id, jumlah_order) VALUES (?, ?)";
    const values = [customer_id, jumlah_order];

    return dbPool.query(query, values);
}

// Cari Pesanan By ID
const getOrderDataByID = (id) => {
    const query = "SELECT * FROM Orders WHERE order_id =?";

    return dbPool.query(query, [id]);
}

// Cari Pesanan by Customer
const getOrderDataByCustomer = (customer_id) => {
    const query = "SELECT * FROM Orders WHERE customer_id=?";

    return dbPool.query(query,[customer_id]);
}

// Ubah Status Order
const UpdateOrderStatusData = (order_id, status_order) => {
    const query = "UPDATE Orders SET status_order=? WHERE order_id=?";
    const values = [status_order, order_id]

    return dbPool.query(query,values);
}

export {createOrderData, getOrderDataByID, getOrderDataByCustomer, UpdateOrderStatusData}