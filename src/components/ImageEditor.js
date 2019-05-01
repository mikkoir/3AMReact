import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {Slider} from '@material-ui/lab';
import PropTypes from 'prop-types';

class ImageEditor extends Component {

  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  state = this.props.state;

  rangeReducer = (rawValue, props) => {
    console.log(rawValue);
    const {name} = props;
    const value = Math.round(rawValue);
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }), () => {
      this.props.updateFilters(this.state.filters);
    });
  };

  render() {
    let imageData = '';
    if (this.state.imageData === undefined || this.state.imageData === null) {
      console.log('if', this.state.imageData);
      imageData = this.mediaUrl + this.state.file.filename;
    } else {
      console.log('else');
      imageData = this.state.imageData;
    }

    return (
        <React.Fragment>
          <img src={imageData} alt="preview"
               className={'image'}
               style={{filter: `brightness(${this.state.filters.brightness}%) contrast(${this.state.filters.contrast}%) sepia(${this.state.filters.warmth}%) saturate(${this.state.filters.saturation}%)`}}/>
          <div>
            <Typography
                id="brightness-label">Brightness: {this.state.filters.brightness}%</Typography>
            <Slider name="brightness" value={this.state.filters.brightness}
                    valueReducer={this.rangeReducer}
                    min={0}
                    max={200}
                    step={1}
                    aria-labelledby="brightness-label"/>
          </div>
          <div>
            <Typography
                id="contrast-label">Contrast: {this.state.filters.contrast}%</Typography>
            <Slider name="contrast" value={this.state.filters.contrast}
                    valueReducer={this.rangeReducer}
                    min={0}
                    max={200}
                    step={1}
                    aria-labelledby="contrast-label"/>
          </div>
          <div>
            <Typography
                id="saturation-label">Saturation: {this.state.filters.saturation}%</Typography>
            <Slider name="saturation" value={this.state.filters.saturation}
                    valueReducer={this.rangeReducer}
                    min={0}
                    max={200}
                    step={1}
                    aria-labelledby="saturation-label"/>
          </div>
          <div>
            <Typography
                id="warmth-label">Warmth: {this.state.filters.warmth}%</Typography>
            <Slider name="warmth" value={this.state.filters.warmth}
                    valueReducer={this.rangeReducer}
                    min={0}
                    max={100}
                    step={1}
                    aria-labelledby="warmth-label"/>
          </div>
        </React.Fragment>
    );
  }
}

ImageEditor.propTypes = {
  updateFilters: PropTypes.func,
  state: PropTypes.object,
};

export default ImageEditor;