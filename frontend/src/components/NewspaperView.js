import classes from "./NewspaperView.module.css";

const NewspaperView = () => {
  return (
    <div>
      <p className={classes.tagline}>Read the latest Rathnadeepa Online</p>
      <div className={classes.viewSection}>View Area</div>
    </div>
  );
};

export default NewspaperView;
