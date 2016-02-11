var Reflux = require('reflux');

var busTripAction = Reflux.createActions([
    "searchLine",
    "selectLine"
]);

var busTripStore = Reflux.createStore({
    listenables: [busTripAction],
    onSearchLine: function(searchString) {

        // convert searchString
        searchString = searchString.trim().toLowerCase();

        // verific if name of line our number line
        var filterData;
        if($.isNumeric(searchString)){
            filterData = this.data.filter(function(l){
                return l.routeShortName.toLowerCase().match( searchString );
            });
        } else {
            filterData = this.data.filter(function(l){
                return l.routeLongName.toLowerCase().match( searchString );
            });
        }

        // dispara os dados
        this.trigger(filterData);

    },
    onSelectLine: function() {
    },
    // called whenever we change a list. normally this would mean a database API call
    updateList: function(list){
        localStorage.setItem(localStorageKey, JSON.stringify(list));
        // if we used a real database, we would likely do the below in a callback
        this.list = list;
        this.trigger(list); // sends the updated list to all listening components (TodoApp)
    },
    getInitialState: function() {

        $.ajax({
            url: 'data.json',
            async: false,
            success : function(data) {
                this.data = data;
                this.trigger(this.data);
            }.bind(this)
        });

        return this.data;
    }
});

module.exports.actions = busTripAction;
module.exports.store = busTripStore;
