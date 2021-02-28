import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Input, InputAdornment, IconButton, Button, FormControl } from '@material-ui/core/';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import "./login.css"
import { firebaseConfig as firebase} from "../Configs/fbsConfig"
import "firebase/auth";


const UserLogin = (userValues) => (e) => {
  e.preventDefault();
  console.log(userValues.email, userValues.password)
  firebase.auth().signInWithEmailAndPassword(userValues.email, userValues.password)
  .then((userCredential) => {
    console.log("Done: ", userCredential)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    
    console.log(errorCode)
    console.log(errorMessage)
  });
}

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap:"wrap",
    marginTop: 40,
    padding: 40
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
export default function LoginForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });
  
  document.title="Login";
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className={classes.mainRoot}>
      <div className="loginForm">
      <h3>Login to site</h3>
      <form className={classes.root} autoComplete="off" onSubmit={UserLogin(values)}>
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input
              id="my-input"
              type="email"
              aria-describedby="my-helper-text"
              required
              onChange={handleChange('email')}
            />
          </FormControl>
          <br/>
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
                required
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
            />
          </FormControl><br/>
          <Button type="Submit" variant="contained" color="primary">Login</Button>
      </form>
      
      <Button size="small" type="button" color="primary" style={{ textTransform: "lowercase"}}>Forgot Password</Button>
      <br/><Link to="/Signup" style={{textDecoration:"none"}}>
        <Button size="small" type="button" variant="outlined" color="secondary">Not have any account</Button>
      </Link>
    </div>
    </div>
  );
}
