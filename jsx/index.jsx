var Reflux = require('reflux');

// components
var Filters = require('./filters');
var LinkList = require('./linklist');
var TableTrip = require('./tabletrip');
var busTripStore = require('./busTripAction').store;

// const TextField = require('material-ui/lib/text-field');

var LinesList = React.createClass({

	mixins: [Reflux.connect(busTripStore, 'lines')],

	// default state
	getInitialState: function() {
		return {
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
