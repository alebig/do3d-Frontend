import React from 'react';
import {Link} from 'react-router-dom'
import './logueo.css';

const Logueo = () => {
    let btnLog
    let user
    if (localStorage.username) {
        user = localStorage.getItem("username")
        btnLog = "Logout"
    }
        else {
            user = "Usuari@"
            btnLog = "Login"
        }

    function logInOut () {
        if (btnLog === "Logout") {
            localStorage.removeItem("username")
            btnLog = "Login"
        } else {
            autenticar()
        }
    }

    const leeUsuarios = async () => {
        const res = await fetch('http://localhost:4040/api/adm/usrs',
                            {method: 'GET'});
        if (res.ok){
            let usuarios = await res.json()
            return usuarios
        } else {
            alert("HTTP-Error: " + res.status);
        }
    }


    async function autenticar () {
        const usr = document.forms.frmLgn.logUsr.value
        const pwd = document.forms.frmLgn.logPwd.value
        const usuarios = await leeUsuarios();

        let ind = usuarios.findIndex(function(usu) {
	        if (usu.username === usr) {
                return true
            } 
            return false
        })

        if (ind === -1) {
            alert(`El usuario ${usr} no está registrado`)
        } else {
            if (usuarios[ind].pwd === pwd) {
                localStorage.setItem('username', usr)
                localStorage.setItem('perfil', usuarios[ind].perfil)
                localStorage.setItem('aut_acc', usuarios[ind].aut_acc)
                localStorage.setItem('estado', usuarios[ind].estado)
            } else {
                alert (`La contraseña ingresada no corresponde al usuario ${usr}`)
            }
        }
    }

    return (
        <div id="log">
            <p id="logusr">Hola {user}</p>
            <div>
                <div id="login">
                    <form id="frmLgn" onSubmit={logInOut} >
                        <input  id="logUsr"
                                name="logUsr"
                                type="text"
                                placeholder="Usuario" />
                        <br />
                        <input  id="logPwd"
                                name="logPwd"
                                type="password"
                                placeholder="Contraseña" />
                        <br />
                        <button type="submit">{btnLog}</button>
                        <br />
                    </form>
                </div>
                <div id="logrgt">
                    <button id="lnklogin" type="button"><Link to="/registro" className="Link">Registrarme</Link></button><br />
                    <a id="lnklogin2" href="recupw.html"><button type="button">Recuperar mi contraseña</button></a><br />
                </div>
            </div>
        </div>
    )
};
export default Logueo;