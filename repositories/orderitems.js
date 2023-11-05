import dbPool from "../utils/db.js";

// Buat OrderItem
const createOrderItemData = (order_id, produk_id, jumlah, subtotal) => {
    const query = "INSERT INTO OrderItems (order_id, produk_id, jumlah, subtotal) VALUES (?,?,?,?)";
    const values = [order_id, produk_id, jumlah, subtotal];

    return dbPool.query(query, values);
}

// Cari OrderItem by Order
const getOrderItemDataByOrder = (id) => {
    const query = "SELECT * FROM OrderItems WHERE order_id=?";

    return dbPool.query(query, [id]);
}

// Hapus OrderItem
const getOrderItemData = () => {
    const query = "SELECT * FROM Orders";

    return dbPool.query(query);
}

// Hapus OrderItem
const deleteOrderItemData = (produk_order_id) => {
    const query = "DELETE FROM OrderItems WHERE produk_order_id=?";

    return dbPool.query(query,[produk_order_id]);
}

export {createOrderItemData, getOrderItemDataByOrder, deleteOrderItemData, getOrderItemData}