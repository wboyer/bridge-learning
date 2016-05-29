import React from 'react';
import numeral from 'numeral';

var LearningProgramPosition = React.createClass({
  render: function() {
    var data = this.props.course;
    var program = data.program_title;

    if (!program)
      return null;
    else {
      var courses_left = data.program_course_count - data.index_of_program;

      var punct = '';

      if (courses_left == 0) {
        courses_left = 'Last course';
        punct = '!';
      }
      else
        courses_left = courses_left + ' courses left';

      return (
        <div className="learning-program-position">
          ({courses_left} in <a href={this.props.bridgeUrl + "/learner/courses/" + data.id + "/launch"}>{program}</a>{punct})
        </div>
      );
    }
  }
});

var LearningCourse = React.createClass({
  render: function() {
    var course = this.props.course;
    var bridgeUrl = this.props.bridgeUrl;

    if (course.state == 'complete')
      return null;
    else {
      var progress = course.progress == 0 ? ' not started' : numeral(course.progress).format('0%');

      return (
        <div className="learning-course">
          <a href={bridgeUrl + "/learner/courses/" + course.id + "/launch"}>{course.title}</a> - {progress}
          <LearningProgramPosition bridgeUrl={bridgeUrl} course={course}/>
        </div>
      );
    }
  }
});

module.exports = React.createClass({
  render: function() {
    var bridgeUrl = "http://yalemedicine.bridgeapp.com";

    var courses = this.props.courses.map(function(course) {
      return <LearningCourse key={course.id} bridgeUrl={bridgeUrl} course={course} />;
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
