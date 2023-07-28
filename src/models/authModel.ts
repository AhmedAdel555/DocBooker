import client from "../types/clientType";
import Client from './clientModel';
import db from "../database";
import bcrypt from 'bcrypt';

class Authentication {

    public async login(clinetEmail: string, clientPassword: string): Promise<client | null>{
        try{
          const connection = await db.connect();
          const sql = 'SELECT id, name ,email,password FROM client WHERE email = $1;';
          const result = await connection.query(sql, [clinetEmail]);
          if(result.rows.length > 0){
            const {id, name ,email,password} = result.rows[0];
            if(bcrypt.compareSync(clientPassword , password)){
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

    public async register(client: client): Promise<client | null>{
      try{
        const connection = await db.connect();
        const clientInfo = await connection.query('SELECT id FROM client WHERE email = $1', [client.email]);
        if(clientInfo.rows.length > 0){
          connection.release()
          return null;
        }
        connection.release()
        const clientInstance = new Client();
        const newClient = await clientInstance.addClient(client);
        return newClient;
      }
      catch(error){
        throw new Error((error as Error).message);
      }
    }

    public async clientExist(email: string): Promise<client | null>{
      try{
        const connection = await db.connect();
        const clientInfo = await connection.query('SELECT id, name, email FROM client WHERE email = $1', [email]);
        if(clientInfo.rows.length > 0){
          connection.release()
          return clientInfo.rows[0];
        }
        connection.release()
        return null;
      }
      catch(error){
        throw new Error((error as Error).message);
      }
    }
}

export default Authentication;