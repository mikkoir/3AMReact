import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Home, AccountBox, ExitToApp, AddCircle, Folder, Assignment} from '@material-ui/icons';
import ImageGrid from "./ImageGrid";
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";


const AppiBar = (props) => {
    return (
        <React.Fragment>
            <AppBar position="static" color='secondary'>
                <Typography variant="h2">
                    3AM
                </Typography>
                {props.checkLogin() &&
                <ListItem button component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItem>
                }

                {!props.checkLogin() &&
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary="Login"/>
                </ListItem>
                }

            </AppBar>
        </React.Fragment>
    );
};

AppiBar.propTypes = {
    checkLogin: PropTypes.func,
};

export default AppiBar;