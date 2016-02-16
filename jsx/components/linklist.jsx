var busTripAction = require('../busTripAction').actions;
var busTripStore = require('../busTripStore').store;

var LinkList =  React.createClass({
	getInitialState: function() {
		return {
			thisActive : false
		}
	},
	handleTrip: function(selectLine) {
		// change active
		this.setState({
			thisActive: !this.state.thisActive
		});
		// update components
		busTripAction.selectLine(selectLine);
	},
	render: function(){
		return(
			<a href="javascript:void(0)" 
				onClick={this.handleTrip.bind(this, this.props.numberLine)} 
				className={this.state.thisActive ? 'list-group-item active' : 'list-group-item'} 
				data-trip={this.props.numberLine}>
				<span className="label label-primary">{this.props.numberLine}</span>{this.props.nameLine}
			</a>
		);
	}
});

module.exports = LinkList;