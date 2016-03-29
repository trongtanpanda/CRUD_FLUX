var React = require('react');
var router = require('./src/router');

router.run((Handler, state) => {
    React.render(<Handler {...state} />, document.body);
});