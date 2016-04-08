var React = require("react");
   
var SectorList = React.createClass({

    render: function() {
        var sectorList = this.props.sectors.map(function(sector, index) {
           
            return (
                <tr key={index}>
                    <td>{sector.sector_id}</td> 
                    <td>{sector.name}</td>
                    <td>{sector.short_name}</td>
                    <td>{sector.english_name}</td>                   
                    
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        <thead>
                          <tr>                            
                             <th>Mã Ngành</th> 
                             <th>Tên Ngành</th> 
                             <th>Tên viết tắt</th> 
                             <th>Tên tiếng anh </th>                             
                          </tr>
                        </thead>
                        {sectorList}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = SectorList;