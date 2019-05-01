import React from 'react';
import PropTypes from 'prop-types';
import Tr from './Tr';

const Table = (props) => {
  const rows = props.picArray.map((item, i) => {
    return <Tr key={i} pic={item}/>;
  });
  return (
      <table>
        <tbody>
        {rows}
        </tbody>
      </table>
  );
};

Table.propTypes = {
  picArray: PropTypes.array,
};

export default Table;