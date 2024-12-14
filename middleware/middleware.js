exports.setUploadFilPath = (uploadPath) => {
  return (req, res, next) => {
    req.uploadPath = uploadPath;
    console.log(uploadPath, 'uploadpath');
    next();
  };
};
