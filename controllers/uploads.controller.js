const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const ObjectId = require("mongoose").Types.ObjectId;
const path = require("path");
const fs = require("fs");

const { updateImage } = require("../helpers/updateImage");

const uploadFile = async (req, res = response) => {
  try {
    const id = req.params.id;
    const collection = req.params.collection;

    // validar mongoID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        ok: false,
        msg: "El id no es válido.",
      });
    }

    // Validar tipos
    const validCollections = ["users", "doctors", "hospitals"];

    if (!validCollections.includes(collection)) {
      return res.status(400).json({
        ok: false,
        msg: "La subida de imágenes sólo está disponible para users, doctors y hospitals.",
      });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "No se seleccionó ningún archivo.",
      });
    }

    //Procesar image
    const file = req.files.image;
    const filenameShort = file.name.split(".");
    const extension = filenameShort[filenameShort.length - 1];
    const validExtensions = ["png", "jpg", "jpeg", "gif"];
    //validar extension
    if (!validExtensions.includes(extension)) {
      return res.status(400).json({
        ok: false,
        msg: "La imagen no tiene un formato permitido. Debe ser jpg, jpeg, png o gif.",
      });
    }

    // generar nombre imagen unico.
    const filename = `${uuidv4()}.${extension}`;

    //path para guardar image
    const path = `./uploads/${collection}/${filename}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          msg: "Error inesperado al guardar la imagen en el servidor.",
        });
      }
      //actualizar base de datos
      updateImage(collection, id, filename);
      res.json({
        ok: true,
        results: "Archivo subido",
        filename,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado.",
    });
  }
};

const getImage = (req, res = response) => {
  const collection = req.params.collection;
  const image = req.params.image;

  const pathImg = path.join(__dirname, `../uploads/${collection}/${image}`);

  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    //default image for error
    const noImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(noImg);
  }
};

module.exports = {
  uploadFile,
  getImage,
};
