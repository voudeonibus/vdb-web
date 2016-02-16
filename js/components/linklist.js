var busTripAction = require('../busTripAction').actions;
var busTripStore = require('../busTripStore').store;

var LinkList =  React.createClass({displayName: "LinkList",
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
			React.createElement("a", {href: "javascript:void(0)", 
				onClick: this.handleTrip.bind(this, this.props.numberLine), 
				className: this.state.thisActive ? 'list-group-item active' : 'list-group-item', 
				"data-trip": this.props.numberLine}, 
				React.createElement("span", {className: "label label-primary"}, this.props.numberLine), this.props.nameLine
			)
		);
	}
});

module.exports = LinkList;