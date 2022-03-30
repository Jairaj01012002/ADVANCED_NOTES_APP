const express=require("express");
const cors=require("cors");
require("dotenv").config();
const client = require("./configs/db");
const res = require("express/lib/response");
const authroute=require("./Route/auth");
const cli = require("nodemon/lib/cli");
const app=express();
app.use(express.json());
app.use(cors());

//console.log(client);
const port=process.env.PORT||8000;
client.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to database!");
});

app.get('/',(req,res)=>
{
  res.status(200).send("server is up and running");
});


app.use("/auth",authroute);

app.listen(port,()=>
{
  console.log(`server is running at port:${port}`);
});