import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page } from "react-pdf";
// import samplePDF from "../sample.pdf";
import axios from "axios";

import classes from "./NewspaperView.module.css";
import { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const NewspaperView = () => {
  // const pageWidth = 450;
  // const pageHeight = pageWidth * 1.414;

  const [numPages, setNumPages] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [magazineData, setmagazineData] = useState(null);
<<<<<<< HEAD
  const [windowSize, setWindowSize] = useState(getWindowSize());
=======
>>>>>>> main
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

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const getPageWidth = () => {
    if (windowSize.innerWidth > 991) {
      return 400;
    } else if (windowSize.innerWidth > 767) {
      return 650;
    } else if (windowSize.innerWidth > 576) {
      return 500;
    } else {
      return windowSize.innerWidth * 0.9;
    }
  };

  const getPageHeight = () => {
    if (windowSize.innerWidth > 991) {
      return 400 * 1.414;
    } else if (windowSize.innerWidth > 767) {
      return 650 * 1.414;
    } else if (windowSize.innerWidth > 576) {
      return 500 * 1.414;
    } else {
      return windowSize.innerWidth * 0.9 * 1.414;
    }
  };

  return (
    <div className={classes.newspaperView}>
      <p className={classes.tagline}>Read the latest Rathnadeepa Online</p>
      {pdfData ? (
        <Document file={pdfData} onLoadSuccess={handleDocumentLoadSuccess}>
          <div className={classes.viewSection}>
          <HTMLFlipBook
            className={classes.book}
            width={getPageWidth()}
            ref={flipbook}
            height={getPageHeight()}
            showCover={true}
            autoSize={true}
            useMouseEvents={false}
          >
            {pageIds &&
              pageIds.map((page) => (
                <div key={page} className={classes.pageContainer}>
                  <TransformWrapper>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <>
                        <TransformComponent>
                          <Page
                            pageNumber={page}
                            width={getPageWidth()}
                            renderTextLayer={false}
                          />
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
          <div className={classes.buttonBoard}>
            <button
              onClick={() => flipbook.current.pageFlip().flipPrev()}
              className={`${classes.button} ${classes.prevButton}`}
            >
<<<<<<< HEAD
              <span class={`material-symbols-outlined ${classes.flipPageIcon}`}>
                navigate_before
              </span>
              <p className={classes.pageFlipBtnText}>previous page</p>
            </button>
            <button
              onClick={() => flipbook.current.pageFlip().flipNext()}
              className={`${classes.button} ${classes.nextButton}`}
            >
              <p className={classes.pageFlipBtnText}>next page</p>
              <span class={`material-symbols-outlined ${classes.flipPageIcon}`}>
                navigate_next
              </span>
            </button>
          </div>
=======
              {pageIds &&
                pageIds.map((page) => (
                  <div key={page} className={classes.pageContainer}>
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
            <div className={classes.buttonBoard}>
              <button
                onClick={() => flipbook.current.pageFlip().flipPrev()}
                className={`${classes.button} ${classes.prevButton}`}
              >
                <span
                  class={`material-symbols-outlined ${classes.flipPageIcon}`}
                >
                  navigate_before
                </span>
                <p className={classes.pageFlipBtnText}>previous page</p>
              </button>
              <button
                onClick={() => flipbook.current.pageFlip().flipNext()}
                className={`${classes.button} ${classes.nextButton}`}
              >
                <p className={classes.pageFlipBtnText}>next page</p>
                <span
                  class={`material-symbols-outlined ${classes.flipPageIcon}`}
                >
                  navigate_next
                </span>
              </button>
            </div>
>>>>>>> main
          </div>
        </Document>
      ) : (
        <div className={classes.loadingPlaceholder}>
          <div class={`spinner-border ${classes.spinner}`} role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewspaperView;
