// custom error classes//
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class DataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataError";
  }
}

// type definitions for the data structure//
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Review {
  id: number;
  productId: number;
  rating: number;
  comment: string;
  reviewer: string;
}

export interface SalesReport {
  totalSales: number;
  unitsSold: number;
  averagePrice: number;
}

// simulate fetching product catalog//
export const fetchProductCatalog = (): Promise<Product[]> => {
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
      } else {
        reject(new NetworkError("Failed to fetch product catalog"));
      }
    }, 1000); // 1 second delay//
  });
};

// Simulate fetching product reviews//
export const fetchProductReviews = (productId: number): Promise<Review[]> => {
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
      } else {
        console.log(`Could not get reviews for product ${productId}`);
        reject(new DataError(`Failed to fetch reviews for product ID ${productId}`));
      }
    }, 1500);
  });
};

// this function pretends to get sales data//
export const fetchSalesReport = (): Promise<SalesReport> => {
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
      } else {
        console.log("Could not get sales report");
        reject(new NetworkError("Failed to fetch sales report"));
      }
    }, 1000);
  });
};