import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
// import { Mutex } from 'async-mutex';
import cluster from "cluster";
import os from "os";

const totalcpus = os.cpus().length
if (cluster.isPrimary) {
    for (let i = 0; i < totalcpus; i++) {
        cluster.fork();
    }
    cluster.on("exit", () => {
        cluster.fork()
    })
} else {


const app = express();
// const mutex = new Mutex();
app.use(express.json())
app.use(cors())

const user = new mongoose.Schema({
  count: {
    type: Number,
  }
}, {
  timestamps: true
})

const Users = mongoose.model("user", user)

const user2 = new mongoose.Schema({
  name: {
    type: String,
  }
})

const User2 = mongoose.model("user2", user2)




var t = 0;
app.get("/test", async (req, res) => {
  try {
    // const release = await mutex.acquire();
    console.log(process.id)


    const time = Date.now();
    console.log("-------->", time)
    const a = Math.floor(Math.random() * 100)


    let read = await Users.findById("6600862851be665eabbd8b81");

    // console.log("fkkf", Date.now(), read, a)
    const result = await Users.findByIdAndUpdate("6600862851be665eabbd8b81", {

     count:read.count+1
    })
    console.log(Date.now(result.updatedAt) - time, result.count, a)
    // release()
    return res.status(200).json({
      s: true
    })

  } catch (error) {
    return res.status(500).json({
      success: false
    })
  }
})












app.listen(8001, async () => {
  try {
    console.log("hsfhsfe")
    await mongoose.connect("mongodb+srv://devdatabaseuser:P6NWVIwPcxZFEHrx@cluster0.5s8l8uw.mongodb.net/virusnoob")

  } catch (error) {

  }
}) 
}