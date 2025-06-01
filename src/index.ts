//where I use all of my API functions//
import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
  Network Error,
  Data Error,
} from "./apiSimulator";

//this function will retry if it fails//
//it uses a function that calls itself---or recursion//
const retryPromise = (functionToTry, howManyTries, waitTime) => {
  return new Promise((resolve, reject) => {
    //try to run function//
    functionToTry()
    .then(result => {
      //it worked so will send back result//
      resolve(result);
    })
    .catch(error => {
      if (howManyTries <=1) {
        //no more tries//
        console.log("No more tries left");
        reject(error);
      }else{
        console.log(`Trying again...${howManyTries-1}tries left`);

        setTimeout(() => {
          retryPromise(functionToTry, howManyTries - 1, waitTime);
          .then(resolve);
          .catch(reject);
        }, waitTime);
      }
        });
      });

    };
  
    //main function that runs all//
    const runDashboard = () => {
      console.log("Starting E-Commerce Dashboard");
      console.log("==============================\n");

      let allProduct = []; //save products here to use later//

      //step 1: get the products//
      console.log("Getting products...");

      retryPromise(fetchProductCatalog, 3, 2000)
      .then(products => {
        //got the products--save them and show them//
        allProducts = products;

        console.log("\n here are the products:");
        products.forEach(product => {
          console.log(` ${product.name} - $${product.price}`);
        });

        //step 2--get reviews for each product//
        console.log(`\nGetting reviews for each product...`);

        //make a list of promise (one for each product)
        const reviewsPromises = [];

        products.forEach(product => {
          //for each product, try to get its reviews//
          const reviewPromise = retryPromise(
            () => fetchProductReviews(product.id), 2, 1500)

            .then(reviews => {
              //got reviews--return them with the product//
              return {product: product, reviews: reviews};
            })
            .catch(error => {
              //couldn't get reviews for this product//
              console.log(`No reviews for ${product.name}`);
              return {product: product, reviews: []};
            
            });

            reviewPromise.push(reviewPromise);
          });
          //wait for all review promises to finish//
          return Promise.all(reviewPromises);
         })
         .then(productWithReviews => {
          //show all the reviews we got//
          console.log(`\n Product Reviews:`);

          productWithReviews.forEach(item =>{
            if(item.reviews.length > 0) {
              console.log(`\n ${item.product.name}:`);
              item.reviews.forEach(review => {
                console.log(` "${review.comment}" - ${review.reviewer}`);
              });
            }
          });

          //step 3 get the sales report//
          console.log("\mGetting sales report...");
          return retryPromise(fetchSalesReport, 3, 2000);
         })

         .then(salesReport => {
          //show the sales report//
          console.log("\nSales Report:");
          console.log(` Total Sales: $${salesReport.totalSales}`);
          console.log(` Units Sold: ${salesReport.unitsSold}`);
          console.log(` Average Price: $${salesReport.averagePrice}`);
         })

         .catch(error => {
          //something went wrong//
          console.log("\n something went wrong:");

          if(error instanceof NetworkError){
            console.log(" Network problem - check your internet");
          }else if (error instanceof DataError) {
            console.log(" Data problem - the API sent bad data");
          }else{
            console.log{" Unknown error:", error.message);

            }
          })
        .finally(() => {
          //this always runs at the end//
          console.log("\n Dashboard finished loading");
          console.log("========================\n");
        });
      };

      //run the dashboard//
      runDashboard();

        
      
  