import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ConnectionItem extends Component {
  render() {
    // console.log(this.props);
    return (
      <div className="card card-body bg-light mb-3 mt-3">
        <div className="row">
          <div className="col-3">

          </div>
        </div>
      </div>
    )
  }
}

ConnectionItem.propTypes = {
  connection: PropTypes.object.isRequired
}

export default ConnectionItem;