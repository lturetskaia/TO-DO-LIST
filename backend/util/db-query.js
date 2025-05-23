import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// DB Connection
const connection = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getAllProjects() {
  const result = await connection.query("SELECT * FROM projects");
  return result[0];
}

export async function getAllTasks() {
  const result = await connection.query("SELECT * FROM tasks");
  return result[0];
}

export async function getTask(id) {
  const result = await connection.query("SELECT * FROM tasks where id=?", [id]);
  return result[0];
}

export async function createProject({ name, description }) {
  const result = await connection.query(
    "INSERT INTO projects (name, description) VALUES (?, ?)",
    [name, description]
  );

  return result[0];
}

export async function createTask({ name, date, status, project_id }) {
  const result = await connection.query(
    "INSERT INTO tasks (name, date, status, project_id) VALUES (?, ?, ?, ?)",
    [name, date, status, project_id]
  );

  return result[0];
}

export async function updateTaskStatus(id, status) {
  const result = await connection.query(
    "UPDATE tasks SET status=? WHERE id=?",
    [status, id]
  );

  return result[0];
}

export async function updateProject(id, name, description) {
  const result = await connection.query(
    "UPDATE projects SET name=?, description=? WHERE id=?",
    [name, description, id]
  );

  return result[0];
}

export async function deleteItem(id, table) {
  const result = await connection.query(`DELETE FROM ${table} WHERE id=?`, [
    id,
  ]);

  return result[0];
}

export async function deleteAllTasks(project_id) {
  const result = await connection.query(
    `DELETE FROM tasks WHERE project_id=?`,
    [project_id]
  );

  return result[0];
}
