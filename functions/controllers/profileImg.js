const { upload } = require("../utils/upload");

exports.uploadController = async (req, res) => {
  const url = await upload(
    "profile",
    req.file.originalname,
    req.file.buffer,
    req.file.mimetype
  );

  if (!url){
    return res.status(400).send({ message: "Error Uploading" });
  }

  res.status(200).send(url);

};
