import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'
import Cookies from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showUserView: false,
            showVideoView: true,
            talentData: [],
            feedData: [],
            loadingFeedData: true,
            activeFeed: 0,
            dataId:''
            
        }

        this.showUser = this.showUser.bind(this)
        this.showVideo = this.showVideo.bind(this)
        this.loadData = this.loadData.bind(this);
        this.renderdata = this.renderdata.bind(this);
    };

    componentDidMount() {
        this.loadData()
    
    }

    loadData() {
 
       // console.log("activefeed", this.state.talentData.length)
        
        setTimeout(() => {
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: 'https://standardtaskprofileservices.azurewebsites.net/profile/profile/getTalent',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "GET",
                data: {
                    activeFeed: this.state.talentData.length + 10,
                    limit: 10
                },
                contentType: "application/json",
                dataType: "json",
                success: function (res) {
                   
                    if (res.success == true) {
                        let talentData = null;
                        if (res) {
                            talentData = res.data
                            console.log("talentData", talentData)

                            this.setState({
                                talentData: [...this.state.talentData, ...res.data]
                            })
                           // console.log("loadingFeedData status", this.state.loadingFeedData)

                        }
                    } else {
                        this.setState({ loadingFeedData: false });
                      //  console.log("loadingFeedData status", this.state.loadingFeedData)
                    }
                   

                }.bind(this),
                error: function (res) {
                    console.log(res.status)
                }
            })
        }, 1000);

    }

    showUser(dataId) {
     //   console.log("current id", dataId)
        this.setState({
            dataId: dataId,
            showUserView: true,
            showVideoView: false,
        })
    }

    showVideo(dataId) {
      //  console.log("current id", dataId)
        this.setState({
            dataId: dataId,
            showUserView: false,
            showVideoView: true,
        })
    }

    
    render() {
        return (
            this.state.talentData.length > 0 ? this.renderdata() : 'There are no talents found for your recruitment company' 
            //There are no talents found for your recruitment company
            
            )
    }

    renderdata() {
   
        return(
            <div className="container">
               
                <InfiniteScroll
                    dataLength={this.state.talentData.length}
                    next={this.loadData}
                    hasMore={this.state.loadingFeedData}
                    loader={<h4>Loading...</h4>}      
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
               
            {this.state.talentData.map(data => {
                return (
                    <div className="ui raised link job card" >
                        <div className="content">
                            <div className="left floated header">{data.name != null ? data.name : 'N/A'}</div>
                            <div className="right floated header">
                                <i aria-hidden="true" className="icon star"></i>
                            </div>
                        </div>

                        {this.state.dataId === data.id ? 
                        this.state.showVideoView ? <div className="eight wide column">
                            <ReactPlayer url={data.videoUrl != null ? data.videoUrl : 'https://www.youtube.com/watch?v=2E93KHqU2s4'} controls onReady onStart onPause onEnded onError
                                width='100%'
                            />
                        </div> : <div className="eight wide column">
                                <div className="ui items">
                                    <div className="item">
                                        <div className="ui medium image"><img src={(data.photoId != null && data.photoId.length>0) ? data.photoId :
                                            "https://react.semantic-ui.com/images/avatar/large/matthew.png"} /></div>
                                        <div className="content">
                                            <div className="header">Talent snapshot</div>

                                            <div className="description">CURRENT EMPLOYER</div>
                                            <div className="meta">{data.currentEmployment != null ? data.currentEmployment : 'N/A'}</div>
                                            <div className="description">VISA STATUS</div>
                                            <div className="extra">{data.visa != null ? data.visa : 'N/A'}</div>
                                            <div className="description">POSITION</div>
                                            <div className="extra">Software Developer</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            : <div className="eight wide column">
                                <ReactPlayer url={data.videoUrl != null ? data.videoUrl : 'https://www.youtube.com/watch?v=2E93KHqU2s4'} controls onReady onStart onPause onEnded onError
                                    width='100%'
                                />
                            </div>}


                        <div className="content">
                            <div className="ui reversed equal width grid">

                                {this.state.dataId === data.id?this.state.showVideoView ? <div className="center aligned column" onClick={this.showUser.bind(this, data.id)}>
                                    <i aria-hidden="true" className="icon user"></i>
                                </div>
                                    : <div className="center aligned column" onClick={this.showVideo.bind(this,data.id)}>
                                        <i aria-hidden="true" className="icon video"></i>
                                    </div>
                                    : <div className="center aligned column" onClick={this.showUser.bind(this, data.id)}>
                                        <i aria-hidden="true" className="icon user"></i>
                                    </div>}



                                <div className="center aligned column">
                                    <i aria-hidden="true" className="icon file pdf outline"></i>
                                </div>
                                <div className="center aligned column">
                                    <i aria-hidden="true" className="icon linkedin"></i>
                                </div>
                                <div className="center aligned column">
                                    <i aria-hidden="true" className="icon github"></i>
                                </div>


                            </div>
                        </div>


                        <div className="extra content">
                            <div className="left floated">
                                {data.skills != null ?
                                    data.skills.map(data => {
                                        return (
                                            <button className="ui blue basic button" >{data}</button>
                                            )
                                    }) : <div>
                                        <button className="ui blue basic button">C#</button>
                                        <button className="ui blue basic button">.Net Core</button>
                                        <button className="ui blue basic button">React</button>
                                    </div>
                                    }
                                
                            </div>
                        </div>
                    </div>

                )
            })}
                    </InfiniteScroll> 
            </div>
            )
    }
}

