"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSalesReport = exports.fetchProductReviews = exports.fetchProductCatalog = exports.DataError = exports.NetworkError = void 0;
// custom error classes//
class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}
exports.NetworkError = NetworkError;
class DataError extends Error {
    constructor(message) {
        super(message);
        this.name = "DataError";
    }
}
exports.DataError = DataError;
// simulate fetching product catalog//
const fetchProductCatalog = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // use Math.random() to simulate success/failure//
            if (Math.random() < 0.8) { // 80% success rate
                resolve([
                    { id: 1, name: "Laptop", price: 1200 },
                    { id: 2, name: "Headphones", price: 198 },
                    { id: 3, name: "Mouse", price: 50 },
                    { id: 4, name: "Keyboard", price: 26 },
                    { id: 5, name: "Monitor", price: 299 },
                ]);
            }
            else {
                reject(new NetworkError("Failed to fetch product catalog"));
            }
        }, 1000); // 1 second delay//
    });
};
exports.fetchProductCatalog = fetchProductCatalog;
// Simulate fetching product reviews//
const fetchProductReviews = (productId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNumber = Math.random();
            if (randomNumber < 0.7) { // 70% success rate//
                console.log(`Got reviews for product ${productId}`);
                // faux reviews based on productId//
                const reviews = [
                    {
                        id: 1,
                        productId: productId,
                        rating: 5,
                        comment: "Excellent product!",
                        reviewer: "Jane Oaken",
                    },
                    {
                        id: 2,
                        productId: productId,
                        rating: 3.8,
                        comment: "Pretty good product. I've used better",
                        reviewer: "Jane"
                    }
                ];
                resolve(reviews);
            }
            else {
                console.log(`Could not get reviews for product ${productId}`);
                reject(new DataError(`Failed to fetch reviews for product ID ${productId}`));
            }
        }, 1500);
    });
};
exports.fetchProductReviews = fetchProductReviews;
// this function pretends to get sales data//
const fetchSalesReport = () => {
    return new Promise((resolve, reject) => {
        // wait 1 second//
        setTimeout(() => {
            const randomNumber = Math.random();
            // 75% success rate
            if (randomNumber < 0.75) {
                console.log("Got sales report");
                // make faux sales report//
                const report = {
                    totalSales: 125000,
                    unitsSold: 342,
                    averagePrice: 365.50
                };
                resolve(report);
            }
            else {
                console.log("Could not get sales report");
                reject(new NetworkError("Failed to fetch sales report"));
            }
        }, 1000);
    });
};
exports.fetchSalesReport = fetchSalesReport;
