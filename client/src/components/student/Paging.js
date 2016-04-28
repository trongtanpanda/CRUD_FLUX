var URL = 'http://developer.echonest.com/api/v4/song/search?api_key=JE2S42FJUGYGJFVSE';
var Paginator = require("./Paginator.js");
var PER_PAGE = 1;
var React = require("react");
var Paging = React.createClass({
    componentDidMount: function() {
        this.onChangePage(1);
    },
    getData: function(page) {
        return $.getJSON(URL, {
            artist: 'the postal service',
            results: PER_PAGE,
            start: PER_PAGE * (page - 1)
        }).then(function(result) {
            return result.response.songs;
        });
    },
    getInitialState: function() {
        return {
            items: [],
            loading: true
        };
    },
    onChangePage: function(page) {
        this.setState({
            loading: true
        });

        this.getData(page).then(function(items) {
            this.setState({
                items: items,
                loading: false
            });
        }.bind(this));
    },
    renderItem: function(item) {
        return <li key={item.id}>{item.title}</li>;
    },
    render: function() {
        var s = this.state;

        return (
            <div>
                <h1>Paginator example</h1>
                <Paginator max={10} onChange={this.onChangePage} />
                {s.loading
                    ? <div>Loading...</div>
                    : <ul>{s.items.map(this.renderItem)}</ul>
                }
            </div>
        );
    }
});
module.exports = Paging;