import React, { Component } from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';

import ZoomMtgEmbedded from '@zoomus/websdk/embedded'

function Conference() {

    // setup your signature endpoint here: https:/ / github.com / zoom / meetingsdk - sample - signature - node.js
    var signatureEndpoint = 'https://zoomsignature.bpssumsel.com'
    // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
    var sdkKey = 'wPBUtlhh9Y0R5FctIXKQjFBP64SNqOAeMk3C'
    var meetingNumber = '84644012498'
    var role = 0
    var leaveUrl = 'http://localhost:3000'
    var userName = 'React'
    var userEmail = ''
    var passWord = '256262'
    // pass in the registrant's token if your meeting or webinar requires registration. More info here:
    // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
    // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
    var registrantToken = ''

    function startMeeting(signature) {
        const client = ZoomMtgEmbedded.createClient()

        let meetingSDKElement = document.getElementById('meetingSDKElement')

        client.init({
            debug: true,
            zoomAppRoot: meetingSDKElement,
            language: 'en-US',
            viewLayout: 'gallery',
            customize: {
                video: {
                    isResizable: true,
                    viewSizes: {
                        default: {
                            width: 1350,
                            height: 400
                        },
                        ribbon: {
                            width: 300,
                            height: 700
                        },
                        gallery: {
                            width: 1350,
                            height: 400
                        },

                    }
                },
                meetingInfo: [
                    'topic',
                    'host',
                    'mn',
                    'pwd',
                    'telPwd',
                    'invite',
                    'participant',
                    'dc',
                    'enctype',
                ],
                toolbar: {
                    buttons: [
                        {
                            text: 'Custom Button',
                            className: 'CustomButton',
                            onClick: () => {
                                console.log('custom button')
                            }
                        }
                    ]
                }
            }
        })

        client.join({
            sdkKey: sdkKey,
            signature: signature, // role in SDK Signature needs to be 0
            meetingNumber: meetingNumber,
            password: passWord,
            userName: userName
        })

    }



    function getSignature(e) {
        e.preventDefault();

        fetch(signatureEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                meetingNumber: meetingNumber,
                role: role
            })
        }).then(res => res.json())
            .then(response => {
                startMeeting(response.signature)

            }).catch(error => {
                console.error(error)
            })
    }

    return (
        <div class="page">
            <div class="page-main">

                {/* HEADER */}
                <Header />

                <div class="main-content mt-9 ml-4">
                    <div class="side-app">


                        {/* CONTAINER */}
                        <div class="main-container container-fluid">

                            {/* PAGE-HEADER */}
                            <div class="page-header">
                                <div>
                                    <h1 class="page-title">INSVIRASI</h1>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="javascript:void(0);">Pages</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Konsultasi Virtual</li>
                                    </ol>
                                </div>
                                <div class="ms-auto pageheader-btn">
                                    <button onClick={getSignature} class="btn btn-primary btn-icon text-white me-2">
                                        <span>
                                            <i class="fa fa-video-camera"></i>
                                        </span> Ikuti Konsultasi Virtual
                                    </button>
                                    
                                </div>
                            </div>
                            {/* PAGE-HEADER END */}


                            {/* RENDER ZOOM */}
                            <div class="row">
                                <div class="row-lg-12">
                                    <div class="card">
                                        <div class="card-header ">
                                            <h6 class="main-content-label mb-0">KONSULTASI VIRTUAL</h6>
                                        </div>
                                        <div class="d-flex card-body align-items-center">
                                            <div class="d-flex align-items-center" id="meetingSDKElement">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )

}
export default Conference;