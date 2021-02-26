// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// // import MenuIcon from '@material-ui/icons/Menu';
// import { Link } from "react-router-dom"

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: "red"
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
  
// }));

// export default function NavBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton> */}
//           <Typography edge="start" variant="h6" className={classes.title}>
//             <Link className="Links" to="/">Home</Link>
//             <Link className="Links" to="/About">About</Link>
//             <Link className="Links" to="/Products">Products</Link>
//           </Typography>
//             <Link className="Links LoginLink" to="/Login">Login</Link>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }



import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
             <Link className="Links" to="/">Home</Link>
             <Link className="Links" to="/About">About</Link>
             <Link className="Links" to="/Products">Products</Link>
          </Typography>
          <Link className="Links LoginLink" to="/Login" >Login</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
