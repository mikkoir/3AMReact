import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Button, CircularProgress} from "@material-ui/core";


class Commission extends Component{

    state = {
        file: {
            title: '',
            description: '',
            filedata: null,
            filename: undefined,
        },
    };

    handleInputChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        console.log(value, name);

        this.setState((prevState) => ({
            file: {
                ...prevState.file,
                [name]: value,
            },
        }));
    };

    render() {
        return (
            <React.Fragment>
                <h1>Commission</h1>
                <ValidatorForm instantValidate={false}
                               onSubmit={this.handleFileSubmit}
                               onError={errors => console.log(errors)}>
                    <TextValidator name="title" label="To"
                                   value={this.state.file.title}
                                   onChange={this.handleInputChange}
                                   validators={['required', 'minStringLength:3']}
                                   errorMessages={[
                                       'this field is required',
                                       'minimum 3 charaters']}
                                   fullWidth/>
                    <TextValidator name="description" label="Description"
                                   value={this.state.file.description}
                                   onChange={this.handleInputChange}
                                   validators={['required', 'minStringLength:3']}
                                   errorMessages={[
                                       'this field is required',
                                       'minimum 3 charaters']}
                                   fullWidth
                                   multiline
                                   rows={3}/>
                    <Button type="submit" variant="contained"
                            color="primary">Send&nbsp;&nbsp;{this.state.loading &&
                    <CircularProgress size={20} color="secondary"/>}</Button>
                </ValidatorForm>
            </React.Fragment>
        );
    }
}

export default Commission;