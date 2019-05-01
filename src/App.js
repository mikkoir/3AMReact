import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {getAllMedia, getFilesByTag} from './util/MediaAPI';
import Front from './views/Front';
import Single from './views/Single';
import Nav from './components/Nav';
import Login from './views/Login';
import Profile from './views/Profile';
import Logout from './views/Logout';
import Grid from '@material-ui/core/Grid';
import Upload from './views/Upload';
import MyFiles from './views/MyFiles';
import Modify from './views/Modify';
import AppBar from '@material-ui/core/AppBar';
//import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import AppiBar from './components/AppiBar';
import Typography from '@material-ui/core/Typography';
import Commission from "./views/Commission";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";
import PropTypes from 'prop-types';


const theme = createMuiTheme({
        palette: {
            secondary: {
                main: '#f57c00'
            },
            primary: {
                main: '#33691e'
            }
        }
    },
);

class App extends Component {


    state = {
        picArray: [],
        user: null,
    };


    setUser = (user) => {
        // hae profiilikuva ja liitä se user-objektiin
        getFilesByTag('profile').then((files) => {
            const profilePic = files.filter((file) => {
                let outputFile = null;
                if (file.user_id === this.state.user.user_id) {
                    outputFile = file;
                }
                return outputFile;
            });
            this.setState((prevState) => {
                return {
                    user: {
                        ...prevState.user,
                        profilePic: profilePic[0],
                    },
                };
            });
        });
        this.setState({user});
    };

    setUserLogout = (user) => {
        this.setState({user});
    };

    checkLogin = () => {
        return this.state.user !== null;
    };

    updateImages = () => {
        getAllMedia().then((pics) => {
            console.log(pics);
            this.setState({picArray: pics});
        });
    };

    componentDidMount() {
        this.updateImages();
    }

    render() {
        return (
            <Router basename='/~ilkkamtk/mpjakk-react'>
                <MuiThemeProvider theme={theme}>

                    <Grid container>
                        <Grid item sm={12}>
                            <AppiBar checkLogin={this.checkLogin}/>
                        </Grid>
                        <Grid item sm={2}>
                            <Nav checkLogin={this.checkLogin}/>
                        </Grid>
                        <Grid item sm={8}>
                            <Route path="/home" render={(props) => (
                                <Front {...props} picArray={this.state.picArray}/>
                            )}/>

                            <Route path="/upload" render={(props) => (
                                <Upload {...props} updateImages={this.updateImages}/>
                            )}/>

                            <Route path="/single/:id" component={Single}/>

                            <Route path="/modify/:id" component={Modify}/>

                            <Route path="/profile" render={(props) => (
                                <Profile {...props} user={this.state.user}/>
                            )}/>
                            <Route path="/commission" render={(props) => (
                                <Commission {...props} user={this.state.user}/>
                            )}/>

                            <Route path="/my-files" render={(props) => (
                                <MyFiles {...props} user={this.state.user}/>
                            )}/>

                            <Route exact path="/" render={(props) => (
                                <Login {...props} setUser={this.setUser}/>
                            )}/>
                            <Route path="/logout" render={(props) => (
                                <Logout {...props} setUserLogout={this.setUserLogout}/>
                            )}/>
                        </Grid>

                    </Grid>
                </MuiThemeProvider>
            </Router>
        );
    }
}

App.propTypes = {
    checkLogin: PropTypes.func,
};
export default App;
