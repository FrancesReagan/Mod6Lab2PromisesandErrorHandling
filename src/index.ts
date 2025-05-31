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
    }