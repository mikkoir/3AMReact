import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActionArea, CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const styles = {
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
};

const Img = (props) => {
  console.log('props', props);
  const {thumbnails, screenshot, title} = props.pic;
  const {classes} = props;
  if (thumbnails !== null) {
    return <CardMedia className={classes.media} image={mediaUrl + thumbnails.w640} title={title}/>;
  } else {
    return <CardMedia image={mediaUrl + screenshot} title={title}/>;
  }
};

const Tr = (props) => {
  const {classes} = props;
  const {title, description, file_id} = props.pic;
  return (
      <tr>
        <td>
          <Card className={classes.card}>
            <CardActionArea>
              <Img {...props} pic={props.pic}/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
                <Typography component="p">
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" component={Link}
                      to={'single/' + file_id}>
                View
              </Button>
            </CardActions>
          </Card>
        </td>
      </tr>
  );
};

Tr.propTypes = {
  pic: PropTypes.object,
  classes: PropTypes.object,
};
export default withStyles(styles)(Tr);