const express = require("express");
const app = express();

app.get("/payment",(req,res) => {
    res.render("payment/payment.ejs");
})