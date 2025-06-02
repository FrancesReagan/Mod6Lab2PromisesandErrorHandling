<img width="1283" alt="image" src="https://github.com/user-attachments/assets/84873070-73b1-4492-a3fd-e28b0bb730cb" />

How to Run the E-Commerce Dashboard Program
Prerequisites

Make sure you have Node.js installed on your computer (you can check by running node --version in your terminal).
Make sure you have npm installed (comes with Node.js, check with npm --version).

Setup Instructions:

Create the project folder structure:
my-ecommerce-dashboard/
*src/
    *apiSimulator.ts
    *index.ts
*package.json
*tsconfig.json

Copy the code files:
*Put the fixed apiSimulator.ts code in the src/ folder.
*Put the fixed index.ts code in the src/ folder.
*Put the tsconfig.json file in the root folder.
*Put the package.json file in the root folder.

Open your terminal/command prompt and navigate to your project folder:
  bashcd path/to/my-ecommerce-dashboard

Install the dependencies:
  bashnpm install
(This will install TypeScript and the Node.js types needed for the project.)

Build the TypeScript code:
  bashnpm run build
(This compiles your TypeScript files into JavaScript files in a dist/ folder.)

Run the program:
  bashnpm start

-----------------------------
What to Expect
The program will start running and you'll see output in your terminal showing:

*Products being fetched (with possible retries if they fail).
*Product reviews being fetched.
*Sales report being generated.
*All the data displayed in a formatted way.

Since the APIs randomly fail (to simulate real-world conditions), you might see messages like:
---"Trying again...2 tries left".
--"No reviews for Mouse" (if fetching reviews failed after retries).
--"Network problem - check your internet" (if everything fails).

Quick Commands Summary:
  bash# One-time setup
  npm install

# Every time you want to run it:
  npm run build
  npm start

# Or use the shortcut that does both:
  npm run dev
  Troubleshooting

If you get "command not found" errors, make sure Node.js and npm are installed.
If you get TypeScript errors, make sure all files are in the correct folders.
If the build fails, check that your src/ folder exists with both .ts files inside.
The program might show different results each time due to the random success/failure simulation.

------- Answers to project questions--------------
Why is it important to handle errors for each individual API call rather than just at the end of the promise chain?

When you only handle errors at the end, you lose important information about what specifically failed.
If I have three API calls and only use one .catch() at the end, I can't tell if the product catalog failed, 
the reviews failed, or the sales report failed.

Handling errors individually lets me:
  *Provide specific error messages - "Failed to load reviews" vs "Failed to load sales data".
  *Continue with partial functionality - If reviews fail, I can still show products and sales.
  *Debug more efficiently - I know exactly which API is having issues.
  *Implement different retry strategies - Some calls might need more retries than others.
Without individual error handling, one failed API call can crash the entire dashboard even if the other APIs are working fine.
-----------------------------------
How does using custom error classes improve debugging and error identification?

Custom error classes let you categorize different types of failures. Instead of all errors being generic 
error objects, you can distinguish between:
  *NetworkError - Connection issues, timeouts, server unavailable.
  *DataError - Invalid response format, missing fields, corrupted data.

This helps because:
  *Different errors need different responses - network errors might warrant a retry, data errors might need validation.
  *Better logging and monitoring - You can track patterns like "NetworkErrors spike during peak hours".
  *More targeted error messages - "Check your connection" vs "Invalid data received".
  *Easier debugging - You can filter logs by error type to find specific issues.
-------------------------------------
When might a retry mechanism be more effective than an immediate failure response?

Retry mechanisms work best for temporary, transient failures but are wasteful for 
permanent problems. Good candidates for retries:
  *Network timeouts or intermittent connectivity.
  *Server temporarily overloaded (503 errors).
  *Rate limiting (429 errors).
  *Temporary database locks.

Bad candidates for retries:
  *Authentication failures (401/403 errors).
  *Invalid endpoints (404 errors).
  *Malformed requests (400 errors).
  *Server crashes (500 errors that persist).

Retries improve user experience by handling small network issues automatically, but they need to have limits to avoid overusing
resources on permanent failures. Identifying which errors are likely to resolve themselves vs. which indicate real problems is crucial 
for any developer's code.

Acknowledgements: Per Scholas instructors: Abraham Tavrez and Colton Wright and my fellow 2025-RT-23 cohort members; 
https://www.webdevtutor.net/blog/typescript-admin-dashboard
https://www.webdevtutor.net/blog/typescript-try-catch-return-promise#google_vignette
https://medium.com/@saeedkargosha/writing-a-promise-from-scratch-in-typescript-7dc8b7ed64a9
and for later development: https://dev.to/jamesoyanna/developing-a-fullstack-e-commerce-application-with-typescript-4ni6
