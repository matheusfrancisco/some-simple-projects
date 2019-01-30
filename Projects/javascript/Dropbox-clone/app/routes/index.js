var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/file', (req,res)=>{

  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtension: true
  });


  //receive fields e files 
  form.parse(req, (err, fields, files) => {

    let path = "./" + fields.path;

    if(fs.existsSync(fields.path)){

      fs.unlink(path, err=>{

        if(err){
          res.status(400).jsonp({
            err
          });
        } else {
          res.json({
            fields
          });
        }

      });
    }
    

  });
})

router.post('/upload', (req, res)=>{

  //using formidable for send files

  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtension:true
  });

  //receive fields e files 
  form.parse(req,(err, fields, files)=>{
    res.json({
      files
    });

  });

});

module.exports = router;
