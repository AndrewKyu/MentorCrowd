import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import  TextAreaFieldGroup  from '../common/TextAreaFieldGroup';
import  TextFieldGroup  from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
    constructor(props){
        super(props);
        this.state = {
            school: '',
            degree: '',
            major: '',
            minor: '',
            from: '',
            to: '',
            current: false,
            gpa: '',
            classes: '',
            description: '',
            errors: {},
            disabled: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
    }
    onSubmit(e){
        e.preventDefault();
        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            major: this.state.major,
            minor: this.state.minor,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            gpa: this.state.gpa,
            courses: this.state.courses,
            descrption: this.state.description
        }

        this.props.addEducation(eduData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheck(e) {
        this.setState({
          disabled: !this.state.disabled,
          current: !this.state.current
        });
    }
  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                    <h1 className="display-4 text-center">Add Education</h1>
                    <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                            placeholder="* School"
                            name="school"
                            value={this.state.school}
                            onChange={this.onChange}
                            error={errors.school}
                        />
                        <TextFieldGroup 
                            placeholder="* Degree or Certification"
                            name="degree"
                            value={this.state.degree}
                            onChange={this.onChange}
                            error={errors.degree}
                        />
                        <TextFieldGroup 
                            placeholder="* Major"
                            name="major"
                            value={this.state.major}
                            onChange={this.onChange}
                            error={errors.major}
                        />
                        <TextFieldGroup 
                        placeholder="Minor"
                        name="minor"
                        value={this.state.minor}
                        onChange={this.onChange}
                        error={errors.minor}
                        />
                        <h6>From Date</h6>
                        <TextFieldGroup 
                            name="from"
                            type="date"
                            value={this.state.from}
                            onChange={this.onChange}
                            error={errors.from}
                        />
                        <h6>To Date</h6>
                        <TextFieldGroup 
                            name="to"
                            type="date"
                            value={this.state.to}
                            onChange={this.onChange}
                            error={errors.to}
                            disabled={this.state.diabled ? 'disabled' : ''}
                        />
                        <div className="form-check mb-4">
                            <input 
                                type="checkbox"
                                className="form-check-input"
                                name="current"
                                value={this.state.current}
                                checked={this.state.current}
                                onChange={this.onCheck}
                                id="current"
                            />
                            <label htmlFor="current" className="form-check label">
                                Current Education
                            </label>
                        </div>
                        <TextFieldGroup 
                            name="gpa"
                            placeholder="GPA"
                            value={this.state.gpa}
                            onChange={this.onChange}
                            error={errors.gpa}
                        />
                        <TextFieldGroup 
                            name="courses"
                            placeholder="Courses Taken"
                            value={this.state.courses}
                            onChange={this.onChange}
                            error={errors.courses}
                        />
                        <TextAreaFieldGroup 
                            placeholder="Program Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            error={errors.description}
                            info="Tell us about the program that you were in"
                        />
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));