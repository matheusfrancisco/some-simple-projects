var express = require('express');
var router = express.Router();
var formidable = require('formidable');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
