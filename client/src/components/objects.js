var dataOr = [{id:1, fstname: "John", sndname: "smith"},
        {id:2, fstname: "Mathew", sndname: "Lodd"},
                {id:3, fstname: "Lenny", sndname: "Alva"},
                {id:4, fstname: "Emery", sndname: "Limford"}];

var fluxObj = Flux.Dispatcher;
var AppDispatcher = new fluxObj();

function Actions(){

  this.deleteItem = function(locationId){
    AppDispatcher.dispatch({
            actionType: 'ITEM_DELETE',
            id: locationId
        });
  }

  this.getAllData = function(){
    AppDispatcher.dispatch({
            actionType: 'GET_ALL_DATA'
        });
  }

}

var Actions = new Actions();

function deleteItem(id) {
            
    console.log('going to destory item with id' + id);
    dataOr = _.remove(dataOr, function(n) {
              return n['id'] != id;
    });
            
  console.log('dataOr');
  console.log(dataOr);
}

var CHANGE_EVENT = 'change';
var Store = new EventEmitter();

Store.prototype = {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return dataOr;
  },

  emitChange: function() {
    Store.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    Store.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    Store.removeListener(CHANGE_EVENT, callback);
  }

}

AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case 'ITEM_DELETE':
      deleteItem(action.id);
      console.log('emit delete');
      Store.prototype.emitChange();
      console.log(dataOr);
      break;

    default:
      // no op
  }
});

var Objects = React.createClass({
      getInitialState: function() {
        return {data: Store.prototype.getAll()};
      },
      componentDidMount: function() {
        Store.prototype.addChangeListener(this._onChange);
      },
      componentWillUnmount: function(){
        Store.prototype.removeChangeListener(this._onChange);
      },
      render: function() {

        return (
          <div>
            <MainTable ref="mainTable" allData={this.state.data} ItemIdProp={'id'} />
          </div>
        );
      },
      _onChange: function() {
        this.setState({data: Store.prototype.getAll()});
      }
    });
    
var MainTable = React.createClass({
        tableAsJqeryElement: {},
        getInitialState: function(){
            return {
              selectedRow: 0
            }
        },
        componentDidMount: function(){
            var self = this;

            // initialize table
            this.tableAsJqeryElement = $('#mytable').DataTable({
                "bDestroy": true,
                "bAutoWidth": false,
              "fnDrawCallback": function() {
                    self.forceUpdate();         
              } 
            });

        },
        componentDidUpdate: function(){

            // make column with checkboxes sortable
            $('#mytable').DataTable({
                "bDestroy": true
            });
            
        },
        render: function(){

            var that = this;

            var allKeys = [];
            console.log(this.props.allData);
            this.props.allData.forEach(function(element) {
                Object.keys(element).forEach(function(key) {
                    if (!(allKeys.indexOf(key) > -1)){
                        allKeys.push(key);
                    }
                });
            });

            var columnNames = _.without(allKeys, this.props.ItemIdProp);

            return (
                <div className="table-responsive">
                  <div className="toggle_column_wrapper">
                  </div>
                    <table className="table table-striped table-bordered table-hover" cellSpacing="0" id="mytable" data-click-to-select="true">
                        <TableHeader ref="tableHeader" columns={columnNames}/>
                        <TableBody ref={this.props.allData} columns={columnNames} tableData={this.props}/>
                    </table>
                </div>
            );     
        },
        componentWillUnmount: function(){
            this.tableAsJqeryElement.destroy();
        }
     });

var TableHeader = React.createClass({
      render: function() {
      
      console.log('this.props.columns');
            console.log(this.props.columns);

        var tableHeaders = this.props.columns.map(function (headerData, i) {
          return (
                <th key={i}>{headerData}</th>
          );
        });

        return (
            <thead>
              <tr>
                  <th className="icon"></th>
                  {tableHeaders}
              </tr>   
          </thead>
        );
      }
    });

    var TableBody = React.createClass({
      getInitialState: function(){
          return {
              selectedRow: -1
          };
      },
      render: function() {
        var that = this;
        counter = -1;
        
        console.log('this.props.tableData.allData');
        console.log(this.props.tableData.allData);
        
        var tableRows = this.props.tableData.allData.map(function(rowData, j) {
          counter++;
          var itemId = that.props.tableData.allData[counter]['id'];
          
          return (
            <tr key={rowData['id']}>
                <td>
                    <MinusIcon minusClick={that.handleMinusClick.bind(null, j, itemId)}/>
                </td>
                {
                  that.props.columns.map(function (column, i) {
                        if (column in rowData){
                            return <td key={i}>{rowData[column]}</td>;
                        } else {
                            return <td key={i}></td>;
                        }
                    })
                }
            </tr> 
            );
        });

        return (
            <tbody>
                {tableRows}
            </tbody>
        );
      },
      handleMinusClick: function(rowKey, id) {
          Actions.deleteItem(id);
      }
    });
    
var MinusIcon = React.createClass({
      render: function() {
        return <div onClick={this.props.minusClick}>Delete row</div>
      }
    });
 

module.exports = Objects;