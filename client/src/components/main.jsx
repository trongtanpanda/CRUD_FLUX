var React = require("react"),
    StudentActions = require("../actions/student-action.js"),
    CourseActions = require('../actions/course-action'),
    UserStore = require("../stores/user-store"), 
    ComboCourse = require("./combb-course"),   
    StudentForm = require("./student-form"),
    StudentList = require("./student-list");
    // Message = require("./message");



var Main = React.createClass({

//     sumdays: function(data,day){    
//         switch(day){
//         case 0:return this.checkworkweek(data.su)
//         case 1:return this.checkworkweek(data.mo)
//         case 2:return this.checkworkweek(data.tu)
//         case 3:return this.checkworkweek(data.we) 
//         case 4:return this.checkworkweek(data.th)
//         case 5:return this.checkworkweek(data.fr)
//         case 6:return this.checkworkweek(data.sa)
//     }
//   },
//   checkworkweek: function(val){
//   switch(val){
//     case 'non':return 0
//     case 'half':return 0.5
//     case 'full':return 1
//   }
// },
// total: function(start, end,){
//     var that = this;
//     var fr='full';
//     var to ='morning';
//     var ww={su: 'non', mo: 'full', tu: 'full', we: 'full', th:'full', fr: 'non', sa:'non' };
//     for(var count= {sun:0}, i = start; i <= end;i.setDate(i.getDate() + 1)){ 
//             count.sun += that.sumdays(ww,i.getDay());  
//     }
// },
//     _date: function(start, end){
//         var that = this;     

        
//         var st =start.toString().substring(0,10);
//         var ed =end.toString().substring(0,10);
//         console.log(st);
//         console.log(ed);
//         if(st==ed){//-----======-----//

//         }else{//////----######-----//

//         }

//         for(var count= {sun:0}, i = start; i <= end;i.setDate(i.getDate() + 1)){ 
//             count.sun += that.sumdays(ww,i.getDay());  
//         }
        
//         return count.sun;
//     },
    _onChange: function() {

        this.setState({
            students: UserStore.getStudents(),
            message:UserStore.getMessage(),
            courses: UserStore.getCourses(),
        }); 
        if(this.state.message){
            $.bootstrapGrowl(this.state.message.message, { type: this.state.message.type, delay: 5000 } );
        }
               
    },
    getInitialState: function() {
        StudentActions.fetchAddStudentFromServer();
        CourseActions.getListCourse();
        return {
            students: UserStore.getStudents(),
            message:UserStore.getMessage(),
            courses: UserStore.getCourses(),
        }
    },
    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div className="row">
                <h1 className="text-center">Student Management</h1>
                    <div className="col-md-10 col-md-offset-1">                                                       
                    <StudentForm listCourse={this.state.courses}/>                 
                    <StudentList students={this.state.students} />
                </div>

            </div>
            
        );
    }
});

module.exports = Main;