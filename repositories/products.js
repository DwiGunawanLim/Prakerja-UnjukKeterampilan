import dbPool from "../utils/db.js";

// Buat Produk Baru
const createProductData = (nama_produk, deskripsi_produk, harga_produk, jumlah_stok, kategori) => {
    const query = "INSERT INTO Products (nama_produk, deskripsi_produk, harga_produk, jumlah_stok, kategori) VALUES (?,?,?,?,?)";
    const values = [nama_produk, deskripsi_produk, harga_produk, jumlah_stok, kategori];

    return dbPool.query(query, values);
}

// Tampilkan Semua Produk
const getProductData = () => {
    const query = "SELECT * FROM Products";

    return dbPool.query(query);
}

// Ubah Informasi Produk
const updateProductData = (produk_id, nama_produk, deskripsi_produk, harga_produk, kategori) => {
    const query = "UPDATE Products SET nama_produk=?, deskripsi_produk=?, harga_produk=?, kategori=? WHERE produk_id=?";
    const values = [nama_produk, deskripsi_produk, harga_produk, kategori, produk_id];

    return dbPool.query(query, values);
}

// Hapus Produk
const deleteProductData = (id) => {
    const query = "DELETE FROM Products WHERE produk_id=?";

    return dbPool.query(query, [id]);
}

// Detail Produk
const getProductDataByID = (id) => {
    const query = "SELECT * FROM Products WHERE produk_id=?";

    return dbPool.query(query,[id]);
}

// Detail Produk by Nama
const getProductDataByName = (id) => {
    const query = "SELECT * FROM Products WHERE nama_produk=?";

    return dbPool.query(query,[id]);
}

// List Produk by Kategori
const getProductDataByCategories = (kategori) => {
    const query = "SELECT * FROM Products WHERE kategori=?";

    return dbPool.query(query,[kategori]);
}

export {createProductData, getProductData, updateProductData, deleteProductData, getProductDataByID, getProductDataByName, getProductDataByCategories}