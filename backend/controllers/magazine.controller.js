const { ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const Magazine = require("../models/magazine.model");
const {storage} = require("../config/firebase.config");


const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}

const uploadFileToFirebaseStorage = async (file) => {
  const dateTime = giveCurrentDateTime();
  const fileRef = ref(storage, `documents/${dateTime + "-" + file.originalname}`);

  const metadata = {
    contentType: file.mimetype,
   };

  await uploadBytesResumable(fileRef, file.buffer, metadata).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    getDownloadURL(fileRef).then((url) => {
      console.log(url);
    });
  });
}

const getLatest = async (req, res) => {
  try {
    const magazines = await Magazine.find({}).sort({ createdAt: -1 }).limit(1);
  
    res.status(200).json(vehicles);
  } catch (err) {
    console.log(err);
  }
}

const getOldVersions = async (req, res) => {
  try {
    const magazines = await Magazine.find({}).sort({ createdAt: -1 }).skip(1);
  
    res.status(200).json(vehicles);
  } catch (err) {
    console.log(err);
  }
}

const submitMagazine = async (req, res) => {
  try {
    const { title, version } = req.body;
    const file = req.file;

    const dateTime = giveCurrentDateTime();
    const fileRef = ref(storage, `documents/${dateTime + "-" + file.originalname}`);

    const metadata = {
      contentType: file.mimetype,
    };

    await uploadBytesResumable(fileRef, file.buffer, metadata).then(async (snapshot) => {
      console.log('Uploaded a blob or file!');
      await getDownloadURL(fileRef).then(async (url) => {
        console.log(url);
        // downloadUrl = url;

        const magazine = await Magazine.create({
          title,
          version,
          downloadURL: url
        });
        res.status(200).json(magazine);
      });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error.' });
  }
}


module.exports = {submitMagazine, getLatest, getOldVersions};