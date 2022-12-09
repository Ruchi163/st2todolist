const express=require("express");

const app=express();
const mysql=require('mysql');
const bodyParser=require("body-parser");

const cors=require("cors");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', /* MySQL User */
    password: '', /* MySQL Password */
    database: 'todo_list' /* MySQL Database */
  });

  db.connect((err) =>{
    // if(err) throw err;
    console.log('Mysql Connected with App...');
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get",(req,res)=>{
    const sqlGet="SELECT * FROM todolist_db";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    });
});

app.post("/api/post",(req,res)=>{
  const {name,topic}=req.body;
  const sqlInsert="INSERT INTO todolist_db (name ,topic) VALUES (?,?)";
  db.query(sqlInsert,[name,topic],(error,result)=>{
    if(error) console.log(error);
  });
});


app.delete("/api/remove/:id",(req,res)=>{
  const {id}=req.params;
  const sqlRemove="DELETE FROM todolist_db WHERE id=?";
  db.query(sqlRemove,id,(error,result)=>{
    if(error) console.log(error);
  });
});

app.get("/api/get/:id",(req,res)=>{
  const{id}=req.params;
  const sqlGet="SELECT * FROM todolist_db WHERE id =?";
  db.query(sqlGet,id,(error,result)=>{
      res.send(result);
  });
});

app.put("/api/update/:id",(req,res)=>{
  const{id}=req.params;
  const{name,topic}=req.body;
  const sqlUpdate="UPDATE todolist_db SET name=?,topic=? WHERE id=?";
  db.query(sqlUpdate,[name,topic,id],(error,result)=>{
    if(error) console.log("Error found");
      res.send(result);
  });
});



app.get("/",(req,res)=>{
    // const sqlInsert="INSERT INTO contact_db (name ,email,contact) VALUES ('John','abc@gmail.com','1234567890')";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log("error",error);
    //     console.log("result",result);
    //     res.send("Hello world");
    // });
    
})










app.listen (3000, () => {
console.log("Server is running on port 3000");
})
