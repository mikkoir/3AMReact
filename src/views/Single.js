import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia, getFilters, getDescription} from '../util/MediaAPI';
import {Button} from '@material-ui/core';

class Single extends Component {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  state = {
    file: {
      filename: '',
      title: '',
      description: '[d][/d][f][/f]',
      media_type: 'image/jpg',
      user_id: 1,
    },
    filters: {
      brightness: 100,
      contrast: 100,
      warmth: 0,
      saturation: 100,
    },
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

  render() {
    const {title, description, filename, media_type} = this.state.file;
    const {brightness, contrast, saturation, warmth} = this.state.filters;
    return (
        <React.Fragment>
          <Button onClick={this.props.history.goBack}>Back</Button>
          {console.log(media_type)}
          <h1>{title}</h1>
          {media_type.includes('image') &&
          <img src={this.mediaUrl + filename}
               alt={title}
               style={{height: 50, width:50, filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${warmth}%) saturate(${saturation}%)`}}
          />
          }
          {media_type.includes('video') &&
          <video src={this.mediaUrl + filename}
                 controls
          />}
          {media_type.includes('audio') &&
          <audio src={this.mediaUrl + filename}
                 controls
          />}
          <p>
            {getDescription(description)}
          </p>
        </React.Fragment>
    );
  }

}

Single.propTypes = {
  match: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object,
};

export default Single;