import classes from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={classes.page}>
      <div className={classes.centerDiv}>
        <h2 className={classes.signIn}>Sign In</h2>
        <p>Sign in and start managing your magazine</p>
        <input
          type="text"
          className={classes.userName}
          placeholder="User Name"
        />
        <input
          type="password"
          className={classes.password}
          placeholder="Password"
        />
        <div className={classes.inputDiv}>
          <input type="checkbox" value="" />
          <p className={classes.label}>Remember Me</p>
        </div>
        <button className={classes.btn}>
          <p className={classes.btnText}>Login</p>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
