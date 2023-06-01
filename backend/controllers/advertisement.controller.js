const { ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const Magazine = require("../models/magazine.model");
const {storage} = require("../config/firebase.config");
const Advertisement = require("../models/advertisement.model");

const updateAdvertisement = async (req, res) => {
    const file = req.file;
    const {position, viewSize} = req.body;
    const oldAdvertisement = await Advertisement.findOne({position: position, viewSize: viewSize});
    const oldFileRef = storage.refFromURL(oldAdvertisement.downloadURL);

    const fileRef = ref(storage, `advertisement/${position + "-" + viewSize + "-" + file.originalname}`);
  
    // Delete the file using the delete() method
    oldFileRef.delete().then( async function () {
        // File deleted successfully
        console.log("File Deleted");

        await uploadBytesResumable(fileRef, file.buffer, metadata).then(async (snapshot) => {
            console.log('Uploaded a blob or file!');
            await getDownloadURL(fileRef).then(async (url) => {
              console.log(url);
      
              const advertisement = Advertisement.findOneAndUpdate({position: position, viewSize: viewSize}, {downloadURL: url});
              res.status(200).json(advertisement);
            });
          });


    }).catch(function (error) {
        // Some Error occurred
    });    
  }

const removeAdvertisement = async (req, res) => {
    const {position, viewSize, placeHolderURL} = req.body;

    const oldAdvertisement = await Advertisement.findOne({position: position, viewSize: viewSize});
    const oldFileRef = storage.refFromURL(oldAdvertisement.downloadURL);
    
    oldFileRef.delete().then(async function () {
        const advertisement = Advertisement.findOneAndUpdate({position: position, viewSize: viewSize}, {downloadURL: placeHolderURL});

    })
}

const getAdvertisement = async (req, res) => {
    try {
        const { position, viewSize } = req.body;
        const advertisement = await Advertisement.findOne({position: position, viewSize: viewSize});
        res.status(200).json(advertisement);
    }catch (e) {
        console.log(e);
    }
}