import React, { Component } from 'react';
import './Encabezado.css';
import Logueo from './Logueo/Logueo.js';
//import './Logueo/logueo.css';

export default class Encabezado extends Component {
    componentDidMount() {
        let vidlog;
        vidlog = document.getElementById("vidlog");
        vidlog.addEventListener("click", playopause, false);
//        setTimeout(playopause, 6000);
        function playopause() {
            vidlog.paused ? 
                vidlog.play() 
                : vidlog.pause()
        }
    }


    render() {
        return (
            <div>
                <header>
                    <div id="videologo">
                        <div id="iso">
                            <video id="vidlog" /* autoPlay */ loop muted src="/img/videos/EAPP2.mp4">
                            </video>
                        </div>
                        <div id="logo">
                            <p id="od">OBJETOS DIGITALES</p>
                        </div>
                    </div>
                    <Logueo />
                </header>
            </div>
        )
    }
}
