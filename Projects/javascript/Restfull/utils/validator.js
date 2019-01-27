module.exports ={
    user:(app,req, res)=>{

        req.assert('name', 'O nome é obrigatoório.').notEmpty();
        req.assert('email', 'O e-mail é obrigatoório.').notEmpty();

        let errors = req.validationErrors();

        if (errors) {
            app.utils.error.send(errors, req, res);
            return false;
        }else {
            return true;
        }

    }
};