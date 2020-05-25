const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb = require('mongodb')
const async = require('async')
const bodyParser = require('body-parser')

const url = 'mongodb://localhost:27017/'

const customers=require('./m3-customer-data.json')
const customerAddresses=require('./m3-customer-address-data.json')

let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
const limit=Number(process.argv[2]) || customers.length
let tasks=[]

mongodb.MongoClient.connect(url,(error,client)=>{
  if (error) return process.exit(1)
	console.log("successfully connected to mongodb")
	const customersCollection=client.db('test').collection("customers")

  const saveC =(data,callback)=>{
  			console.log(data.length)
  			customersCollection.insert(data,(error,results)=>{
  				callback(error,results)
  			})
  	}

  	customers.forEach((customer,index,list)=>{
  		customers[index]=Object.assign(customer,customerAddresses[index])

  		if(index % limit ===0)
  		{
  			const start=index;
  			const end = start+ limit < customers.length ? start + limit : customers.length;
  			console.log(`start ${start} and end ${end}`)
  			tasks.push((callback)=>saveC(customers.slice(start,end),callback))
  		}

  	})
  	console.log('launching tasks')
  	async.parallel(tasks, (error, results) => {
  					console.log('successfully executed tasks')
  			})




})
