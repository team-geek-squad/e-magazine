import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page } from "react-pdf";
// import samplePDF from "../sample.pdf";
import axios from "axios";

import classes from "./NewspaperView.module.css";
import { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import Page from "../assets/page.jpg";

const NewspaperView = () => {
  const pageWidth = 450;
  const pageHeight = pageWidth * 1.414;

  const [numPages, setNumPages] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [magazineData, setmagazineData] = useState(null);
  const [flipToPage, setFlipToPage] = useState(0);
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
        "https://mag-backend2.onrender.com/magazine/get-latest"
      );
      setmagazineData(response.data);
      console.log(magazineData);

      // setpageNumbers(pageIds);

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
        <Document file={pdfData} onLoadSuccess={handleDocumentLoadSuccess}>
          <div className={classes.viewSection}>
            <HTMLFlipBook
              className={classes.book}
              width={pageWidth}
              ref={flipbook}
              height={pageHeight}
              showCover={true}
              autoSize={true}
              useMouseEvents={false}
            >
              {pageIds &&
                pageIds.map((page) => (
                  <div key={page} className={classes.demoPage}>
                    <TransformWrapper>
                      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <>
                          <TransformComponent>
                            <div className={classes.page}>
                              <Page
                                pageNumber={page}
                                width={pageWidth}
                                renderTextLayer={false}
                              />
                            </div>
                          </TransformComponent>
                          <div className={classes.zoomButtonBoard}>
                            <button
                              onClick={() => zoomOut()}
                              className={classes.button}
                            >
                              <span
                                class={`material-symbols-outlined ${classes.zoomIcons}`}
                              >
                                zoom_out
                              </span>
                            </button>
                            <button
                              onClick={() => resetTransform()}
                              className={classes.button}
                            >
                              <p className={classes.resetText}>reset</p>
                            </button>
                            <button
                              onClick={() => zoomIn()}
                              className={classes.button}
                            >
                              <span
                                class={`material-symbols-outlined ${classes.zoomIcons}`}
                              >
                                zoom_in
                              </span>
                            </button>
                          </div>
                        </>
                      )}
                    </TransformWrapper>
                  </div>
                ))}
            </HTMLFlipBook>
          </div>
          <div className={classes.buttonBoard}>
            <button
              onClick={() => flipbook.current.pageFlip().flipPrev()}
              className={classes.button}
            >
              <span class="material-symbols-outlined">navigate_before</span>
              <p className={classes.pageFlipBtnText}>previous page</p>
            </button>
            <div className={classes.flipToPageDiv}>
              <input
                type="number"
                onChange={(e) => setFlipToPage(e.target.value)}
                className={classes.flipToPageInput}
                min="1"
                max={numPages}
              />
              <p className={classes.flipToPageText}>/ {numPages}</p>
              <button
                className={classes.flipToPageBtn}
                onClick={() => {
                  flipbook.current.pageFlip().flip(flipToPage, "top");
                  console.log("runing", flipToPage);
                }}
              >
                <p className={classes.flipToPageBtnText}>flip</p>
              </button>
            </div>
            <button
              onClick={() => flipbook.current.pageFlip().flipNext()}
              className={classes.button}
            >
              <p className={classes.pageFlipBtnText}>next page</p>
              <span class="material-symbols-outlined">navigate_next</span>
            </button>
          </div>
        </Document>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default NewspaperView;
