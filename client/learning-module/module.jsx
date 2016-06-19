import React from 'react';

var LearningProgramPosition = React.createClass({
  render: function() {
    var data = this.props.course;
    var program = data.program_title;

    var progress = '';
    var separator = '';
    var courses_left = '';

    if (data.progress)
      progress = 'Started';

    if (program) {
      courses_left = data.program_course_count - data.index_of_program + 1;
      courses_left = courses_left + ' course' + (courses_left > 1 ? 's' : '') + ' left';
    }

    if (progress && courses_left)
      separator = '; ';
    else
      if (!progress && !courses_left)
        progress = 'Not started';

    return (
      <span className="learning-program-position">{progress}{separator}{courses_left}.</span>
    );
  }
});

var LearningCourse = React.createClass({
  render: function() {
    var course = this.props.course;
    var bridgeUrl = this.props.bridgeUrl;

    if ((course.state == 'complete') && (!course.program_title || ( course.index_of_program == course.program_course_count)))
      return null;
    else {
      return (
        <div className="learning-course">
          <a href={bridgeUrl + "/learner/courses/" + course.id + "/launch"}>{course.program_title || course.title}</a>: <LearningProgramPosition bridgeUrl={bridgeUrl} course={course}/>
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
      courseListing = <div className="learning-course-listing summary"><header><h4>Programs left to complete</h4></header><footer>{courses}</footer></div>;

    return (
      <div className="learning-module">
        {courseListing}

        <a className="btn btn-primary btn-large btn-block" href={bridgeUrl}>
          Go to Bridge
        </a>
      </div>
    );
  }
});
