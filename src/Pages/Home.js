import React, { Component, useState } from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Home() {
    const [showZoomContainer, setShow] = useState(false)

    // setup your signature endpoint here: https:/ / github.com / zoom / meetingsdk - sample - signature - node.js
    var signatureEndpoint = 'https://zoomsignature.bpssumsel.com'
    // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
    var sdkKey = 'wPBUtlhh9Y0R5FctIXKQjFBP64SNqOAeMk3C'
    var meetingNumber = '82251701448'
    var role = 0
    var leaveUrl = 'http://localhost:3000'
    var userName = 'Konsultasi Virtual'
    var userEmail = ''
    var passWord = '057161'
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

    function getSignature() {
        setShow(true)
        var kode = document.getElementById('kodeKonsultasi')
        console.log(kode)
        if (!kode.value) {
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: <strong>Error!</strong>,
                html: <p>Kode Konsultasi Harus Diisi. Registrasi Dahulu!</p>,
                icon: 'error'
            })
        } else {
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


    }

    function makeid(length) {
        var result = 'K-';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    function getKode() {
        const MySwal = withReactContent(Swal)
        var kodeKonsul = makeid(3)
        var jenis = document.getElementById('input-j-konsultasi')
        var latar_belakang = document.getElementById('input-jlb')
        var nama = document.getElementById('input-nama')
        var email = document.getElementById('input-email')

        if (!email.value | !nama.value | (latar_belakang == -1) | (jenis == -1)) {
            MySwal.fire({
                title: <strong>Registrasi Gagal!</strong>,
                html: <p>Isian Harus Lengkap</p>,
                icon: 'error'
            })
        } else {
            var modal_register = document.getElementById('largemodal')
            // modal_register.setShow('false')

            MySwal.fire({
                title: <strong>Registrasi Berhasi!</strong>,
                html: <p>Kode Konsultasi : {kodeKonsul} </p>,
                icon: 'success'
            })
        }



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
                                        <li class="breadcrumb-item active" aria-current="page">Home</li>
                                    </ol>
                                </div>



                            </div>
                            {/* PAGE-HEADER END */}


                            {/* RENDER ZOOM */}

                            {
                                showZoomContainer &&
                                <div class="row" id='containerZoom'>
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
                            }

                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-xl-6 col-lg-6 feature">
                                                    <div id="carousel-captions1" class="carousel slide" data-bs-ride="carousel">
                                                        <div class="carousel-inner">
                                                            <div class="carousel-item active carousel-item-start">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok1.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-caption">
                                                                    
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="carousel-item carousel-item-next carousel-item-start">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok2.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                   
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok3.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok4.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok5.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok6.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok7.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok8.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok9.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok10.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok11.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok12.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok13.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok14.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="carousel-item">
                                                                <img class="d-block w-100" alt="" src="../assets/images/pojok/pojok15.jpg" data-bs-holder-rendered="true" />
                                                                <div class="carousel-item-background d-none d-md-block"></div>
                                                                <div class="carousel-caption d-none d-md-block">
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a class="carousel-control-prev" href="#carousel-captions1" role="button" data-bs-slide="prev">
                                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                            <span class="sr-only">Previous</span>
                                                        </a>
                                                        <a class="carousel-control-next" href="#carousel-captions1" role="button" data-bs-slide="next">
                                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                            <span class="sr-only">Next</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6 col-lg-6">
                                                    <div class="mt-1">
                                                        <h4 class="fw-semibold">Tentang INSVIRASI</h4>
                                                        <p class="mb-0 text-justify"> INSVIRASI (Interaksi Virtual antara Mahasiswa dan Statistisi) merupakan layanan dari Pojok Statistik BPS Provinsi Sumatera Selatan yang menyediakan pelayanan konsultasi secara virtual dengan pegawai BPS Provinsi Sumatera Selatan terkait data official statistik, metodologi statistik, dan lain sebagainya. Hal ini untuk mengatasi keterbatasan dari kami yang tidak dapat setiap hari berada di Pojok Statistik. Mahasiswa/i atau pihak lainnya yang mengunjungi Pojok Statistik dan ingin melakukan konsultasi namun saat itu tidak ada pegawai kami di Pojok Statistik, maka dapat menggunakan INSVIRASI untuk melakukan konsultasi secara virtual dengan Pegawai BPS Provinsi Sumatera Selatan. </p>
                                                    </div>
                                                    <div class="row mt-4">
                                                        <div class="btn-list text-center">
                                                            <button type="button" class="btn btn-info w-lg mb-1" data-bs-toggle="modal" data-bs-target="#largemodal">Registrasi Untuk Konsultasi</button>

                                                        </div>
                                                    </div>

                                                    <div class="row mt-8">
                                                        <p class="mb-0">Apabila telah registrasi, masukkan kode konsultasi & mulai konsultasi</p>

                                                        <div class="col">
                                                            <input id='kodeKonsultasi' type="text" class="form-control" placeholder="Input Kode Konsultasi" />
                                                        </div>
                                                        <span class="col-auto">
                                                            <button onClick={getSignature} class="btn btn-primary"><i class="fa fa-video-camera"></i> Mulai Konsultasi Virtual</button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PELAYANAN */}
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h3 class="card-title">Pelayanan Pojok Statistik</h3>
                                        </div>
                                        <div class="card-body">
                                            <div class="text-wrap">
                                                <p class='text-justify'>Pojok Statistik merupakan layanan kolaborasi antara Badan Pusat Statistik (BPS) dengan Perguruan Tinggi yang berfungsi sebagai media layanan dan promosi statistik di lingkungan universitas. Pojok Statistik di Universitas Sriwijaya ini merupakan salah satu dari 11 Pojok Statistik di universitas yang berada di 9 Provinsi di Indonesia sampai saat ini.</p>
                                                <p class='text-justify'>
                                                    <strong>Tujuan/Manfaat dari Pojok Statistik :</strong>
                                                    <ul class='list-style-1'>
                                                        <ul>
                                                            <li>Meningkatkan layanan dan promosi statistik di lingkungan universitas</li>
                                                            <li>Meningkatkan literasi dan kesadaran akan data statistik</li>
                                                            <li>Memperkuat Sistem Statistik Nasional (SSN)</li>
                                                        </ul>
                                                    </ul>
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* PELAYANAN 2*/}
                            <div class="row">
                                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-3 ">
                                    <div class="card service">
                                        <div class="card-body" style={{ "height": "300px" }}>
                                            <div class="item-box text-center">
                                                <div class=" text-center  mb-4 text-primary"><i class="icon ion-images"></i></div>
                                                <div class="item-box-wrap">
                                                    <h5 class="mb-2">Galeri Infografis</h5>
                                                    <p class="text-muted mb-0">Layanan ini menyediakan berbagai infografis dari data BPS seluruh Indonesia. Layanan ini dapat diakses <a target={'blank_'} href='https://pojokstatistik.bps.go.id/infographics'><strong>di sini</strong></a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-3">
                                    <div class="card service">
                                        <div class="card-body" style={{ "height": "300px" }}>
                                            <div class="item-box text-center">
                                                <div class=" text-center text-danger-gradient mb-4"><i class="icon ion-film-marker"></i></div>
                                                <div class="item-box-wrap">
                                                    <h5 class="mb-2">Galeri Videografis</h5>
                                                    <p class="text-muted mb-0">Layanan ini menyediakan berbagai videografis dari data BPS seluruh Indonesia. Layanan ini dapat diakses <a target={'blank_'} href='https://pojokstatistik.bps.go.id/videographics'><strong>di sini</strong></a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-3">
                                    <div class="card service">
                                        <div class="card-body" style={{ "height": "300px" }}>
                                            <div class="item-box text-center">
                                                <div class=" text-center text-success mb-4"><i class="ti-book"></i></div>
                                                <div class="item-box-wrap">
                                                    <h5 class="mb-2">Ruang Literasi</h5>
                                                    <p class="text-muted mb-0">Layanan ini menyediakan akses untuk publikasi dan literatur yang ada di perpustakaan BPS. Layanan ini dapat diakses <a target={'blank_'} href='https://webapi.bps.go.id/consumen/88582261b976073c4aee562850e51881?redirect_uri=https://perpustakaan.bps.go.id/opac'><strong>di sini</strong></a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-3">
                                    <div class="card service">
                                        <div class="card-body" style={{ "height": "300px" }}>
                                            <div class="item-box text-center">
                                                <div class="text-center text-warning-gradient mb-4"><i class="icon icon-action-redo"></i></div>
                                                <div class="item-box-wrap">
                                                    <h5 class="mb-2">Edukasi Statistik</h5>
                                                    <p class="text-muted mb-0">Layanan yang menyediakan berbagai informasi mengenai jadwal kegiatan pembelajaran statistik, dalam bentuk seminar serta kuliah umum yang diselenggarakan oleh BPS serta Perguruan Tinggi yang tergabung dalam Pojok Statistik.  Layanan ini dapat diakses <a target={'blank_'} href='https://pojokstatistik.bps.go.id/education'><strong>di sini</strong></a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* DATA BPS */}
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h3 class="card-title">Data BPS Provinsi Sumatera Selatan</h3>
                                        </div>
                                        <div class="card-body">
                                            <div class="text-wrap">
                                                <p class='text-justify'>Data Official Statistik BPS Provinsi Sumatera Selatan dapat diakses melalui website resmi BPS Provinsi Sumatera Selatan di (<a href='https://sumsel.bps.go.id/' target={'blank_'}>sumsel.bps.go.id</a>)</p>

                                                <p class='text-justify'>Data yang dihasilkan antara lain:</p>


                                            </div>

                                            <div class="row">
                                                <div class="col-lg-6 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-2 col-lg-3 feature">
                                                                    <div class="fa-stack fa-lg fa-1x border btn-blue mb-3">
                                                                        <i class="icon icon-people text-white"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-10 col-lg-9">
                                                                    <div class="mt-1">
                                                                        <h4 class="fw-semibold">Sosial dan Kependudukan</h4>
                                                                        <p class="mb-0">Data ini meliputi data, Agama,

                                                                            Gender,

                                                                            Geografi,

                                                                            Iklim,

                                                                            Indeks Pembangunan Manusia,

                                                                            Kemiskinan,

                                                                            Kependudukan,

                                                                            Kesehatan,

                                                                            Konsumsi dan Pengeluaran,

                                                                            Pemerintahan,

                                                                            Pendidikan,

                                                                            Perumahan

                                                                            Politik dan Keamanan,

                                                                            Sosial Budaya, dan
                                                                            Tenaga Kerja.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-2 col-lg-3 feature">
                                                                    <div class="fa-stack fa-lg fa-1x border bg-warning mb-3">
                                                                        <i class="fa fa-building-o fa-stack-1x text-white"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-10 col-lg-9">
                                                                    <div class="mt-1">
                                                                        <h4 class="fw-semibold">Ekonomi dan Perdagangan</h4>
                                                                        <p class="mb-0">Data ini meliputi data, Ekspor-Impor,

                                                                            Industri,

                                                                            Inflasi,

                                                                            Input output,

                                                                            Keuangan,

                                                                            Konstruksi,

                                                                            Nilai Tukar Petani,

                                                                            Pariwisata,

                                                                            Produk Domestik Regional Bruto (Kab/Kota dan Antar Provinsi),

                                                                            Produk Domestik Regional Bruto (Lapangan Usaha),

                                                                            Produk Domestik Regional Bruto (Pengeluaran),

                                                                            Sensus Ekonomi, dan

                                                                            Transportasi.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-2 col-lg-3 feature">
                                                                    <div class="fa-stack fa-lg fa-1x border bg-green mb-3">
                                                                        <i class="mdi mdi-barley fa-stack-1x text-white"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-10 col-lg-9">
                                                                    <div class="mt-1">
                                                                        <h4 class="fw-semibold">Pertanian dan Pertambangan</h4>
                                                                        <p class="mb-0">Data ini meliputi data, Energi,

                                                                            Hortikultura,

                                                                            Kehutanan,

                                                                            Perikanan,

                                                                            Perkebunan,

                                                                            Peternakan, dan

                                                                            Tanaman Pangan.



                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-2 col-lg-3 feature">
                                                                    <div class="fa-stack fa-lg fa-1x border bg-danger mb-3">
                                                                        <i class="fa fa-camera fa-stack-1x text-white"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-10 col-lg-9">
                                                                    <div class="mt-1">
                                                                        <h4 class="fw-semibold">Berita Resmi Statistik</h4>
                                                                        <p class="mb-0">RS (Berita Resmi Statistik) merupakan bentuk publikasi oleh BPS sebagai penyelenggara statistik dasar. BRS dirilis setiap awal bulan.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-2 col-lg-3 feature">
                                                                    <div class="fa-stack fa-lg fa-1x border bg-purple mb-3">
                                                                        <i class="fa fa-pencil-square-o fa-stack-1x text-white"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-10 col-lg-9">
                                                                    <div class="mt-1">
                                                                        <h4 class="fw-semibold">Publikasi</h4>
                                                                        <p class="mb-0">Publikasi di web BPS Provinsi Sumatera Selatan berisi seluruh publikasi dari seluruh kegiatan/bidang atau angka yang dihasilkan oleh BPS Provinsi Sumatera Selatan.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PETUNJUK */}
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="card">
                                        <div class="card-header ">
                                            <h6 class="main-content-label mb-0">Petunjuk Penggunaan INSVIRASI</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="vtimeline">
                                                <div class="timeline-wrapper timeline-wrapper-primary">
                                                    <div class="timeline-badge"></div>
                                                    <div class="timeline-panel">
                                                        <div class="timeline-heading">
                                                            <h6 class="timeline-title">Kunjungi Pojok Statistik</h6>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <p>Kunjungi Pojok Statistik BPS Provinsi Sumatera Selatan yang bertempat di Perpustakaan Universitas Sriwijaya (UNSRI)</p>
                                                        </div>
                                                        <div class="timeline-footer d-flex align-items-center flex-wrap">
                                                            <i class="fe fe-heart  text-muted mx-1"></i>
                                                            
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="timeline-wrapper timeline-inverted timeline-wrapper-secondary">
                                                    <div class="timeline-badge"></div>
                                                    <div class="timeline-panel">
                                                        <div class="timeline-heading">
                                                            <h6 class="timeline-title">Lakukan Registrasi</h6>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <p>Lakukan registrasi pada Aplikasi INSVIRASI dengan mengisikan data diri dan jenis konsultasi.</p>
                                                        </div>
                                                        <div class="timeline-footer d-flex align-items-center flex-wrap">
                                                            <i class="fe fe-heart  text-muted mx-1"></i>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="timeline-wrapper timeline-wrapper-info">
                                                    <div class="timeline-badge"></div>
                                                    <div class="timeline-panel">
                                                        <div class="timeline-heading">
                                                            <h6 class="timeline-title">Mendapatkan Kode Konsultasi</h6>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <p>Setelah melakukan registrasi anda akan mendapatkan kode konsultasi. Kode tersebut akan dimasukkan ke form untuk memulai konsultasi.</p>
                                                        </div>
                                                        <div class="timeline-footer d-flex align-items-center flex-wrap">
                                                            <i class="fe fe-heart  text-muted mx-1"></i>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="timeline-wrapper timeline-inverted timeline-wrapper-danger">
                                                    <div class="timeline-badge"></div>
                                                    <div class="timeline-panel">
                                                        <div class="timeline-heading">
                                                            <h6 class="timeline-title">Memulai Konsultasi</h6>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <p>Masukkan kode konsultasi yang didapat pada form yang telah disediakan kemudian tekan tombol Mulai Konsultasi Virtual untuk memulai.</p>
                                                            
                                                        </div>
                                                        <div class="timeline-footer d-flex align-items-center flex-wrap">
                                                            <i class="fe fe-heart  text-muted mx-1"></i>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div class="timeline-wrapper timeline-wrapper-success">
                                                    <div class="timeline-badge"></div>
                                                    <div class="timeline-panel">
                                                        <div class="timeline-heading">
                                                            <h6 class="timeline-title">Support Team sent you an email</h6>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <p>Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem plugg dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle quora plaxo ideeli hulu weebly balihoo....</p>
                                                            <a class="btn ripple btn-primary text-white mb-3">Read more</a>
                                                        </div>
                                                        <div class="timeline-footer d-flex align-items-center flex-wrap">
                                                            <i class="fe fe-heart  text-muted mx-1"></i>
                                                            <span>25</span>
                                                            <span class="ms-md-auto"><i class="fe fe-calendar text-muted mx-1"></i>25th Sep 2017</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="timeline-wrapper timeline-inverted timeline-wrapper-warning">
                                                    <div class="timeline-badge"></div>
                                                    <div class="timeline-panel">
                                                        <div class="timeline-heading">
                                                            <h6 class="timeline-title">Mr. Doe shared a video</h6>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <div class="embed-responsive embed-responsive-16by9 mb-3">
                                                                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/XZmGGAbHqa0?rel=0&amp;controls=0&amp;showinfo=0" allowfullscreen=""></iframe>
                                                            </div>
                                                        </div>
                                                        <div class="timeline-footer d-flex align-items-center flex-wrap">
                                                            <i class="fe fe-heart  text-muted mx-1"></i>
                                                            <span>32</span>
                                                            <span class="ms-md-auto"><i class="fe fe-calendar text-muted mx-1"></i>19th Sep 2017</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="timeline-wrapper timeline-wrapper-dark">
                                                    <div class="timeline-badge"></div>
                                                    <div class="timeline-panel">
                                                        <div class="timeline-heading">
                                                            <h6 class="timeline-title">Sarah Young accepted your friend request</h6>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cupiditate, delectus deserunt doloribus earum eveniet explicabo fuga iste magni maxime</p>
                                                        </div>
                                                        <div class="timeline-footer d-flex align-items-center flex-wrap">
                                                            <i class="fe fe-heart text-muted me-1"></i>
                                                            <span>26</span>
                                                            <span class="ms-md-auto"><i class="fe fe-calendar text-muted mx-1"></i>15th Sep 2017</span>
                                                        </div>
                                                    </div>
                                                </div> */}
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

            {/* MODAL */}
            <div class="modal fade" id="largemodal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg " role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" >Registrasi Konsultasi</h5>
                            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Jenis Konsultasi <span class="text-red">*</span></label>
                                    <select id='input-j-konsultasi' class="form-control" data-bs-placeholder="Select" tabindex="-1" aria-hidden="true">
                                        <option value="1">Konsultasi Data Statistik</option>
                                        <option value="2">Konsultasi Metodologi Statistik</option>
                                        <option value="3">Permintaan Data</option>
                                        <option value="4">Lainnya</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Latar Belakang Anda <span class="text-red">*</span></label>
                                    <select id='input-lb' class="form-control" data-bs-placeholder="Select" tabindex="-1" aria-hidden="true">
                                        <option value="1">Mahasiswa/Akademisi</option>
                                        <option value="2">Pegawai Pemerintahan</option>
                                        <option value="3">Umum</option>
                                        <option value="4">Lainnya</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Email <span class="text-red">*</span></label>
                                    <input id='input-email' type="email" class="form-control" placeholder="Email" />
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Nama Lengkap <span class="text-red">*</span></label>
                                    <input id='input-nama' type="text" class="form-control" placeholder="Nama Lengkap" />
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={getKode} id='submit-register' class="btn btn-primary" data-bs-dismiss="modal">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>








    )

}
export default Home;