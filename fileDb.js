import config from './config.js';
import Postgres from 'pg';

const sql = new Postgres.Client(config);

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});

sql.connect();

// working SQL functions
export async function listContent() {
  const q = 'select file_name, file_similarity, similar_file from file_data;';
  const result = await sql.query(q);
  return result.rows;
}

export async function returnPaths() {
  const q = 'select file_path, file_name from file_data;';
  const result = await sql.query(q);
  return result.rows;
}


export async function addContent(input) {
  const q = 'insert into file_data (file_name, file_path, file_similarity, similar_file) values ($1, $2, $3, $4);';
  await sql.query(q, [input[0], input[1], input[2], input[3]]);
}


// console.log(await returnPaths());
