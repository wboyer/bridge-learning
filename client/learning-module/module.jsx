import React from 'react';
import numeral from 'numeral';

var LearningCourse = React.createClass({
  render: function() {
    var course = this.props.course;

    if (course.state == 'complete')
      return null;
    else
      return (
        <div className="learning-course">
          <a href={this.props.bridgeUrl + "/learner/courses/" + course.id + "/launch"}>{course.title}</a> - {numeral(course.progress).format('0%')}
        </div>
      );
  }
});

module.exports = React.createClass({
  render: function() {
    var bridgeUrl = "http://yalemedicine.bridgeapp.com";

    var courses = this.props.courses.map(function(course) {
      return <LearningCourse key={course.id} course={course} />;
    });

    var courseListing;

    if (courses.reduce(function(course) { return course ? 1 : 0 }))
      courseListing = <div className="learning-course-listing"><h4>Courses left to complete:</h4><div>{courses}</div></div>;

    return (
      <div className="learning-module">
        <h3>I'm the Learning Module</h3>

        {courseListing}

        <h3>Go to <a href={bridgeUrl}>Bridge</a></h3>
      </div>
    );
  }
});
