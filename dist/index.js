"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// where I use all of my API functions//
const apiSimulator_1 = require("./apiSimulator");
// this function will retry if it fails//
// it uses a function that calls itself---or recursion//
const retryPromise = (functionToTry, howManyTries, waitTime) => {
    return new Promise((resolve, reject) => {
        // try to run function//
        functionToTry()
            .then(result => {
            // it worked so will send back result//
            resolve(result);
        })
            .catch(error => {
            if (howManyTries <= 1) {
                // no more tries
                console.log("No more tries left");
                reject(error);
            }
            else {
                console.log(`Trying again...${howManyTries - 1} tries left`);
                setTimeout(() => {
                    retryPromise(functionToTry, howManyTries - 1, waitTime)
                        .then(resolve)
                        .catch(reject);
                }, waitTime);
            }
        });
    });
};
// main function that runs all//
const runDashboard = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting E-Commerce Dashboard");
    console.log("==============================\n");
    try {
        // step 1: get the products//
        console.log("Getting products...");
        const products = yield retryPromise(apiSimulator_1.fetchProductCatalog, 3, 2000);
        // got the products--show them//
        console.log("\nHere are the products:");
        products.forEach(product => {
            console.log(` ${product.name} - $${product.price}`);
        });
        // step 2--get reviews for each product//
        console.log(`\nGetting reviews for each product...`);
        // make a list of promises (one for each product)//
        const reviewPromises = products.map(product => {
            // for each product, try to get its reviews//
            return retryPromise(() => (0, apiSimulator_1.fetchProductReviews)(product.id), 2, 1500)
                .then(reviews => {
                // got reviews--return them with the product//
                return { product: product, reviews: reviews };
            })
                .catch(error => {
                // couldn't get reviews for this product//
                console.log(`No reviews for ${product.name}`);
                return { product: product, reviews: [] };
            });
        });
        // wait for all review promises to finish//
        const productWithReviews = yield Promise.all(reviewPromises);
        // show all the reviews we got//
        console.log(`\nProduct Reviews:`);
        productWithReviews.forEach(item => {
            if (item.reviews.length > 0) {
                console.log(`\n ${item.product.name}:`);
                item.reviews.forEach(review => {
                    console.log(` "${review.comment}" - ${review.reviewer}`);
                });
            }
        });
        // step 3 get the sales report//
        console.log("\nGetting sales report...");
        const salesReport = yield retryPromise(apiSimulator_1.fetchSalesReport, 3, 2000);
        // show the sales report//
        console.log("\nSales Report:");
        console.log(` Total Sales: $${salesReport.totalSales}`);
        console.log(` Units Sold: ${salesReport.unitsSold}`);
        console.log(` Average Price: $${salesReport.averagePrice}`);
    }
    catch (error) {
        // something went wrong//
        console.log("\nSomething went wrong:");
        if (error instanceof apiSimulator_1.NetworkError) {
            console.log(" Network problem - check your internet");
        }
        else if (error instanceof apiSimulator_1.DataError) {
            console.log(" Data problem - the API sent bad data");
        }
        else {
            console.log(" Unknown error:", error.message);
        }
    }
    finally {
        // this always runs at the end//
        console.log("\nDashboard finished loading");
        console.log("========================\n");
    }
});
// run the dashboard//
runDashboard();
