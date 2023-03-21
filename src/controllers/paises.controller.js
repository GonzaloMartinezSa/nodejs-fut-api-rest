import { pool } from "../db.js";
import { getAll, get, delet } from "../crud/crud.js";

const table_name = "Pais";
const id_name = "id_pais";

export const getPaises = async (req, res) => {
  return getAll(res, table_name);
};

export const getPais = async (req, res) => {
  const { id } = req.params;
  return get(res, table_name, id_name, id);
};

export const deletePais = async (req, res) => {
  const { id } = req.params;
  return delet(res, table_name, id_name, id);
};

export const createPais = async (req, res) => {
  try {
    const { tipo } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Carta (tipo) VALUES (?)", [tipo]
    );
    res.status(201).json({ id: rows.insertId, tipo });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePais = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.body;

    const [result] = await pool.query(
      "UPDATE tipo SET tipo = IFNULL(?, tipo) WHERE id_tipo = ?",
      [tipo, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Tipo not found" });

    const [rows] = await pool.query("SELECT * FROM tipo WHERE id_tipo = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
