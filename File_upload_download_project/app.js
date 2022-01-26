const express = require("express");
const fileupload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 3001

//middleware
app.use(fileupload());

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/upload", (req,res)=>{
    //checking if file is uploaded
    if (req.files && Object.keys(req.files).length !== 0){
        const uploadedfile = req.files.uploadFile
        console.log(uploadedfile);
        //upload path
        const uploadpath = __dirname + "/uploads/" + uploadedfile.name
        uploadedfile.mv(uploadpath, (err)=>{
            if(err){
                console.log(err)
                res.send("Failed")
            }else {
                res.send("File Uploaded Successfully");
            }
        })
    }else{
        res.send("No File Uploaded");
    }
});

app.get("/download", (req,res)=>{
    res.download(__dirname + "/download_test.txt", (err)=>{
        if(err){
            console.log(err);
        }
    });
});

app.listen(port, ()=>{
    console.log(`Server Started On ${port}.....`);
})