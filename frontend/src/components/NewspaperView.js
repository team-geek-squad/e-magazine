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

  const fetchPDF = async (magazine) => {
    const pdfResponce = await axios.get(magazine.downloadURL, {responseType: 'arraybuffer'});
    setPdfData(pdfResponce);  
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/magazine/get-latest');
      setmagazineData(response.data);
      console.log(magazineData);

      const pageIds = Array.from(Array(numPages - 1 + 1).keys()).map(i => i + 1);
      setpageNumbers(pageIds);

      return response.data;
    }

    

      fetchData().then(res => {
        console.log(res);
        fetchPDF(res);
      });
    
  }, []);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    console.log('Number of pages:', numPages);
    setNumPages(numPages);

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
              {/* {pageNumbers.map(page => (
                <div key={page} className={classes.demoPage}><Page pageNumber={page} renderTextLayer={false}/></div>
                ))} */}
                <div className={classes.demoPage}><Page pageNumber={1} renderTextLayer={false}/></div>
                <div className={classes.demoPage}><Page pageNumber={2} renderTextLayer={false}/></div>
                <div className={classes.demoPage}><Page pageNumber={3} renderTextLayer={false}/></div>
                <div className={classes.demoPage}><Page pageNumber={4} renderTextLayer={false}/></div>
                <div className={classes.demoPage}><Page pageNumber={5} renderTextLayer={false}/></div>
                <div className={classes.demoPage}><Page pageNumber={6} renderTextLayer={false}/></div>


                
              </HTMLFlipBook>
            </Document>
        ) : "Loading..."}
      </div>
    </div>
  );
};

export default NewspaperView;
