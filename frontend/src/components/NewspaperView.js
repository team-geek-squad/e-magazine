import HTMLFlipBook from "react-pageflip";

import classes from "./NewspaperView.module.css";

import Page from "../assets/page.jpg";

const NewspaperView = () => {
  return (
    <div>
      <p className={classes.tagline}>Read the latest Rathnadeepa Online</p>
      <div className={classes.viewSection}>
        <HTMLFlipBook width={300} height={400}>
          <div className={classes.demoPage}>Page 1</div>
          <div className={classes.demoPage}>Page 2</div>
          <div className={classes.demoPage}>Page 3</div>
          <div className={classes.demoPage}>Page 4</div>
          <div className={classes.demoPage}>Page 5</div>
          <div className={classes.demoPage}>Page 6</div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default NewspaperView;
