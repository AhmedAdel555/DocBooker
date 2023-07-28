import doctor from "../types/doctorType"; 
import db from "../database";
class Search{

  public async searchForDoctor(specilization:string, state:string, city:string, name:string): Promise<doctor[]>{
        try{
          const connection = await db.connect()
          let sql = `SELECT DISTINCT(doc_id) , name, main_specialization, description, gender, rate 
                      FROM doctor join entity on doctor.id = entity.doc_id
                      WHERE 1 = 1`
          const params = [];
          if (specilization){
            sql += ` AND main_specialization = $${params.length+1}`;
            params.push(specilization);
          }
          if (state){
            sql += ` AND state = $${params.length+1}`;
            params.push(state);
          }
          if (city){
            sql += ` AND city = $${params.length+1}`;
            params.push(city);
          }
          if (name){
            sql += ` AND name like $${params.length+1}`;
            params.push(`%${name}%`);
          }
          const result = await connection.query(sql, params);
          connection.release();
          return result.rows;
        }catch(err){
          throw new Error((err as Error).message);
        }
  }
}
export default Search;