var LearningModule =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LearningProgramPosition = _react2.default.createClass({
	  render: function render() {
	    var data = this.props.course;
	    var program = data.program_title;

	    var progress = '';
	    var separator = '';
	    var courses_left = '';

	    if (data.progress) progress = 'Started';

	    if (program) {
	      courses_left = data.program_course_count - data.index_of_program + 1;
	      courses_left = courses_left + ' course' + (courses_left > 1 ? 's' : '') + ' left';
	    }

	    if (progress && courses_left) separator = '; ';else if (!progress && !courses_left) progress = 'Not started';

	    return _react2.default.createElement(
	      'span',
	      { className: 'learning-program-position' },
	      progress,
	      separator,
	      courses_left,
	      '.'
	    );
	  }
	});

	var LearningCourse = _react2.default.createClass({
	  render: function render() {
	    var course = this.props.course;
	    var bridgeUrl = this.props.bridgeUrl;

	    return _react2.default.createElement(
	      'div',
	      { className: 'learning-course' },
	      _react2.default.createElement(
	        'a',
	        { href: bridgeUrl + "/learner/courses/" + course.learnable_id + "/launch" },
	        course.program_title || course.title
	      ),
	      ': ',
	      _react2.default.createElement(LearningProgramPosition, { bridgeUrl: bridgeUrl, course: course })
	    );
	  }
	});

	module.exports = _react2.default.createClass({
	  propTypes: {
	    coursesX: _react2.default.PropTypes.array.isRequired,
	    clickEvent: _react2.default.PropTypes.shape({
	      category: _react2.default.PropTypes.stringisRequired,
	      action: _react2.default.PropTypes.number.isRequired
	    })
	  },
	  render: function render() {
	    var _this = this;

	    var bridgeUrl = "http://yalemedicine.bridgeapp.com";

	    var courses = this.props.courses;
	    var button;

	    if (!courses) {
	      courses = 'You aren’t enrolled in any programs at this time.';
	    } else {
	      var reducer;
	      var onClick;
	      var clickEvents;

	      (function () {
	        var navigateCallback = function navigateCallback() {
	          window.setTimeout(function () {
	            window.location = bridgeUrl;
	          }, 500);
	        };

	        var reportCallback = function reportCallback(clickEvents) {
	          var clickEvent = clickEvents.pop();
	          var remainingClickEvents = clickEvents;

	          function hitCallback() {
	            remainingClickEvents.length ? reportCallback(remainingClickEvents) : navigateCallback();
	          }

	          var trackerName = "";
	          if (clickEvent.trackerName) trackerName = clickEvent.trackerName + '.';

	          ga(trackerName + 'send', 'event', clickEvent.category, clickEvent.action, {
	            'transport': 'beacon',
	            'hitCallback': hitCallback
	          });
	        };

	        courses = courses.map(function (course) {
	          if (course.state == 'complete' && (!course.program_title || course.index_of_program == course.program_course_count)) return null;else return _react2.default.createElement(LearningCourse, { key: course.id, bridgeUrl: bridgeUrl, course: course });
	        });

	        reducer = function reducer(prev, cur) {
	          return prev + (cur ? 1 : 0);
	        };

	        if (courses.length == 0 || courses.reduce(reducer, 0) == 0) courses = 'Congratulations! You\'re all caught up. Click through to Bridge to review completed courses.';

	        clickEvents = _this.props.clickEvents;


	        if (!clickEvents && _this.props.clickEvent) clickEvents = [_this.props.clickEvent];

	        if (clickEvents) {
	          clickEvents = clickEvents.reverse();

	          onClick = function onClick() {
	            reportCallback(clickEvents);
	            return false;
	          };
	        }

	        button = _react2.default.createElement(
	          'a',
	          { className: 'btn btn-primary btn-large btn-block', href: bridgeUrl, onClick: onClick },
	          'Go to Bridge'
	        );
	      })();
	    }

	    return _react2.default.createElement(
	      'div',
	      { className: 'learning-module' },
	      _react2.default.createElement(
	        'div',
	        { className: 'learning-course-listing summary' },
	        _react2.default.createElement(
	          'header',
	          null,
	          _react2.default.createElement(
	            'h4',
	            null,
	            'Programs left to complete'
	          )
	        ),
	        _react2.default.createElement(
	          'footer',
	          null,
	          courses
	        )
	      ),
	      button
	    );
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ }
/******/ ]);