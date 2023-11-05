import {createOrderData, getOrderDataByID, getOrderDataByCustomer, UpdateOrderStatusData} from '../repositories/orders.js';
import { createCustomerData, updateCustomerData, getCustomerDataByID, updateCustomerPassword, getCustomerDataByEmail } from '../repositories/customers.js';
import { createProductData, getProductData, updateProductData, deleteProductData, getProductDataByID, getProductDataByName, getProductDataByCategories } from '../repositories/products.js';
import bcrypt from 'bcrypt';
import { successResponse, errorResponse } from '../utils/response.js';
import { request, response } from 'express';
import { createOrderItemData } from '../repositories/orderitems.js';

export const createOrder = async (request, response, next) => {
    let customer_id = request.claims.id;
    let nama_produk = request.body.nama_produk;
    let jumlah_order = 0;
    let checkBarang = [];

    for (let i = 0; i < nama_produk.length; i++) {
        checkBarang.push(await getProductDataByName(nama_produk[i]));
        let harga_produk = parseInt(checkBarang[0].harga_produk);
        jumlah_order += harga_produk;
    }

    const [order] = await createOrderData(customer_id, jumlah_order);

    for (let i = 0; i < checkBarang.length; i++) {
        const [orderItem] = await createOrderItemData(order.insertId, checkBarang[i].produk_id, 1);
        
    }
    

    if (result.insertId > 0) {
        successResponse(response, "Success", detailUser[0]);
        // console.log(`Data User Berhasil Dibuat Dengan ID: ${result.insertId}`);
    } else {
        errorResponse(response, err);
        // errorResponse(response, "Failed Create Data")
        // console.log(`Data Gagal Dibuat.`);
    }

    successResponse(response, "Done",jumlah_order);
}