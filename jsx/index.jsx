var Filters = require('./filters');
var LinkList = require('./linklist');
var TableTrip = require('./tabletrip');

var LinesList = React.createClass({
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
			contentLines =  <p>Nenhuma linha encontrada</p>;
		} else {
			contentLines = lines.map(function(line){
				return <LinkList numberLine={line.routeShortName} nameLine={line.routeLongName} /> 
			});
		}

		// return dom
		return (
			<div>
				<div className="col-xs-3" id="list-lines">
					<Filters updateFilter={this.handleFilterUpdate} placeString={this.state.searchString} />
					<ul className="list-group">
						{contentLines}
					</ul>
				</div>
				<div className="col-xs-9" id="list-trip">
					{lines.map(function(line){
                        var lineTrips = line.trips.map(function(trip){
                            return <TableTrip nameTrip={trip.headsign} /> 
                        });
						return <div>
							 <h3>{line.routeLongName}</h3>
							{lineTrips}
						</div>
                    })}
				</div>
			</div>
		);
	}
});

ReactDOM.render( <LinesList source="data.json" />, document.getElementById('app'));


module.exports = LinesList;

