import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Home, AccountBox, ExitToApp, AddCircle, Folder, Assignment} from '@material-ui/icons';

const Nav = (props) => {
  return (
      <nav>
        <List>
          <ListItem button component={Link} to="/home">
            <ListItemIcon>
              <Home/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
          {props.checkLogin() &&
          <React.Fragment>
            <ListItem button component={Link} to="/my-files">
              <ListItemIcon>
                <Folder/>
              </ListItemIcon>
              <ListItemText primary="My Files"/>
            </ListItem>
            <ListItem button component={Link} to="/upload">
              <ListItemIcon>
                <AddCircle/>
              </ListItemIcon>
              <ListItemText primary="Upload"/>
            </ListItem>
            <ListItem button component={Link} to="/profile">
              <ListItemIcon>
                <AccountBox/>
              </ListItemIcon>
              <ListItemText primary="Profile"/>
            </ListItem>

              <ListItem button component={Link} to="/commission">
                  <ListItemIcon>
                      <Assignment/>
                  </ListItemIcon>
                  <ListItemText primary="Commission"/>
              </ListItem>

          </React.Fragment>
          }


        </List>
      </nav>
  );
};

Nav.propTypes = {
  checkLogin: PropTypes.func,
};

export default Nav;