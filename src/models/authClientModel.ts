import client from "../types/clientType";
import db from "../database";
import bcrypt from 'bcrypt';
import config from "../utils/env.config";
class AuthenticationClient{

  public async register(client: client): Promise<client | null>{
    try{
      const connection = await db.connect();
      const clientExist = await connection.query('SELECT id FROM client WHERE email = $1', [client.email]);
      if(clientExist.rows.length > 0){
        connection.release()
        return null;
      }
      const sql = `INSERT INTO client (name, email, password) 
                    values ($1, $2, $3) 
                    returning id, name, email;`
      const newClient = await connection.query(sql, [
        client.name,
        client.email,
        bcrypt.hashSync(`${client.password}${config.SECRETHASHINGKEY}`, 10)
      ])

      connection.release()
      return newClient.rows[0]
    }
    catch(error){
      throw new Error((error as Error).message);
    }
  }

  public async login(clinetEmail: string, clientPassword: string): Promise<client | null>{
      try{
        const connection = await db.connect();
        const sql = 'SELECT id, name ,email,password FROM client WHERE email = $1;';
        const result = await connection.query(sql, [clinetEmail]);
        if(result.rows.length > 0){
          const {id, name ,email,password} = result.rows[0];
          if(bcrypt.compareSync(`${clientPassword}${config.SECRETHASHINGKEY}`, password)){
            connection.release();
            const userInfo = {id:id, name:name, email:email};
            return userInfo;
          }
        }
        connection.release();
        return null;
      }catch(error){
        throw new Error((error as Error).message);
      }
  }    
}

export default AuthenticationClient;