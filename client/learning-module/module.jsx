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
          <a href={bridgeUrl + "/learner/courses/" + course.learnable_id + "/launch"}>{course.program_title || course.title}</a>: <LearningProgramPosition bridgeUrl={bridgeUrl} course={course}/>
        </div>
      );
    }
  }
});

module.exports = React.createClass({
  propTypes: {
    coursesX: React.PropTypes.array.isRequired,
    clickEvent: React.PropTypes.shape({
      category: React.PropTypes.stringisRequired,
      action: React.PropTypes.number.isRequired
    }),
  },
  render: function() {
    var bridgeUrl = "http://yalemedicine.bridgeapp.com";

    var courses = this.props.courses;
    var button;

    if (!courses) {
      courses = 'You aren’t enrolled in any programs at this time.';
    }
    else {
      courses = courses.map(function(course) {
        return <LearningCourse key={course.id} bridgeUrl={bridgeUrl} course={course}/>;
      });

      var reducer = function (course) {
        return course ? 1 : 0;
      };

      if (courses.length == 0)
        courses = 'Congratulations! You\'re all caught up. Click through to Bridge to review completed courses.';

      var onClick;

      function navigateCallback() {
        window.setTimeout(function() {
          window.location = bridgeUrl;
        }, 500);
      }

      function reportCallback(clickEvents) {
        var clickEvent = clickEvents.pop();
        var remainingClickEvents = clickEvents;

        function hitCallback() {
          remainingClickEvents.length ? reportCallback(remainingClickEvents) : navigateCallback()
        }

        var trackerName = "";
        if (clickEvent.trackerName)
          trackerName = clickEvent.trackerName + '.';

        ga(trackerName + 'send', 'event', clickEvent.category, clickEvent.action, null, {
          'transport': 'beacon',
          'hitCallback': hitCallback
        });

        return false;
      }

      var clickEvents = this.props.clickEvents;

      if (!clickEvents && this.props.clickEvent)
        clickEvents = [ this.props.clickEvent ];

      if (clickEvents) {
        clickEvents = clickEvents.reverse();

        onClick = function() {
          reportCallback(clickEvents);
          return false;
        };
      }

      button = <a className="btn btn-primary btn-large btn-block" href={bridgeUrl} onClick={onClick}>Go to Bridge</a>;
    }

    return (
      <div className="learning-module">
        <div className="learning-course-listing summary"><header><h4>Programs left to complete</h4></header><footer>{courses}</footer></div>

        {button}
      </div>
    );
  }
});
