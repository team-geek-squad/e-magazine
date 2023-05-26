import HTMLFlipBook from "react-pageflip";

import classes from "./NewspaperView.module.css";

import Page from "../assets/page.jpg";

const NewspaperView = () => {
  return (
    <div>
      <p className={classes.tagline}>Read the latest Rathnadeepa Online</p>
      <div className={classes.viewSection}>
        <HTMLFlipBook width={300} height={400}>
          <img src={Page} className={classes.page} alt="page" />
          <img src={Page} className={classes.page} alt="page" />
          <img src={Page} className={classes.page} alt="page" />
          <img src={Page} className={classes.page} alt="page" />
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default NewspaperView;
