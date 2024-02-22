const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.json());


app.get('/api/users', (req, res) => {
    const db = mysql.createConnection({
        host: 'db-service.db-frida.svc.cluster.local',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });
    
    db.connect((err) => {
        if (err) {
            console.error('Error al conectar a MySQL:', err);
        } else {
            console.log('Conexión exitosa a MySQL');
        }
    });
    
    db.query(
        "CREATE TABLE IF NOT EXISTS personas (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))",
        function (err, result) {
            if (err) throw err;
            console.log("tabla creada");
        }
    );
    db.query("SELECT * FROM personas", function (err, result) {
        if (err) throw err;
        res.status(200).send(result);
    });
});

app.post("/api/users", (req, res) => {
    const db = mysql.createConnection({
        host: 'db-service.db-frida.svc.cluster.local',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });
    
    db.connect((err) => {
        if (err) {
            console.error('Error al conectar a MySQL:', err);
        } else {
            console.log('Conexión exitosa a MySQL');
        }
    });
    
    db.query(
        "CREATE TABLE IF NOT EXISTS personas (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))",
        function (err, result) {
            if (err) throw err;
            console.log("tabla creada");
        }
    );
    const name = req.body.name;
    db.query(`INSERT INTO personas (name) VALUES ('${name}')`, function (err, result) {
        if (err) throw err;
        res.status(200).send("Registro insertado en la base de datos");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
