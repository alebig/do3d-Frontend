import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {leeUsuarios as lectura} from '../api/usrsRead.js'
import './Usrs.css'

export default class Usuarios extends Component {

    state={
        usuarios: [],
        tabEst: ["activo", "susp.", "baja"]

    }

    async componentDidMount() {
        this.leeUsuarios()
    }

    leeUsuarios = async () => {
        this.setState({usuarios: await lectura()});
//        console.log('LO PRIMERO')
//        console.log(lectura)
//            this.setState({usuarios: await lectura})
        }

    rendRegistros() {
        return this.state.usuarios.map((usuario) => {
            if (usuario.ult_ing === null) {usuario.ult_ing = ''};
            const { id, username, pwd, nombre, apellido,
                    email, perfil, alta, ult_ing, aut_acc, estado } = usuario
            return (
                <tr key={id}>
                    <td className="centro">{id}</td>
                    <td>{username}</td>
                    <td>{pwd}</td>
                    <td>{nombre}</td>
                    <td>{apellido}</td>
                    <td>{email}</td>
                    <td className="centro">{perfil}</td>
                    <td>{alta.substr(0,10)} {alta.substr(11,8)}</td>
                    <td>{ult_ing.substr(0,10)} {ult_ing.substr(11,8)}</td>
                    <td className="centro">{aut_acc}</td>
                    <td className="centro">{this.state.tabEst[estado-1]}</td>
                    <td><button className="edel col1">
                            <Link   className="Link" 
                                    to={{
                                        pathname: "/adm/usr/edit/" + id
                                        }}>
                                Editar
                            </Link>
                        </button>                        
                    </td>
                    <td>
                        <button 
                            className="edel col1" 
                            onClick = {() => this.bajaUsr(usuario.id)}>
                                Quitar
                        </button>
                    </td>
                </tr>
            )
        })
    }

    bajaUsr = async (id) => {
		const res = await fetch('http://localhost:4040/api/adm/usrs/' + id, {
								method: 'DELETE',
							});
                        if (res.ok){
							let msg = await res.json()
							console.log(msg);
                        } else {
                            alert("HTTP-Error: " + res.status);
						}
		this.leeUsuarios();
	}

/*     editUsr = () => {

        <Link   className="Link" 
                to={{
                    pathname: "/adm/usr/edit/" + id
                    }}>
                Editar
        </Link>


    }
 */    
    render() {
        return (
            <div className="usu">
                <div>
                    <h2 id="titusu">USUARIOS</h2>
                </div>
                <div>
                    <button className="opcAdm col1">
                        <Link to="/adm/usr/new" className="Link">Agregar</Link>
                    </button>
                </div>
                <div>
                    <table id="tb_usr">
                        <tbody>
                            <tr>
                                <th className="centro">Id</th>
                                <th>Usuario</th>
                                <th>Pwd</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>E-mail</th>
                                <th className="centro">Perfil</th>
                                <th>Alta</th>
                                <th>Ultimo ingreso</th>
                                <th className="centro">Aut. Acc.</th>
                                <th className="centro">Estado</th>
                                <th></th>
                                <th></th>
                            </tr>
                            {this.rendRegistros()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
