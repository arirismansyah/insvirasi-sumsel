import React, { Component } from 'react'
import { Link } from 'react-router-dom';

function Header () {
    
        return (
            <div class="header app-header header-1 header-style p-4 sticky">
                <div class="container col-12">
                    <div class="d-flex align-items-center col-12">

                        <a class="header-brand" href="/">
                            <img src="../assets/images/brand/logo_pojok_statistik.svg" class="header-brand-img logo-3" alt="logo" />
                        </a>
                        <a class="header-brand" href="https://sumsel.bps.go.id">
                            <img src="../assets/images/brand/logo_bps_sumsel.png" class="header-brand-img logo-3" alt="logo" />
                        </a>
                        <a class="header-brand" href="https://unsri.ac.id">
                            <img src="../assets/images/brand/logo_unsri.png" class="header-brand-img logo-3" alt="logo" />
                        </a>
                        {/* LOGO */}

                        
                            <h1 class="page-title">INSVIRASI POJOK STATISTIK BPS SUMSEL</h1>
                        


                        <div class="d-flex order-lg-2 ms-auto header-right-icons ">

                            {/* <ul class="nav nav-pills nav-pills-circle">
                                <li class="nav-item">
                                    <a class="nav-link border py-2 px-4 m-1" id="tab1" href="/" role="tab" aria-selected="false">
                                        <span class="nav-link-icon d-block"><i class="fe fe-home"></i> Home</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link border py-2 px-4 m-1" id="tab2" href="/" role="tab" aria-selected="false">
                                        <span class="nav-link-icon d-block"><i class="fa fa-video-camera"></i> Konsultasi </span>
                                    </a>
                                </li>

                            </ul> */}

                            <div class="dropdown d-md-flex">
                                <a class="nav-link icon full-screen-link nav-link-bg">
                                    <i class="fe fe-minimize fullscreen-button"></i>
                                </a>
                            </div>

                            {/* FULL-SCREEN */}

                        </div>
                        <a href="javascript:void(0);" class="header-toggler d-lg-none ms-lg-0" data-bs-toggle="collapse" data-target="#headerMenuCollapse">
                            <span class="header-toggler-icon"></span>
                        </a>
                    </div>
                </div>
            </div>
        )
    
}
export default Header;