import { useState, useEffect } from "react";
import axios from "axios";

import classes from "./NewspaperView.module.css";

const DearFlipFlipbook = () => {
  const [pdfData, setPdfData] = useState(null);
  const [magazineData, setmagazineData] = useState(null);

  const fetchPDF = async (magazine) => {
    const pdfResponce = await axios.get(magazine.downloadURL, {
      responseType: "arraybuffer",
    });
    console.log(pdfResponce);
    setPdfData(pdfResponce);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://mag-backend2.onrender.com/magazine/get-latest"
      );
      setmagazineData(response.data);
      //   console.log(magazineData);

      return response.data;
    };

    fetchData().then((res) => {
      //   console.log(res);
      fetchPDF(res);
    });
  }, []);

  return (
    <div>
      <p className={classes.tagline}>Read the latest Rathnadeepa Online</p>
      <div
        className="_df_book"
        height="500"
        webgl="true"
        backgroundcolor="teal"
        source={pdfData}
        id="df_manual_book"
      ></div>
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
              <script src="../dflip/js/libs/jquery.min.js" type="text/javascript"></script>
              <script src="../dflip/js/dflip.min.js" type="text/javascript"></script>
            `,
        }}
      /> */}
    </div>
  );
};

export default DearFlipFlipbook;
