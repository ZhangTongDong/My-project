var mongoose = require('mongoose');
var Catetory = mongoose.model('Catetory');

// admin new page
exports.new = function(req, res) {

  res.render('catetoryAdmin', {
    title: '后台分类录入页',
    catetory: {}
  })
};

// admin post movie
exports.save = function(req, res) {
  var _catetory = req.body.catetory;
  var catetory = new Catetory(_catetory);

  catetory.save(function(err, catetory) {
    if (err) {
      console.log(err)
    }

    res.redirect('/admin/catetory/list')
  })
};

// catelist page
exports.list = function(req, res) {
  Catetory.fetch(function(err, catetories) {
    if (err) {
      console.log(err)
    }

    res.render('catetorylist', {
      title: '分类列表页',
      catetories: catetories
    })
  })
};