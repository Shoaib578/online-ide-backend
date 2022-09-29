const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));

const path = require('path')


const cors = require('cors');


const upload = require('express-fileupload')
app.use(express.static("public"));
app.use(upload())
app.use(cors());
app.use(express.json());


const code = require('./routes/apis/code')
app.use('/apis/code',code)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
