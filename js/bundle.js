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

	var Filters = __webpack_require__(1);
	var LinkList = __webpack_require__(2);
	var TableTrip = __webpack_require__(3);

	var LinesList = React.createClass({displayName: "LinesList",
		// default state
		getInitialState: function() {
			return {
				lines: [],
				searchString: window.location.hash.replace('#','')
			};
		},
		handleFilterUpdate: function(filterValue) {
			// update state of search
			this.setState({
				searchString: filterValue
			});
			window.location.hash = '#'+filterValue;
		},
		componentDidMount: function() {
			var self = this;

			// ajax
			$.get(this.props.source, function(result) {
				var collection = result;
				if (this.isMounted()) {
					this.setState({
						lines: collection
					});
				}
			}.bind(this));
		},
		render: function() {

			// var data
			var lines = this.state.lines || [];

			// convert searchString
			searchString = this.state.searchString.trim().toLowerCase();

			// verific if name of line our number line
			if($.isNumeric(searchString)){
				lines = lines.filter(function(l){
					return l.routeShortName.toLowerCase().match( searchString );
				});
			} else {
				lines = lines.filter(function(l){
					return l.routeLongName.toLowerCase().match( searchString );
				});
			}

			// verific length result
			var contentLines;
			if(lines.length == 0) {
				contentLines =  React.createElement("p", null, "Nenhuma linha encontrada");
			} else {
				contentLines = lines.map(function(line){
					return React.createElement(LinkList, {numberLine: line.routeShortName, nameLine: line.routeLongName}) 
				});
			}

			// return dom
			return (
				React.createElement("div", null, 
					React.createElement("div", {className: "col-xs-3", id: "list-lines"}, 
						React.createElement(Filters, {updateFilter: this.handleFilterUpdate, placeString: this.state.searchString}), 
						React.createElement("ul", {className: "list-group"}, 
							contentLines
						)
					), 
					React.createElement("div", {className: "col-xs-9", id: "list-trip"}, 
						lines.map(function(line){
	                        var lineTrips = line.trips.map(function(trip){
	                            return React.createElement(TableTrip, {nameTrip: trip.headsign}) 
	                        });
							return React.createElement("div", null, 
								 React.createElement("h3", null, line.routeLongName), 
								lineTrips
							)
	                    })
					)
				)
			);
		}
	});

	ReactDOM.render( React.createElement(LinesList, {source: "data.json"}), document.getElementById('app'));


	module.exports = LinesList;



/***/ },
/* 1 */
/***/ function(module, exports) {

	var Filters = React.createClass({displayName: "Filters",
		handleChange: function(e){
			// change state searchString
			var filterInput = e.target.value;
			this.props.updateFilter(filterInput);
		},
		render: function() {
			// console.log(this.state.searchString)
			return (
				React.createElement("div", null, 
					React.createElement("input", {className: "form-control", type: "text", onChange: this.handleChange, value: this.props.placeString, placeholder: "Procure aqui"})
				)
			)}
		});
	module.exports = Filters;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var LinkList =  React.createClass({displayName: "LinkList",
		getInitialState: function() {
			return {
				thisActive : false
			}
		},
		handleTrip: function(e,i) {
			// var thisTrip = e.target.data('trip');
			this.setState({
				thisActive: !this.state.thisActive
			});
			console.log(i);
		},
		render: function(){
			return(
				React.createElement("a", {href: "javascript:void(0)", 
					onClick: this.handleTrip, 
					className: this.state.thisActive ? 'list-group-item active' : 'list-group-item', 
					"data-trip": this.props.numberLine}, 
					React.createElement("span", {className: "label label-primary"}, this.props.numberLine), this.props.nameLine
				)
			);
		}
	});

	module.exports = LinkList;

/***/ },
/* 3 */
/***/ function(module, exports) {

	
	var TableTrip = React.createClass({displayName: "TableTrip",
		render: function() {
			return(
					React.createElement("table", {class: "table"}, 
						React.createElement("tr", null, 
							React.createElement("th", null, this.props.nameTrip)
						)
					)
				);
		}
	});

	module.exports = TableTrip;

/***/ }
/******/ ]);