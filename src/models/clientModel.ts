import client from "../types/clientType";
import db from "../database";
import bcrypt from 'bcrypt';
import config from "../utils/env.config";
class Client{

  public async getClient(client_id:string) : Promise<client | null>{
    try{
      const connection = await db.connect()
      const sql = `SELECT id, name, email, phone_number, city, street_address, points FROM client WHERE id = $1;`
      const result = await connection.query(sql, [client_id])
      connection.release()
      return result.rows[0]
    }catch(error){
      throw new Error((error as Error).message);
    }
  }

  public async updateClient(client: client) : Promise<client>{
    try{
      const connection = await db.connect()
      const sql = `ALTER TABLE client SET (name, email, phone_number, city, street_address, password)
                    = ($1, $2, $3, $4, $5, $6)
                    returning id;`
      const result = await connection.query(sql, [
        client.name,
        client.email,
        client.phone_number,
        client.city,
        client.street_address,
        bcrypt.hashSync(`${client.password}${config.SECRETHASHINGKEY}`, 10)
      ])
      connection.release()
      return result.rows[0]
    }catch(error){
      throw new Error((error as Error).message);
    }
  }
}
export default Client;