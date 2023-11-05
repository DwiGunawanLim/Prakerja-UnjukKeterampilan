import * as CustomerService from './services/customer.js';
import * as ProductService from './services/product.js';
import * as OrderService from './services/order.js';
import express from 'express';

const host = "localhost";
const port = 8080;
const app = express();

app.use(express.json()); //ngehandle js nya

// Handle Routing Customer
app.get("/customers/profile", CustomerService.validateToken, CustomerService.getCustomerProfile);
app.post("/customers", CustomerService.createCustomer);
app.put("/customers/profile/edit", CustomerService.validateToken, CustomerService.updateCustomerProfile);
app.put("/customers/profile/edit/password", CustomerService.validateToken, CustomerService.updateCustomerPass);
app.delete("/customers/:id", CustomerService.validateToken, CustomerService.deleteCustomerAccount)
app.post("/login", CustomerService.login);

// Handle Routing Product
app.post("/products", CustomerService.validateToken, ProductService.createProduct);
app.get("/products/detail/:nama_produk", CustomerService.validateToken, ProductService.getProductDetail);
app.put("/products/detail/edit", CustomerService.validateToken, ProductService.updateProductDetail);
app.delete("/products/:id", CustomerService.validateToken, ProductService.deleteProduct);
app.get("/products", CustomerService.validateToken, ProductService.getProduct);
app.get("/products/search/:categories", CustomerService.validateToken, ProductService.getProductbyCategories);

// Handle Order
app.post("/orders", CustomerService.validateToken, OrderService.createOrder);
app.get("/orders", OrderService.getOrder);
app.delete("/orders", CustomerService.validateToken, OrderService.deleteOrder);

// Handle Order Items
app.get("/orders/items", OrderService.getOrderItems);
app.delete("/orders/:id", OrderService.deleteOrder);

app.listen(port, host, () => {
    console.log(`server berjalan di http://${host}:${port}`);
})