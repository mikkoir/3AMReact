import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button, CircularProgress} from '@material-ui/core';
import './css/Upload.css';
import ImageEditor from '../components/ImageEditor';
import {
  getSingleMedia,
  getFilters,
  getDescription,
  modify,
} from '../util/MediaAPI';

class Modify extends Component {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/';

  state = {
    file: {
      title: '',
      description: '',
      filedata: null,
      filename: undefined,
      file_id: 0,
    },
    loading: false,
    imageData: null,
    filters: {
      brightness: 100,
      contrast: 100,
      warmth: 0,
      saturation: 100,
    },
    type: '',
  };

  componentDidMount() {
    const {id} = this.props.match.params;
    getSingleMedia(id).then(pic => {
      console.log('pic', pic);
      console.log('filters', getFilters(pic.description, this.state.filters));
      this.setState({
        file: pic,
        filters: getFilters(pic.description, this.state.filters),
      }, () => {
        console.log('state', this.state);
      });
    });
  }

  handleFileChange = (evt) => {
    evt.persist();
    console.log(evt.target.files[0]);
    this.fr.readAsDataURL(evt.target.files[0]);
    this.setState((prevState) => ({
      ...prevState,
      type: evt.target.files[0].type,
      file: {
        ...prevState.file,
        filedata: evt.target.files[0],
      },
    }));
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

  handleFileSubmit = (evt) => {
    console.log(evt);
    this.setState({loading: true});
    const data = {
      title: this.state.file.title,
      description: `[d]${getDescription(
          this.state.file.description)}[/d][f]${JSON.stringify(
          this.state.filters)}[/f]`,
    };

    modify(this.state.file.file_id, data, localStorage.getItem('token'))
        .then(json => {
          console.log(json);
          setTimeout(() => {
            this.setState({loading: false});
            this.props.history.push('/my-files');
          }, 2000);

        })
        .catch(err => {
          console.log('error', err);
        });
  };

  updateFilters = (newFilters) => {
    this.setState((prevState) => ({
      filters: newFilters,
    }));
  };

  render() {
    return (
        <React.Fragment>
          <h1>Modify</h1>
          <ValidatorForm instantValidate={false}
                         onSubmit={this.handleFileSubmit}
                         onError={errors => console.log(errors)}>
            <TextValidator name="title" label="Title"
                           value={this.state.file.title}
                           onChange={this.handleInputChange}
                           validators={['required', 'minStringLength:3']}
                           errorMessages={[
                             'this field is required',
                             'minimum 3 charaters']}
                           fullWidth/>
            <TextValidator name="description" label="Description"
                           value={getDescription(this.state.file.description)}
                           onChange={this.handleInputChange}
                           validators={['required', 'minStringLength:3']}
                           errorMessages={[
                             'this field is required',
                             'minimum 3 charaters']}
                           fullWidth
                           multiline
                           rows={3}/>
            <Button type="submit" variant="contained"
                    color="primary">Save&nbsp;&nbsp;{this.state.loading &&
            <CircularProgress size={20} color="secondary"/>}</Button>
          </ValidatorForm>
          {this.state.file.filename !== undefined &&
          < ImageEditor state={this.state} updateFilters={this.updateFilters}/>
          }
        </React.Fragment>
    );
  }
}

Modify.propTypes = {
  history: PropTypes.object,
  updateImages: PropTypes.func,
  match: PropTypes.object,
};

export default Modify;
