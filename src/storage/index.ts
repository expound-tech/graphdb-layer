import edgedbClient from './edgedb/client';

export default {
  query: async function (sql: string) {
  
    const result = await edgedbClient.query(sql)
    console.log(result); 
  }
}