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

	var _numeral = __webpack_require__(3);

	var _numeral2 = _interopRequireDefault(_numeral);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LearningCourse = _react2.default.createClass({
	  render: function render() {
	    var course = this.props.course;

	    if (course.state == 'complete') return null;else return _react2.default.createElement(
	      'div',
	      { className: 'learning-course' },
	      _react2.default.createElement(
	        'a',
	        { href: this.props.bridgeUrl + "/learner/courses/" + course.id + "/launch" },
	        course.title
	      ),
	      ' - ',
	      (0, _numeral2.default)(course.progress).format('0%')
	    );
	  }
	});

	module.exports = _react2.default.createClass({
	  render: function render() {
	    var bridgeUrl = "http://yalemedicine.bridgeapp.com";

	    var courses = this.props.courses.map(function (course) {
	      return _react2.default.createElement(LearningCourse, { key: course.id, course: course });
	    });

	    var courseListing;

	    if (courses.reduce(function (course) {
	      return course ? 1 : 0;
	    })) courseListing = _react2.default.createElement(
	      'div',
	      { className: 'learning-course-listing' },
	      _react2.default.createElement(
	        'h4',
	        null,
	        'Courses left to complete:'
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        courses
	      )
	    );

	    return _react2.default.createElement(
	      'div',
	      { className: 'learning-module' },
	      _react2.default.createElement(
	        'h3',
	        null,
	        'I\'m the Learning Module'
	      ),
	      courseListing,
	      _react2.default.createElement(
	        'h3',
	        null,
	        'Go to ',
	        _react2.default.createElement(
	          'a',
	          { href: bridgeUrl },
	          'Bridge'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = numeral;

/***/ }
/******/ ]);