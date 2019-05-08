import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './3AMrgbScaled.png';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Home, AccountBox, ExitToApp, AddCircle, Folder, Assignment} from '@material-ui/icons';
import ImageGrid from "./ImageGrid";
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from '@material-ui/core/Button';

const AppiBar = (props) => {


    return (
        <React.Fragment>
            <div >
            <AppBar position="static" color='primary'>

                <Typography variant="h2" display="flex">
                    <Link to="/home">
                    <img src={logo}  style={{width:70, height:70, borderRadius: 50, marginLeft:20, marginTop:6, marginBottom:-4}}/>
                    </Link>
                </Typography>

                {props.checkLogin() &&
                <Button color="inherit" component={Link} to="/logout">Logout</Button>
                }

                {!props.checkLogin() &&

                <Button color="inherit" component={Link} to="/">Login</Button>
                }

            </AppBar>
            </div>
        </React.Fragment>
    );
};

AppiBar.propTypes = {
    checkLogin: PropTypes.func,
};

export default AppiBar;