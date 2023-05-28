import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page } from "react-pdf";
// import samplePDF from "../sample.pdf";
import axios from "axios"


import classes from "./NewspaperView.module.css";
import { useState , useEffect} from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


// import Page from "../assets/page.jpg";

const NewspaperView = () => {

  const [numPages, setNumPages] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [magazineData, setmagazineData] = useState(null);
  const [pageNumbers, setpageNumbers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      axios.get('http://localhost:8080/magazine/get-latest')
      .then(response => {
        setmagazineData(response.data);

        const fetchPDF = async () => {
          const pdfResponce = await axios.get(magazineData.downloadURL, {responseType: 'arraybuffer'});
          setPdfData(pdfResponce);  
        }
    
        if (magazineData) {
          fetchPDF();
        }

        const pageIds = Array.from(Array(numPages - 1 + 1).keys()).map(i => i + 1);
        setpageNumbers(pageIds);
        
      })
      .catch(error => {
        console.log('Error fetching PDF:', error);
      });
    }

    fetchData();
    
  }, []);

  // useEffect(() => {
  //   const fetchPDF = async () => {
  //     const pdfResponce = await axios.get(magazineData.downloadURL, {responseType: 'arraybuffer'});
  //     // const pdfBlob = new Blob([pdfResponce.data], {type: 'application/pdf'});
  //     // const pdfDataUrl = URL.createObjectURL(pdfBlob);
  //     // setPdfData(pdfDataUrl);
  //     setPdfData(pdfResponce);


  //   }

  //   if (magazineData) {
  //     fetchPDF();
  //     // const pdfResponce = await axios.get(magazineData.downloadURL, {responseType: 'arraybuffer'});
  //     // const pdfBlob = new Blob([pdfResponce.data], {type: 'application/pdf'});
  //     // const pdfDataUrl = URL.createObjectURL(pdfBlob);
  //     // setPdfData(pdfDataUrl);
  //   }

  //   const pageIds = Array.from(Array(numPages - 1 + 1).keys()).map(i => i + 1);
  //   setpageNumbers(pageIds);

  // }, [magazineData])



  const handleDocumentLoadSuccess = ({ pages }) => {
    console.log('Number of pages:', pages);
    setNumPages(pages);

  };

  return (
    <div>
      <p className={classes.tagline}>Read the latest Rathnadeepa Online</p>
      <div className={classes.viewSection}>
        {pdfData ? (
          <Document
            file={pdfData}
            onLoadSuccess={handleDocumentLoadSuccess}
            >
              <HTMLFlipBook width={300} height={400}>
              <Page pageNumber={1} />
              <Page pageNumber={2} />
              <Page pageNumber={3} />
              <Page pageNumber={4} />
              <Page pageNumber={5} />
              <Page pageNumber={6} />
              <Page pageNumber={7} />

                {/* {pageNumbers.map(page => (
                  <Page key={page} pageNumber={page} />
                ))} */}
              </HTMLFlipBook>
            </Document>
        ) : "Loading..."}
      {/* <Document file={samplePDF}>
        <HTMLFlipBook width={300} height={400}>
          <Page pageNumber={1} />
        </HTMLFlipBook>
      </Document> */}
        {/* <HTMLFlipBook width={300} height={400}>
          <div className={classes.demoPage}>Page 1</div>
          <div className={classes.demoPage}>Page 2</div>
          <div className={classes.demoPage}>Page 3</div>
          <div className={classes.demoPage}>Page 4</div>
          <div className={classes.demoPage}>Page 5</div>
          <div className={classes.demoPage}>Page 6</div>
        </HTMLFlipBook> */}
      </div>
    </div>
  );
};

export default NewspaperView;
