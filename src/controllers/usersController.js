module.exports = {
    login : (req,res) =>{
        return res.render('login',{
            title : 'Iniciar Sesión'
        })},
    register : (req,res) =>{
        return res.render('register',{
            title : 'Crea Tu Cuenta'
        })
    }
}