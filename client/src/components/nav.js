import React from 'react';
import Router from 'react-router';
var Link=Router.Link;
class Nav extends React.Component
{
    
  
  
}
 render() {
        return (
            <div id="nav">
                    <nav className="navbar navbar-static-top">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li>
                                    <div className="dropdown">
                                        <a id="dLabel" role="button" data-toggle="dropdown" className="btn adminQL " data-target="#" href="/page.html">
                                            Admin <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu multi-level dropdown-menu-list" role="menu" aria-labelledby="dropdownMenu">
                                            <li className="dropdown-submenu">
                                                <a tabindex="-1" href = "#/system-user" className="link-origin-nav">User Management<span class="caret"></span></a>
                                                <ul className="dropdown-menu">
                                                   
                                                    <li id=""><Link to="home">Home</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </li>                              

                            </ul>
                        </div>
                    </nav>
            </div>
        );
    }

export default Nav;