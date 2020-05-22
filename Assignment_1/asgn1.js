const csv=require('csvtojson')
const path = require("path");
const fs = require("fs");
const csvFilePath=path.join(__dirname,'customer-data.xls')

dd = ''
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
	console.log(jsonObj);
  fs.writeFileSync(
        path.join(__dirname, "customer-data.json"),
        JSON.stringify(jsonObj, null, 2),
        (error) => {
          if (error) return process.exit(1);
          console.log("done");
          process.exit(0);
        }
      );
})

// Async / await usage
module.exports = dd
