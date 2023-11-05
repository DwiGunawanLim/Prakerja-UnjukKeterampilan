import { createOrderData, getOrderDataByID, getOrderDataByCustomer, UpdateOrderStatusData} from '../repositories/orders.js';
import { createCustomerData, updateCustomerData, getCustomerDataByID, updateCustomerPassword, getCustomerDataByEmail, getCustomerData, deleteCustomerData } from '../repositories/customers.js';
import { createProductData, getProductData, updateProductData, deleteProductData, getProductDataByID, getProductDataByName, getProductDataByCategories, quantityAfterSales } from '../repositories/products.js';
import bcrypt from 'bcrypt';
import { successResponse, errorResponse } from '../utils/response.js';
import { request, response } from 'express';
import { createOrderItemData, getOrderItemDataByOrder } from '../repositories/orderitems.js';

export const createOrder = async (request, response, next) => {
    let customer_id = request.claims.id;
    let nama_produk = request.body.nama_produk;
    let jumlah_produk = request.body.jumlah_produk;
    let jumlah_order = 0;
    let produk_id = [];

    for (let i = 0; i < nama_produk.length; i++) {
        let [checkBarang] = await getProductDataByName(nama_produk[i]);
        let harga_produk = parseInt(checkBarang[0].harga_produk);
        produk_id.push(checkBarang[0].produk_id);
        jumlah_order += harga_produk * jumlah_produk[i];
    }

    const [order] = await createOrderData(customer_id, jumlah_order);
    let [barangorderan] = await getOrderItemDataByOrder(order.insertId);
    let listbarang = [];
    

    // buat Order di setiap item pada keranjang
    for (let i = 0; i < nama_produk.length; i++) {
        let [checkBarang] = await getProductDataByName(nama_produk[i]);
        let harga_produk = parseInt(checkBarang[0].harga_produk);
        let subtotal = harga_produk*jumlah_produk[i];
        await createOrderItemData(order.insertId, checkBarang[0].produk_id, jumlah_produk[i], subtotal);
        listbarang.push({
            nama_produk: checkBarang[0].nama_produk,
            harga_produk: `Rp${parseInt(checkBarang[0].harga_produk)}`,
            jumlah: jumlah_produk[i],
            subtotal: `Rp${subtotal}`
        });

        // ubah stok barang
        // let jumlahsebelum = parseInt(checkBarang[0].jumlah_stok);
        // if (jumlahsebelum >= jumlah_produk[i]) {
        //     let jumlahsesudah = jumlahsebelum - jumlah_produk[i];
        //     let [ubahjumlah] = await quantityAfterSales(checkBarang[0].produk_id,jumlahsesudah);
        //     successResponse(response, "Berhasil Melakukan Pemesanan", listbarang);
        // } else {
        //     errorResponse(response, "Jumlah Barang Tidak Cukup, Gagal Memesan");
        // }
    }
}