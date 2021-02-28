import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Input, InputAdornment, IconButton, Button, FormControl } from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { firebaseConfig } from "../Configs/fbsConfig"
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 40
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Signup() {
  document.title = "Signup";
  const classes = useStyles();

  const [refForm, setRefForm] = React.useState();
  const [formDisabler, setFormDisabler] = React.useState("inline-block");
  const [vfDisabler, setVfDisabler] = React.useState("hidden");
  const [userValues, setUserValues] = React.useState({
    username: '',
    email: "",
    password: '',
    confPass: '',
    showPassword: false,
    showConfPassword: false,
    verified: false
  });

  function emailLinkComplete() {
    if (firebaseConfig.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('emailForSignIn');
      var username = window.localStorage.getItem('usernameSignIn');
      var verified = window.localStorage.getItem('verificationSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        // email = window.prompt('Please provide your email for confirmation');
        
        setFormDisabler("none")
        setVfDisabler("visible")
        setRefForm(
          <div style={{visibility: formDisabler}}>
            <h4>Please Verify Your Email Address to Process</h4>
            <button onClick={sendingVerification}>Verify Email</button>
          </div>
        )
      }
      //arsheikh665@gmail.com
      else{
        firebaseConfig.database().ref('/storeUsers/' + (username)+"/").update({verified:true})
        .then(()=> {
          window.location.replace("/login")
          
          window.localStorage.removeItem("emailForSignIn");
          window.localStorage.removeItem("usernameSignIn");
          window.localStorage.removeItem("verificationSignIn");
        })
        .catch((err)=>{
          console.log(err)
          console.log(err)
        })
        console.log(username, verified)
        
      }

      // firebaseConfig.auth().signInWithEmailLink(email, window.location.href)
      //   .then((result) => {
      //     // Clear email from storage.
      //     window.localStorage.removeItem('emailForSignIn');

      //     console.log(result)
      //   })
      //   .catch((error) => {
      //     // Some error occurred, you can inspect the code: error.code
      //     // Common errors could be invalid email and invalid or expired OTPs.
      //     console.log(error)
      //   });
    }
  }
  function sendingVerification() {
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://localhost:3000/Signup',
      // This must be true.
      handleCodeInApp: true,
    };
    console.log(firebaseConfig.auth())
    firebaseConfig.auth().sendSignInLinkToEmail(userValues.email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', userValues.email);
        window.localStorage.setItem('usernameSignIn', userValues.username);
        window.localStorage.setItem('verificationSignIn', userValues.verified);
        alert("Email has been send to email address")
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ...
      });
  }
  const UserRegisteration = (e) => {
    e.preventDefault();

    firebaseConfig.auth().createUserWithEmailAndPassword(userValues.email, userValues.password)
      .then((userCredential) => {
        firebaseConfig.database().ref('/storeUsers/user' + (userCredential.user.uid)).update(userValues)
          .then((result) => {
            setFormDisabler("none")
            setVfDisabler("visible")
            setRefForm(
              <div style={{visibility: formDisabler}}>
              <h4>Please Verify Your Email Address to Process</h4>
                <button onClick={sendingVerification}>Verify Email</button>
              </div>
            )
            // sendingVerification()
            
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
  }
    const handleChange = (prop) => (event) => {
      setUserValues({ ...userValues, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
      setUserValues({ ...userValues, showPassword: !userValues.showPassword });
    };

    const handleClickShowConfPassword = () => {
      setUserValues({ ...userValues, showConfPassword: !userValues.showConfPassword });
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  // React.useEffect(() => {
  //   setRefForm(
  //     <></>
  //   )
  // }, [])
  emailLinkComplete();
  return (
    <div className={classes.mainRoot}>
      <div className="signupForm" style={{display: formDisabler}}>
      <title>Registration</title>
        <form className={classes.root} autoComplete="off" onSubmit={UserRegisteration}>
          <FormControl>
            <InputLabel htmlFor="my-input">Username</InputLabel>
            <Input id="my-input" type="text" aria-describedby="my-helper-text" required
              onChange={handleChange('username')}
              value={userValues.username}
            />
          </FormControl><br />
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" type="email" aria-describedby="my-helper-text" required
              onChange={handleChange('email')}
              value={userValues.email} />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              required
              id="standard-adornment-password"
              type={userValues.showPassword ? 'text' : 'password'}
              value={userValues.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {userValues.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl><br />
          <FormControl>
            <InputLabel htmlFor="standard-adornment-confPassword"> Confirm Password</InputLabel>
            <Input
              required
              id="standard-adornment-confPassword"
              type={userValues.showConfPassword ? 'text' : 'password'}
              value={userValues.confPass}
              onChange={handleChange('confPass')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {userValues.showConfPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl><br />
          <Button type="Submit" variant="contained" color="primary">Submit</Button>
        </form>
        <Link to="/Login" style={{ textDecoration: "none" }}>
          <Button size="small" type="button" variant="outlined" color="primary" style={{ border: "none" }}>Signin Instead</Button>
        </Link>
      </div>
      {refForm}
    </div>
  );
}
