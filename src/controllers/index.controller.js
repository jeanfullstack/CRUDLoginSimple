const indexCtrl = {}; //Creacion del objeto con dos funciones

indexCtrl.renderIndex = (req, res) => {
    res.render('index');
};


indexCtrl.renderAbout = (req, res) => {
    res.render('about');
};


module.exports = indexCtrl;