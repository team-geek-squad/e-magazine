import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page } from "react-pdf";
// import samplePDF from "../sample.pdf";
import axios from "axios";

import classes from "./NewspaperView.module.css";
import { useState, useEffect, useRef } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import Page from "../assets/page.jpg";

const NewspaperView = () => {
  const [numPages, setNumPages] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [magazineData, setmagazineData] = useState(null);
  // const [pageNumbers, setpageNumbers] = useState([]);
  const pageIds = Array.from(Array(numPages - 1 + 1).keys()).map((i) => i + 1);

  const flipbook = useRef();

  const fetchPDF = async (magazine) => {
    const pdfResponce = await axios.get(magazine.downloadURL, {
      responseType: "arraybuffer",
    });
    setPdfData(pdfResponce);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/magazine/get-latest"
      );
      setmagazineData(response.data);
      console.log(magazineData);

      // setpageNumbers(pageIds);
      // console.log(pageNumbers);

      return response.data;
    };

    fetchData().then((res) => {
      console.log(res);
      fetchPDF(res);
    });
  }, []);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    console.log("Number of pages:", numPages);
    setNumPages(numPages);
  };

  return (
    <div>
      <p className={classes.tagline}>Read the latest Rathnadeepa Online</p>
      {pdfData ? (
        <div className={classes.viewSection}>
          <Document file={pdfData} onLoadSuccess={handleDocumentLoadSuccess}>
            <HTMLFlipBook
              className={classes.book}
              width={500}
              ref={flipbook}
              height={700}
              showCover={true}
              autoSize={true}
            >
              {pageIds &&
                pageIds.map((page) => (
                  <div key={page} className={classes.demoPage}>
                    <Page
                      pageNumber={page}
                      width={500}
                      renderTextLayer={false}
                    />
                  </div>
                ))}
            </HTMLFlipBook>
          </Document>
          <div className={classes.buttonBoard}>
            <button
              onClick={() => flipbook.current.pageFlip().flipPrev()}
              className={classes.button}
            >
              <span class="material-symbols-outlined">navigate_before</span>
            </button>
            <button
              onClick={() => flipbook.current.pageFlip().flipNext()}
              className={classes.button}
            >
              <span class="material-symbols-outlined">zoom_out</span>
            </button>
            <button
              onClick={() => flipbook.current.pageFlip().flipNext()}
              className={classes.button}
            >
              <span class="material-symbols-outlined">zoom_in</span>
            </button>
            <button
              onClick={() => flipbook.current.pageFlip().flipNext()}
              className={classes.button}
            >
              <span class="material-symbols-outlined">navigate_next</span>
            </button>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default NewspaperView;
