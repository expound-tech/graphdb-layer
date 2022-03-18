const edgedb = require("edgedb");

const client = edgedb.createClient();
const query = `select "Hello world!";`;

async function run(){
  const result = await client.query(query)
  console.log(result); // "Hello world!"
}

run();