import React from 'react';
import { Loader } from 'semantic-ui-react';
import Cookies from 'js-cookie';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

       

        this.state = {
            employerData: {

                companyContact: {
                    name: '', phone: '', email: '', location: { city: '', country: '' },
                }
            },
            
        };
        this.loadData = this.loadData.bind(this);
       // this.updateWithoutSave = this.updateWithoutSave.bind(this);
    }

   

    componentDidMount() {
        this.loadData()
    }



    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://standardtaskprofileservices.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer
                    console.log("employerData", employerData)
                    this.setState({
                        employerData: employerData
                    })
                }
                
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        
    }

    
    render() {        

        return (
            <div className="ui card">
                <div className="content">
                    <div className="center aligned author">
                        <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
                    </div>

                    <div className="center aligned header">{this.state.employerData.companyContact.name}</div>
                    
                    <div className="center aligned description">
                        <div className="meta">
                        <a>
                                <i aria-hidden="true" className="icon marker pin"></i>
                                {this.state.employerData.companyContact.location.city, this.state.employerData.companyContact.location.country}
                        </a>
                            </div>
                    </div>
                    <div className="center aligned description">
                        <p>Jenny is a student studying Media Management at the New School</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="content">
                        <div>
                    <a>
                                <i aria-hidden="true" className="call icon"></i>
                                :{this.state.employerData.companyContact.phone}
                    </a>
                        </div>
                        <div>
                    <a>
                                <i aria-hidden="true" className="mail icon"></i>
                                :{this.state.employerData.companyContact.email}
                    </a>
                            </div>
                    </div>

                </div>
            </div>
        )
    }
}