const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const port = 5000;


// Middleware
app.use(express.json());
app.use(cors());





// Create a connection to  database   
const DB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'client'
});

// Checking database conntection

DB.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1)
    } else {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`The App is Running at ${port}`);
        });

    }
});


app.post('/register', (request, response) => {
    try {
        const { firstName, lastName, userName, password } = request.body;

        // Check if the userName already exists
        const checkQuery = `SELECT id FROM client WHERE userName = ?`;
        DB.query(checkQuery, [userName], (checkError, checkResult) => {
            if (checkError) {
                response.status(500).json({ message: 'Internal Server Error' });
            } else if (checkResult.length > 0) {
                // If userName already exists, send a response
                response.status(409).json({ message: 'UserName already exists' });
            } else {
                // If userName doesn't exist, insert the data into the database
                const postQuery = `INSERT INTO client (firstName, lastname, userName, password) VALUES (?, ?, ?, ?)`;
                DB.query(postQuery, [firstName, lastName, userName, password], (error, result) => {
                    if (error) {
                        response.status(500).json({ message: 'Register Failed' });
                    } else {
                        response.json({ message: 'Register Successfully' });
                    }
                });
            }
        });
    } catch (error) {
        response.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/login', (request, response) => {
    try {
      const { userName, password } = request.body;
      const getQuery = `SELECT * FROM client WHERE userName = ? AND password = ?`;
      DB.query(getQuery, [userName, password], (error, results) => {
        if (error) {
          response.status(500).json({ message: 'Login Failed' });
        } else {
          if (results.length > 0) {
           
            const jwtToken = jwt.sign({ userName }, 'sateesh', { expiresIn: '1h' });
            response.json({ message: 'Login Successful', jwtToken });
          } else {
            response.status(401).json({ message: 'Invalid username or password' });
          }
        }
      });
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error' });
    }
  });


  app.post('/details',(request,response)=>{
   
    try{
        const {userName}=request.body
        getQuery=`SELECT * FROM client WHERE userName=?`
        DB.query(getQuery,[userName],(error,result)=>{
            if(error){
                response.status(500).json({message:'Failed to Get Details'})
            }else{
                response.send(result)
            }

        })
    }catch(error){
        response.status(500).json({message:'Internal Server Error'})
    }
  })