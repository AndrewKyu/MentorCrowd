import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getConnections } from '../../actions/authActions';
import { getProfileByUserId } from '../../actions/profileActions';

import ConnectionItem from './ConnectionItem';

class Connections extends Component {
    componentDidMount(){
        // this.props.getConnections(this.props.match.params.id);
        // console.log(this.props.match.params.id);
        this.props.getConnections(this.props.match.params.id);
        // this.props.getProfileByUserId(this.props.match.params.id);
    }
  render() {
      // console.log(this.props);
      const { user } = this.props.profile.profile;
      // console.log(this.props);
      // console.log(this.props.profile.profile);
      // console.log(user);
      let connectionItems;

      if(user.connectionList.length > 0){
        connectionItems = user.connectionList.map(connection => (<ConnectionItem key={connection._id} connection={connection} />))
      }else{
        connectionItems = null;
      }
    return (
      <div className="connections">
        {connectionItems}
      </div>
    )
  }
}

Connections.propTypes = {
    getConnections: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileByUserId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getConnections, getProfileByUserId })(Connections);