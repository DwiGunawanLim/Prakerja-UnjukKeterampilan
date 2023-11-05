import { createCustomerData, updateCustomerData, getCustomerDataByID, updateCustomerPassword, getCustomerDataByEmail, getCustomerData, deleteCustomerData } from '../repositories/customers.js';
import bcrypt from 'bcrypt';
import { successResponse, errorResponse } from '../utils/response.js';
import jwt from 'jsonwebtoken';
import { request, response } from 'express';

const SECRET_ACCESS_TOKEN = 'Unjuk_Keterampilan';
const SECRET_REFRESH_TOKEN = 'Kelas.com-Prakerja';

export const createCustomer = async (request, response, next) => {
    let nama_customer = request.body.nama_customer;
    let email_customer = request.body.email_customer;
    let password = request.body.password;
    let alamat_customer = request.body.alamat_customer;
    let nomor_customer = request.body.nomor_customer;
    let saltRound = 10;

    bcrypt.hash(password, saltRound, async(err, hashedPassword) => {
        const [result] = await createCustomerData(nama_customer, email_customer, hashedPassword, alamat_customer, nomor_customer);
        const [detailUser] = await getCustomerDataByID(result.insertId);

        if (result.insertId > 0) {
            successResponse(response, "Success", detailUser[0]);
            // console.log(`Data User Berhasil Dibuat Dengan ID: ${result.insertId}`);
        } else {
            errorResponse(response, err);
            // errorResponse(response, "Failed Create Data")
            // console.log(`Data Gagal Dibuat.`);
        }
    });
}

export const getCustomerProfile = async(request, response, next) => {
    try {
        let id = request.claims.id;

        const [result] = await getCustomerDataByID(id);

        if (result.length > 0) {
            successResponse(response, `User dengan ID ${id} Ditemukan`, result[0]);
            // console.log(result[0]);
        } else {
            errorResponse(response, `User ID:${id}  Not Found!`);
            // console.log(`Data User Tidak Ditemukan`);
        }
    } catch (error) {
        next(error);
    }
    
};

export const login = async(request, response, next) => {
    try {
        let email = request.body.email_customer;
        let password = request.body.password;

        // const [result] = await getData();
        const [result] = await getCustomerDataByEmail(email);

        if (result.length > 0) {
            let customer = result[0];
            bcrypt.compare(password, customer.password, (err, isValid) => {
                if (isValid) {
                    let payload = {
                        id: customer.customer_id,
                        name: customer.nama_customer,
                        email: customer.email_customer
                    };
                    let accessToken = jwt.sign(payload, SECRET_ACCESS_TOKEN, {expiresIn: '1h'});
                    let refreshToken = jwt.sign(payload, SECRET_REFRESH_TOKEN, {expiresIn: '30m'});
                    let data = {
                        access_token: accessToken,
                        refresh_token: refreshToken
                    }
                    successResponse(response, "Login Berhasil", data);
                } else {
                    errorResponse(response, "Email atau Password Salah!", 401);
                }
            })
        }
    } catch (error) {
        next(error);
    }
}

export const updateCustomerProfile = async(request, response, next) => {
    try {
        let id = request.claims.id;
        let nama = request.body.nama_customer;
        let email = request.body.email_customer;
        let alamat = request.body.alamat_customer;
        let nomor = request.body.nomor_customer;

        const [result] = await updateCustomerData(id, nama, email, alamat, nomor);
        const [detailUser] = await getCustomerDataByID(id);
    
        if (result.affectedRows > 0) {
            successResponse(response, "Update Berhasil Dilakukan", detailUser[0]);
            // console.log(`Update Berhasil Dilakukan`);
        } else {
            errorResponse(response, "User ID Not Found!");
            // console.log(`Update Gagal`);
        }
    } catch (error) {
        next(error);
    }
}

export const updateCustomerPass = async(request, response, next) => {
    try {
        let id = request.claims.id;
        let password = request.body.password;
        let saltRound = 10;

        bcrypt.hash(password, saltRound, async(err, hashedPassword) => {
            const [result] = await updateCustomerPassword(id, hashedPassword);
            const [detailUser] = await getCustomerDataByID(id);
        
            if (result.affectedRows > 0) {
                successResponse(response, "Update Berhasil Dilakukan", detailUser[0]);
                // console.log(`Update Berhasil Dilakukan`);
            } else {
                errorResponse(response, "User ID Not Found!");
                // console.log(`Update Gagal`);
            }
        });

    } catch (error) {
        next(error);
    }
}

export const validateToken = (request, response, next) => {
    try {
        let authToken = request.headers.authorization;
        let accessToken = authToken && authToken.split(' ')[1]; 
        
        jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error, payload) => {
            if (!error) {
                request.claims = payload;
                next();
            } else {
                errorResponse(response, error.message, 403);
            }
        })

    } catch (error) {
        next(error);
    }
}
