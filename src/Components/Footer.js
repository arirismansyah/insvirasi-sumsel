import React, { Component } from 'react'
class Footer extends Component {
    render() {
        return (

            <div class="footer border-top-0 footer-1">
                <div class="container">
                    <div class="row align-items-center text-center">
                        <div class="col-lg-6 col-md-6 d-none d-md-block ">
                            <div class="social">
                                <ul class="text-center m-0 ">
                                    <li>
                                        <a class="social-icon" href=""><i class="fa fa-facebook"></i></a>
                                    </li>
                                    <li>
                                        <a class="social-icon" href=""><i class="fa fa-twitter"></i></a>
                                    </li>
                                    <li>
                                        <a class="social-icon" href=""><i class="fa fa-rss"></i></a>
                                    </li>
                                    <li>
                                        <a class="social-icon" href=""><i class="fa fa-youtube"></i></a>
                                    </li>
                                    <li>
                                        <a class="social-icon" href=""><i class="fa fa-linkedin"></i></a>
                                    </li>
                                    <li>
                                        <a class="social-icon" href=""><i class="fa fa-google-plus"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 text-end privacy">
                            <a href="javascript:void(0);" class="btn btn-link" >Privacy</a>
                            <a href="javascript:void(0);" class="btn btn-link" >Terms</a>
                            <a href="javascript:void(0);" class="btn btn-link" >About Us</a>
                        </div>
                    </div>
                    <div class="row align-items-center flex-row-reverse">
                        <div class="col-lg-12 col-sm-12 mt-3 mt-lg-0 text-center">
                            Copyright © 2022 <a href="javascript:void(0);">INSVIRASI</a>. Designed by IPDS BPS SUMSEL with <span class="fa fa-heart text-danger"></span> All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;