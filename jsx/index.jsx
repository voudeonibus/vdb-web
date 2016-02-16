var Filters = require('./components/filters');
var LinkList = require('./components/linklist');
var TableTrip = require('./components/tabletrip');
var busTripAction = require('./busTripAction').actions;
var busTripStore = require('./busTripStore').store;
var Reflux = require('reflux');

var LinesList = React.createClass({

	mixins: [Reflux.connect(busTripStore,"lines")],

	// default state
	getInitialState: function() {

		// init hash search results
		var filterInit = window.location.hash.replace('#','');
		busTripAction.searchLine(filterInit);

		return {
			searchString: filterInit
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

	},
	render: function() {

		var lines = this.state.lines;

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

						return (<div><h3>{line.routeLongName}</h3>{lineTrips}</div>)
						// return (<div><h3>{line.routeLongName}</h3></div>)
					})}
				</div>
			</div>
		);
	}
});

ReactDOM.render( <LinesList />, document.getElementById('app'));
