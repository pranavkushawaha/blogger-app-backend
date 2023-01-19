const dotenv = require("dotenv")
dotenv.config()
const { MongoClient } = require('mongodb');
const mongodb = new MongoClient(process.env.CONNECTIONSTRING,{ useNewUrlParser: true, useUnifiedTopology: true });


async function main() {
  // Use connect method to connect to the server
  const client = await mongodb.connect();
  module.exports = client;
  const app = require("./app")
  // app.listen(process.env.PORT,process.env.HOST)
  app.listen(8000)
}

main()
  .then(console.log("Connected to DB."))
  .catch(console.error);

// mongodb.connect((err, client) {
//   if (err) {
//     console.log(err)
//   }
//   module.exports = client
//   const app = require("./app")
//   // app.listen(process.env.PORT,process.env.HOST)
//   app.listen(8000)
// })
