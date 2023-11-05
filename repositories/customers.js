import dbPool from "../utils/db.js";

// Sign Up Customer Baru
const createCustomerData = (nama_customer, email_customer, password, alamat_customer, nomor_customer) => {
    const query = "INSERT INTO Customers (nama_customer, email_customer, password, alamat_customer, nomor_customer) VALUES (?,?,?,?,?)";
    const values = [nama_customer, email_customer, password, alamat_customer, nomor_customer];

    return dbPool.query(query, values);
}

// Tampilkan List Seluruh Customer (Buat Admin)
// const getCustomerData = () => {
//     const query = "SELECT * FROM Customers";

//     return dbPool.query(query);
// }

// Update Profil Customer
const updateCustomerData = (customer_id, nama_customer, email_customer, alamat_customer, nomor_customer) => {
    const query = "UPDATE Customers SET nama_customer=?, email_customer=?, alamat_customer=?, nomor_customer=? WHERE customer_id=?";
    const values = [nama_customer, email_customer, alamat_customer, nomor_customer, customer_id];

    return dbPool.query(query, values);
}

// const deleteCustomerData = (id) => {
//     const query = "DELETE FROM Customers WHERE customer_id=?";

//     return dbPool.query(query, [id]);
// }

// Tampilkan Profil Customer by ID
const getCustomerDataByID = (id) => {
    const query = "SELECT * FROM Customers WHERE customer_id=?";

    return dbPool.query(query,[id]);
}

// Tampilkan Profil Customer by Email
const getCustomerDataByEmail = (email_customer) => {
    const query = "SELECT * FROM Customers WHERE email_customer=?";

    return dbPool.query(query,[email_customer]);
}

// Ganti Password Customer
const updateCustomerPassword = (customer_id, password) => {
    const query = "UPDATE Customers SET password=? WHERE customer_id=?";
    const values = [password, customer_id];

    return dbPool.query(query, values);
}

export {createCustomerData, updateCustomerData, getCustomerDataByID, updateCustomerPassword, getCustomerDataByEmail}