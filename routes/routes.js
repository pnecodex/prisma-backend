const CategoriesController = require('../controllers/controllers');
const { setUploadFilPath } = require('../middleware/middleware');
const { uploadFiles } = require('../services/multer');
const routes = (app) => {
  app.get('/api/all_categories', CategoriesController.index);
  app.post('/api/create_catalogue', setUploadFilPath('./public/uploads/catalogue'), uploadFiles.single('image'), CategoriesController.create);
};
module.exports = routes;
