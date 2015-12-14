var Filters = require('./filters');
var LinkList = require('./linklist');
var TableTrip = require('./tabletrip');

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

