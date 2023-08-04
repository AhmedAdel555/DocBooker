import doctor from "../types/doctorType"; 
import searchParameters from "../types/searchParametersType";
import db from "../database";
class Search{

  public async searchForDoctor(searchParameters: searchParameters): Promise<doctor[]>{
        try{
          const connection = await db.connect()
          const [sql , params] = this.sqlSearchQuery(searchParameters); 
          const result = await connection.query(sql, params);
          connection.release();
          return result.rows;
        }catch(err){
          throw new Error((err as Error).message);
        }
  }

  private sqlSearchQuery(searchParameters: searchParameters) : [string, string[]]{
      let sql = `SELECT DISTINCT(doc_id) , name, main_specialization, description, gender, rate 
                FROM doctor join entity on doctor.id = entity.doc_id
                WHERE 1 = 1`
      const params:string[] = [];
      for(let [key, value] of Object.entries(searchParameters)){
        if(value){
          sql += ` AND ${key} = $${params.length+1}`;
          if(key === 'name'){
            params.push(`%${name}%`);
            continue;
          }
          params.push(value);
        }
      }
      return [sql , params];
  } 
}
export default Search;