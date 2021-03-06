import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventAttendanceItem from './EventAttendanceItem';

class EventAttendanceList extends Component {
  render() {
      const { attendees, eventId } = this.props;
    
    return attendees.map(attendee => <EventAttendanceItem key={attendee._id} attendee={attendee} eventId={eventId} />)
  }
}

EventAttendanceList.propTypes = {
    attendees: PropTypes.array.isRequired,
    eventId: PropTypes.string.isRequired
}

export default EventAttendanceList;