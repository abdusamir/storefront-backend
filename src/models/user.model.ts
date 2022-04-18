import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';


dotenv.config();
const salt_rounds= process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type User={
    id?:number;
    email?:string;
    firstName?:string;
    lastName?:string;
    password?:string;
};
export class UserStore { 
    async index():Promise<User[]>{
        try{
            const conn= await client.connect();
            const query= 'SELECT * FROM users';
            const result= await conn.query(query);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error('Could not get users from database');
        }
    }
    async show(id:number):Promise<User>{
        try{
            const conn= await client.connect();
            const query= 'SELECT * FROM users WHERE id = $1';
            const result= await conn.query(query,[id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Couldn't get user: ${id} from database`);
        }
    }
    async create(user: User): Promise<User>{
        try{
            const conn = await client.connect();
            const query= 'INSERT INTO users (email,first_name,last_name,password) VALUES ($1, $2, $3, $4)';
            const hash = bcrypt.hashSync((user.password as string)+(pepper as string), parseInt(salt_rounds as string));
            const result = await conn.query(query,[
                user.email,
                user.firstName,
                user.lastName,
                hash
            ]);
            conn.release();
            return result.rows[0];
        }catch (e) {
            throw new Error(`Couldn't insert user: ${user.firstName} into database ${e}`);
        }
    }
}