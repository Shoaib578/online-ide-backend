const router = require('express').Router();
const { generateFile } = require("../../generate_files");
const { spawn, fork, spawnSync,exec,execFile} = require("child_process");
var fs = require('fs');
const path = require("path");




  

router.post("/generate_file",async(req,res)=>{
    let code = req.body.code;
    let language = req.body.language;
    let filename = req.body.filename
    
    await generateFile(language, code,filename);
    res.json({
        "msg":"success"
    })
 
})





router.get("/run_code",(req,res)=>{
    

    var error= []
    var output =[]
   
    let filepath = req.query.code_file
    let language = req.query.language
    let code;
    let execute;
    console.log(language)
    if(language == "bash"){
        code = req.query.code
    }

   
    if(language == "bash"){
        execute = exec(code)
        console.log("bash")

    }else{
    execute = spawn(language,[filepath])

    }

   

    execute.stderr.on('data', function(data) {
       console.log(data.toString())
       
        return error.push(data.toString())
        
    

   
  });

 execute.stdout.on('data',  (data) =>{
    
  output.push(data.toString())
    
  
 });


   execute.on('close', (code) => {
    console.log(error)
   
    res.send({
        "output":output,
        "error":error
    })
 });



   


   
    
})




module.exports = router