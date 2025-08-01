/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const functions=require("firebase-functions");
const express=require("express");
const cors =require("cors");
const stripe=require("stripe")("sk_test_51Rklbc4cnDKyv5M0disonhSMBZyCyHpflaKCDfDhnwmgKdD9vtiVijGGdN2aKWYcEe6aIpir9cFSs9brY30bM4xS00wlOkzWUX");
// Setting up API

// --app config
const app=express();

// --Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// --API routes
app.get("/", (request, response)=> response.status(200).send
("hello world"));

//    app.get('/radhika',(request,response)=> response.status(200).send
//    ('hello Radhika'))

app.post("/payments/create", async (request, response)=>{
  const total=request.query.total;

  console.log("Payment Request Recieved BOOM!! for this amount >>>", total);

  const paymentIntent=await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  // OK - Created something
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// --Listen command
exports.api=functions.https.onRequest(app);

// example EndPoint
// http://127.0.0.1:5001/e-commerce-1c618/us-central1/api
// http://127.0.0.1:4000/
// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
