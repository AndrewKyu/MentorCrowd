import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import MatchItem from './MatchItem';

import { getMatchedProfiles } from '../../actions/profileActions';

class Matches extends Component {
    componentDidMount(){
        this.props.getMatchedProfiles(this.props.auth.user.id);
    }
  render() {
      
      const { matched, loading } = this.props.profile;

      let matchedItems;

      if(matched === null || loading ){
        matchedItems = <Spinner />
      }else{
          matchedItems = Object.values(matched).map(match => (
              <MatchItem key={match._id} match={match} />
          ))
      }
    return (
      <div className="matches">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">
                        Matched Profiles
                    </h1>
                    <div className="p lead text-center">
                        Browser and connect with matched develoeprs
                    </div>
                    {matchedItems}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Matches.propTypes = {
    getMatchedProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getMatchedProfiles })(Matches);