import React, { useState, useEffect, createRef } from 'react'
import { Global, css } from '@emotion/core'
import Navbar from './Navbar'
import Footer from './Footer'
import Jumbotron from './Jumbotron'
import ContentRow from './ContentRow'
import DetailPane from './DetailPane/DetailPane'
import moment from "moment";
import { descriptions } from './descriptions';
import { videos } from './yt_videos';

import { GOOGLE_API_KEY, CALENDAR_ID, CLIENT_ID } from "./config.js";


// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var DISCOVERY_DOCS2 = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly';
var SCOPES2 = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly';

let random_descriptions = descriptions.split(".")
console.log("random descriptions: ", random_descriptions[1])
let gapi = window.gapi;

let initialValue = {
  hoverImg: null
}

let valid_types = ["mp4", "png", "jpg"]

console.log("JELKJFLDJ ", valid_types.includes("mp4"))


const initialRow = {
  category: '',
  pos: { top: 0, bottom: 0 }
}

const categories = [
  'Quantum Mechanics',
  'Calculus',
  'Geogrpahy',
  'Urban Design',
  'Principles of Business Law',
  'Foundations of Python',
  'Advanced CSS'
]



export default class Webinars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("dd, Do MMMM, h:mm A"),
      events: [],
      files: [],
      isBusy: false,
      isEmpty: false,
      isLoading: true,
      activeRow: initialRow,
      previewEvent: null,
      stateChange: false
    };
    // var that = this;

    // this.listFiles = this.listFiles.bind(this);
  }

  


  componentDidMount = async () => {
    await this.getEvents();
    await this.handleClientLoad();

    

    window.addEventListener("storage", this.localStorageUpdated)
    // const ImageContext = React.useContext(initialValue);


    // setInterval(() => {
    //   this.tick();
    //   this.componentDidMount();
    // }, 1000);
    // setInterval(() => {
    //   this.getEvents();
    // }, 60000);
  };

  componentWillUnmount = () => {
    window.removeEventListener("storage", this.localStorageUpdated);
  }

  localStorageUpdated() {
    console.log("update")
    if (!localStorage.getItem('hoveredImage')) {
        this.setState({stateChange: null})
    } 
    else if (!this.state.status) {
        this.setState({stateChange: true})
    }
}

  async getEvents () {
    let that = this;
    function start() {
      gapi.client
        .init({
          apiKey: GOOGLE_API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        })
        .then(function () {
          console.log("moment: ", moment().toISOString(), moment().endOf("year").toISOString());
          gapi.auth2.getAuthInstance().signIn();

          console.log(gapi.client.calendar);
          return gapi.client.calendar.events.list({
            'calendarId': CALENDAR_ID,
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 100,
            'orderBy': 'startTime'
          })
        })
        .then(
          response => {
            let events = response.result.items;
            console.log("Events: ", events);
            console.log("response: ", response)
            let sortedEvents = events.sort(function (a, b) {
              return (
                moment(b.start.dateTime).format("YYYYMMDD") -
                moment(a.start.dateTime).format("YYYYMMDD")
              );
            });
            // console.log("Sorted events: ", new Object(sortedEvents[0].attachments))
            console.log("Sorted events: ", sortedEvents)
            if (events.length > 0) {
              that.setState(
                {
                  events: sortedEvents,
                  isLoading: false,
                  isEmpty: false
                },
                () => {
                  that.setStatus();
                }
              );
            } else {
              that.setState({
                isBusy: false,
                isEmpty: true,
                isLoading: false
              });
            }
          },
          function (reason) {
            console.log(reason);
          }
        );
    }
    gapi.load("client:auth2", start);
  }
  // async getEvents () {
  //   let that = this;
  //   function start() {
  //     gapi.client
  //       .init({
  //         apiKey: GOOGLE_API_KEY,
  //         clientId: CLIENT_ID,
  //         discoveryDocs: DISCOVERY_DOCS2,
  //         scope: SCOPES2
  //       })
  //       .then(function () {
  //         // console.log("moment: ", moment().toISOString(), moment().endOf("year").toISOString());
  //         return gapi.client.request({
  //           path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?supportsAttachments=true&maxResults=11&orderBy=updated&timeMin=${moment().toISOString()}&timeMax=${moment()
  //             .endOf("year")
  //             .toISOString()}`
  //         });
  //       })
  //       .then(
  //         response => {
  //           let events = response.result.items;
  //           console.log("response: ", response)
  //           let sortedEvents = events.sort(function (a, b) {
  //             return (
  //               moment(b.start.dateTime).format("YYYYMMDD") -
  //               moment(a.start.dateTime).format("YYYYMMDD")
  //             );
  //           });
  //           // console.log("Sorted events: ", new Object(sortedEvents[0].attachments))
  //           console.log("Sorted events: ", sortedEvents)
  //           if (events.length > 0) {
  //             that.setState(
  //               {
  //                 events: sortedEvents,
  //                 isLoading: false,
  //                 isEmpty: false
  //               },
  //               () => {
  //                 that.setStatus();
  //               }
  //             );
  //           } else {
  //             that.setState({
  //               isBusy: false,
  //               isEmpty: true,
  //               isLoading: false
  //             });
  //           }
  //         },
  //         function (reason) {
  //           console.log(reason);
  //         }
  //       );
  //   }
  //   gapi.load("client:auth2", start);
  // }

  tick = () => {
    let time = moment().format("dddd, Do MMMM, h:mm A");
    this.setState({
      time: time
    });
  };

  setStatus = () => {
    let now = moment();
    let events = this.state.events;
    for (var e = 0; e < events.length; e++) {
      var eventItem = events[e];
      if (
        moment(now).isBetween(
          moment(eventItem.start.dateTime),
          moment(eventItem.end.dateTime)
        )
      ) {
        this.setState({
          isBusy: true
        });
        return false;
      } else {
        this.setState({
          isBusy: false
        });
      }
    }
  };

  //------------------------------GOOGLE_DRIVE_API---------------------------------------------

  
  // var authorizeButton = document.getElementById('authorize_button');
  // var signoutButton = document.getElementById('signout_button');

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  handleClientLoad() {
    console.log("client load -- google drive")
    gapi.load('client:auth2', this.initClient);
  }


  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  initClient = () => {
    console.log("initclient")
    gapi.client.init({
      apiKey: GOOGLE_API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => this.listFiles())
  }

  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.listFiles();
    } else {
      return;
    }
  }
  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  /**
   * Print files.
   */
  listFiles = () => {
    console.log("listfiles")
    gapi.client.drive.files.list({
      'pageSize': 100,
      'fields': "nextPageToken, files(id, name)",
      "mimeType": "image/jpeg"
    }).then((response) => {
      // this.appendPre('Files:');
      var files = response.result.files;
      console.log("Files: ", files);
      this.setState({ files: files });


      this.add_attachments()

      // return files;

      // if (files && files.length > 0) {
      //   for (var i = 0; i < files.length; i++) {
      //     var file = files[i];
      //     this.appendPre(file.name + ' (' + file.id + ')');
      //   }
      // } else {
      //   this.appendPre('No files found.');
      // }
    });
  }

  //-----------------------------------------------------
    

  changePreview = async (event) => {
    console.log("previewEvent: ", event)
    await this.setState({ previewEvent: event })
    // console.log(this.state.previewEvent.attachments)
  }

  add_attachments = async () => {
    // for (let i = 0; i < events.length; i++) {
      
    // }


    // let driveFiles = await gapi.client.drive.files.list({
    //   'pageSize': 20,
    //   'fields': "nextPageToken, files(id, name)"
    // }).then((response) => {
    //   // this.appendPre('Files:');
    //   var files = response.result.files;
      
    //   console.log("files... ", files);
    //   return files;
    // })

    // console.log("drive files: ", driveFiles);
    let driveFiles = [];
    for (let i = 0; i < this.state.files.length; i++){
      // console.log(valid_types.includes(this.state.files[i].name.split(".")[1]))
      if (valid_types.includes(this.state.files[i].name.split(".")[1])) {
        // console.log("KJFSDFJSDFJSDFKJLSDF")
        driveFiles.push(this.state.files[i])
      }
    }

    console.log("Drive files: ", driveFiles)
    if (driveFiles.length > 0) {
      for (let i = 0; i < driveFiles.length; i++) {
        // console.log(random_descriptions[i]);
        
        // console.log(driveFiles[i].id)
        var event = {
          'summary': `Restricted #${i}`,
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': random_descriptions[i],
          "start": {
            "dateTime": "2021-04-04T07:49:37",
            "timeZone": "America/New_York"
          },
          "end": {
            "dateTime": "2021-04-5T17:00:00-07:00",
            "timeZone": "America/New_York"
          },
          'attachments': [{
            "fileId": driveFiles[i].id,
            "fileUrl": `https://drive.google.com/file/d/${driveFiles[i].id}/view?usp=drive_web`,
            // "fileUrl": `https://www.youtube.com/embed/${videos.items[parseInt(Math.random(0, 1) * 20)].id.videoId}`,
            // "iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/image/jpeg",
            // "mimeType": "image/jpeg",
            "title": driveFiles[i].name
          }],

        };
    
        // var request = gapi.client.calendar.events.insert({
        //   'calendarId': CALENDAR_ID,
        //   'supportsAttachments': true,
        //   'resource': event,
        //   // 'body': event
        // })//.then(event => console.log(event.htmlLink));
        
        // // this.setState({ events: [] })
        // await request.execute((event) => {
        //   console.log(event);
        //   this.setState({ events: [...this.state.events, event] })

        // }) 
  
      }
      
    }

    // console.log("request: ", request);
    console.log((new Date()).toISOString())

    gapi.client.calendar.events.list({
      'calendarId': CALENDAR_ID,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 30,
      'orderBy': 'startTime'
    }).then(response =>
      this.setState({ events: response.result.items }))
    
    console.log("the events: ", this.state.events)
    
    // console.log("here: ", this.state.events[0])
    // console.log(response.result.items)))

    // console.log("attachments: ", this.state.events)

    // // let request = gapi.client.calendar.events.list({
    // //   'calendarId': CALENDAR_ID,
    // //   'timeMin': (new Date()).toISOString(),
    // // }).then(response => {
    // //   return response.result.items[0]
    // // })

    // // console.log("request: ", request)

    
    // var event = gapi.client.calendar.events.get({
    //   'calendarId': CALENDAR_ID,
    //   'eventId': 'c8qmaphk75hm2b9lcooj4b9k6ti6ab9pchgm2b9pccp62oj4c5h64chl64'
    // }).then(() => {
    //   let attachments = {
    //     fileId: "1U52pDk18kCpvzon7nl99cIUYGMNB_-q0",
    //     fileUrl: "https://drive.google.com/file/d/1U52pDk18kCpvzon7nl99cIUYGMNB_-q0/view?usp=drive_web",
    //     iconLink: "https://drive-thirdparty.googleusercontent.com/16/type/image/jpeg",
    //     mimeType: "image/jpeg",
    //     title: "IMG_20200929_134306.jpg"
    //   }

    //   event.attachments = attachments;
    // }).then(() => {
    //   gapi.client.calendar.events.patch({
    //     'calendarId': 'primary',
    //     'eventId': "c8qmaphk75hm2b9lcooj4b9k6ti6ab9pchgm2b9pccp62oj4c5h64chl64",
    //     'resource': event,
    //     // 'body': changes,
    //     'supportsAttachments': true
    //   }).execute(event => {
    //     console.log(event);
    //   })
    // })

    

    // event.attachments = attachments;


    // let changes = {
    //   'attachments': attachments
    // }

    // var request = gapi.client.calendar.events.patch({
    //   'calendarId': 'primary',
    //   'eventId': "c8qmaphk75hm2b9lcooj4b9k6ti6ab9pchgm2b9pccp62oj4c5h64chl64",
    //   'resource': event
    //   // 'body': changes,
    //   // 'supportsAttachments': true
    // });

    // request.execute(event => {
    //   console.log(event);
    // })


    // console.log(gapi.client.calendar.events.list({
    //   'calendarId': CALENDAR_ID,
    //   'timeMin': (new Date()).toISOString(),
    //   'showDeleted': false,
    //   'singleEvents': true,
    //   'maxResults': 10,
    //   'orderBy': 'startTime'
    // }).get(eventId = this.state.events[0].id))


    

    // console.log("Attachments: ", events);
    // console.log(gapi.client.calendar.events.list(calendarId='primary').execute())
    // console.log(gapi.client.calendar.events.get(calendarId = CALENDAR_ID, eventId = this.state.events[0].id))//, gapi.client.calendar.events.list);

  }


  setActive = activeRow => {
    activeRow.category ? this.setState({ activeRow: activeRow }) : this.setState({ activeRow: initialRow })
  }

  
  render() {
    const navRef = createRef()

    const { time, events } = this.state;
    const { category, pos: { top, bottom } } = this.state.activeRow

    // useEffect(() => {
    //   if (!category) return
    //   const navHeight = navRef.current.offsetHeight
  
    //   window.scrollTo({
    //     top: top + window.scrollY - navHeight,
    //     left: 0,
    //     behavior: 'smooth'
    //   })
    // }, [category])

    
    return (
      <>
        {/* {console.log("rerender")} */}
        <Global styles={GlobalCSS} />
        <Navbar ref={navRef} />
        {/* {console.log("events: ", this.state.events)} */}
        {console.log("previewEvent: ", this.state.previewEvent)}
        <Jumbotron event={this.state.previewEvent}/>

        {/* {console.log(categories)} */}

        <div className="all-content-wrapper">
          {console.log(categories.slice(0))
          }
          {categories.slice(0).map((category, index) => (
            <ContentRow key={category} category={category} changePreview={this.changePreview} events={this.state.events.slice(index*10, index*10 + 10)} setActive={this.setActive} />
          ))}
        </div>

        <DetailPane
          category={category}
          top={bottom + window.scrollY}
          setActive={this.setActive}
          event = {this.state.previewEvent}
        />
        <Footer />
      </>
    )
  }
}


  // render() {
  //   const { time, events } = this.state;

  //   console.log("events: ", events);
  //   let eventsList = events.map(function(event) {
  //     return (
  //       <a
  //         className="list-group-item"
  //         href={event.htmlLink}
  //         target="_blank"
  //         key={event.id}
  //       >
  //         {console.log(event.description)}
  //         {console.log(event)}
  //         <div>
  //           {/* {event.description}{" "} */}
  //           {/* {event.attachments !== undefined ? console.log("here: ", event.attachments[0].fileUrl.split("/")[5]) : ''} */}
  //           {event.summary}
  //           {event.attachments !== undefined ? <img src={`https://drive.google.com/thumbnail?id=${(event.attachments[0].fileUrl.split("/")[5])}`}/> : ''}

  //         </div>
  //         <span className="badge">
  //           {moment(event.start.dateTime).format("h:mm a")},{" "}
  //           {moment(event.end.dateTime).diff(
  //             moment(event.start.dateTime),
  //             "minutes"
  //           )}{" "}
  //           minutes, {moment(event.start.dateTime).format("MMMM Do")}{" "}
  //         </span>
  //       </a>
  //     );
  //   });

  //   let emptyState = (
  //     <div className="empty">
  //       <img src={welcomeImage} alt="Welcome" />
  //       <h3>
  //         No meetings are scheduled for the day. Create one by clicking the
  //         button below.
  //       </h3>
  //     </div>
  //   );

  //   let loadingState = (
  //     <div className="loading">
  //       <img src={spinner} alt="Loading..." />
  //     </div>
  //   );

  //   return (
  //     <>
  //       <Global styles={GlobalCSS} />
  //       <Navbar ref={navRef} />
  
  //       <Jumbotron>
  //         {console.log(categories)}
  //         <ContentRow category={categories[0]} setActive={setActive} />
  //       </Jumbotron>
  
  //       {categories.slice(1).map(category => (
  //         <ContentRow key={category} category={category} setActive={setActive} />
  //       ))}
  
  //       <DetailPane
  //         category={category}
  //         top={bottom + window.scrollY}
  //         setActive={setActive}
  //       />
  //       <Footer />
  //     </>
  //   )
  // }




/**@function Webinars
 */
// const Webinars = () => {
//   const [activeRow, setActiveRow] = useState(initialRow)

//   const {
//     category,
//     pos: { top, bottom }
//   } = activeRow

//   const navRef = createRef()

//   useEffect(() => {
//     if (!category) return
//     const navHeight = navRef.current.offsetHeight

//     window.scrollTo({
//       top: top + window.scrollY - navHeight,
//       left: 0,
//       behavior: 'smooth'
//     })
//   }, [category])

//   const setActive = activeRow => {
//     activeRow.category ? setActiveRow(activeRow) : setActiveRow(initialRow)
//   }

//   return (
//     <>
//       <Global styles={GlobalCSS} />
//       <Navbar ref={navRef} />

//       <Jumbotron>
//         {console.log(categories)}
//         <ContentRow category={categories[0]} setActive={setActive} />
//       </Jumbotron>

//       {categories.slice(1).map(category => (
//         <ContentRow key={category} category={category} setActive={setActive} />
//       ))}

//       <DetailPane
//         category={category}
//         top={bottom + window.scrollY}
//         setActive={setActive}
//       />
//       <Footer />
//     </>
//   )
// }

const GlobalCSS = css`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html,
  body,
  .app {
    margin: 0;
    min-height: 100%;
    width: 100%;
  }

  body {
    background: #151515;
  }

  a {
    text-decoration: none;
    color: white;
  }

  p {
    font-size: 20px;
  }

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }

  button {
    background-color: rgba(51, 51, 51, 0.8);
    border: 1px solid white;
    padding: 0.75em 2.3em;
    border-radius: 0.2vw;
    box-shadow: none;
    font-size: 1.1vw;
    color: white;
    margin-right: 15px;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.4px;
  }

  .Icon {
    font-size: 18.5px;
    cursor: pointer;
    color: white;
  }

  .all-content-wrapper {
    position: relative;
    margin-top: 67vh;
  }
`
