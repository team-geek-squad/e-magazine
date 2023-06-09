import classes from "./Footer.module.css";

import Logo from "../assets/logo.png";
import Facebook from "../assets/facebook.png";
import Youtube from "../assets/youtube.png";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className="container py-5">
        <div className="row g-0">
          <div className="col-lg-6 col-12">
            <img src={Logo} className={classes.logo} alt="logo" />
            <p className={classes.tagline}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              facilisis, leo sit amet suscipit aliquet, tellus tortor tristique
              purus, sit amet
            </p>
            <button className={classes.btn}>
              <p className={classes.btnText}>Contact Us for more Details</p>
            </button>
            <div className={classes.socialMediaDiv}>
              <img
                src={Facebook}
                className={classes.socialMedia}
                alt="facebook"
              />
              <img
                src={Youtube}
                className={classes.socialMedia}
                alt="youtube"
              />
            </div>
          </div>
          <div className="offset-lg-2 col-lg-4 col-12 mt-l-0 mt-4">
            <p className={classes.callUsOn}>Call Us On</p>
            <p className={classes.phoneNumbers}>Sahan +61 449 776 750</p>
            <p className={classes.phoneNumbers}>Ann +61 452 670 045</p>
            <p className={classes.addressTitle}>Address</p>
            <p className={classes.address}>
              2/1265 Nepean Highway,
              <br />
              Cheltenham Vic 3192
            </p>
            <p className={classes.emailTitle}>Email</p>
            <p className={classes.email}>ads@rathnadeepa.au</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
