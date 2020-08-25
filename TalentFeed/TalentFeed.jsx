import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null
        }

        this.init = this.init.bind(this);

    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        this.init()
        window.addEventListener('scroll', this.handleScroll);
    };

    handleScroll() {
        const win = $(window);
        if ((($(document).height() - win.height()) == Math.round(win.scrollTop())) ||
            ($(document).height() - win.height()) - Math.round(win.scrollTop()) == 1) {
           
           
            //load ajax and update states
            //call state and update state;
        }
    };

   
    render() {

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <div className="ui grid talent-feed container">
                        <div className="four wide column">
                            <CompanyProfile  />
                        </div>
                        <div className="eight wide column">
                            <TalentCard/>

                           
                            
                          
                        </div>
                        <div className="four wide column">
                            <div className="ui card">
                                <FollowingSuggestion />
                            </div>
                        </div>
                    </div>

                </div>
            </BodyWrapper>
        )
    }
}