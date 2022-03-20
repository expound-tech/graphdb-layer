import edgedbClient from './edgedb/client';

export default {
  query: async (sql: string) => {
  
    const result = await edgedbClient.query(sql)
    return result
  }
}