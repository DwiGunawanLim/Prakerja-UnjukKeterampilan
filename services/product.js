import { createProductData, getProductData, updateProductData, deleteProductData, getProductDataByID, getProductDataByCategories, getProductDataByName } from '../repositories/products.js';
import bcrypt from 'bcrypt';
import { successResponse, errorResponse } from '../utils/response.js';
import { request, response } from 'express';

export const createProduct = async (request, response, next) => {
    let nama_produk = request.body.nama_produk;
    let deskripsi_produk = request.body.deskripsi_produk;
    let harga_produk = request.body.harga_produk;
    let jumlah_stok = request.body.jumlah_stok;
    let kategori = request.body.kategori;

    const [result] = await createProductData(nama_produk, deskripsi_produk, harga_produk, jumlah_stok, kategori);
    const [detailProduk] = await getProductDataByID(result.insertId);

    if (result.insertId > 0) {
        successResponse(response, "Berhasil Menambahkan Produk", detailProduk[0]);
        // console.log(`Data User Berhasil Dibuat Dengan ID: ${result.insertId}`);
    } else {
        errorResponse(response, "Gagal Menambahkan Produk")
        // console.log(`Data Gagal Dibuat.`);
    }
}

export const getProductDetail = async(request, response, next) => {
    try {
        let nama_produk = request.params.nama_produk;

        const [result] = await getProductDataByName(nama_produk);

        if (result.length > 0) {
            successResponse(response, `Produk Ditemukan`, result[0]);
            // console.log(result[0]);
        } else {
            errorResponse(response, `Produk Tidak Ditemukan!`);
            // console.log(`Data User Tidak Ditemukan`);
        }
    } catch (error) {
        next(error);
    }
    
}

export const getProductbyCategories = async(request, response, next) => {
    try {
        let kategori = request.params.categories;

        const [result] = await getProductDataByCategories(kategori);

        if (result.length > 0) {
            successResponse(response, `Terdapat ${result.length} Produk dalam Kategori ${kategori}`, result);
            // console.log(result[0]);
        } else {
            errorResponse(response, `Tidak Terdapat Produk dalam Kategori ${kategori}`);
            // console.log(`Data User Tidak Ditemukan`);
        }
    } catch (error) {
        next(error);
    }
    
}

export const updateProductDetail = async(request, response, next) => {
    try {
        let id = request.body.produk_id;
        let nama_produk = request.body.nama_produk;
        let deskripsi_produk = request.body.deskripsi_produk;
        let harga_produk = request.body.harga_produk;
        let kategori = request.body.kategori;

        const [result] = await updateProductData(id, nama_produk, deskripsi_produk, harga_produk, kategori);
        const [detailProduk] = await getProductDataByID(id);
    
        if (result.affectedRows > 0) {
            successResponse(response, "Update Berhasil Dilakukan", detailProduk[0]);
            // console.log(`Update Berhasil Dilakukan`);
        } else {
            errorResponse(response, "Produk Tidak Ditemukan!");
            // console.log(`Update Gagal`);
        }
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async(request, response, next) => {
    try {
        let id = request.params.id;

        const [result] = await deleteProductData(id);

        if (result.affectedRows > 0) {
            successResponse(response, "Produk Berhasil Dihapus", result.affectedRows);
            // console.log(`User Berhasil Dihapus`);
        } else {
            errorResponse(response, "Gagal Menghapus Produk");
            // console.log(`Gagal Menghapus User`);
        }
    } catch (error) {
        next(error);
    }
}

export const getProduct = async (request, response, next) => {
    try {
        const [result] = await getProductData();

        if (result.length > 0) {
            successResponse(response, "Success", result);
        } else {
            errorResponse(response, "Belum ada Produk", 404)
            // console.log(`Data User Tidak Ada`);
        }
    } catch (error) {
        next(error);
    }
}