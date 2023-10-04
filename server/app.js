require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const auth = require("./middleware/auth");

const signup = require('./apis/signup');
var login = require('./apis/login');
const account_info = require('./apis/account_info');
const logout = require('./apis/logout');

var summary = require('./apis/summary');
var new_admissions = require('./apis/new_admissions');
var recent_fees = require('./apis/recent_fees');
var pending_fees = require('./apis/pending_fees');
var display_picture = require('./apis/display_picture');
var batches = require('./apis/batches');
var batch = require('./apis/batch');
var students = require('./apis/students');
var student = require('./apis/student');
var fees = require('./apis/fees');

const add_batch = require('./apis/add_batch');
const add_student = require('./apis/add_student');





const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../client/build')))



const port = process.env.API_PORT;

app.post("/api/login", login.post);
app.post("/api/signup", signup.post);
app.get("/api/account-info", auth, account_info.get);
app.get("/api/logout", logout.get);


app.get("/api/batches", auth, batches.get);
app.get("/api/batch", auth, batch.get);
app.get("/api/students", auth, students.get);
app.get("/api/student", auth, student.get);
app.get("/api/fees", auth, fees.get);


app.get("/api/summary", auth, summary.get);
app.get("/api/new-admissions", auth, new_admissions.get);
app.get("/api/recent-fees", auth, recent_fees.get);
app.get("/api/pending-fees", auth, pending_fees.get);
app.get("/api/dp", auth, display_picture.get);

app.post("/api/add-batch", auth, add_batch.post);
app.post("/api/add-student", auth, add_student.post);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(port, () => {
    console.log("Server Listening on PORT: ", port);
});

