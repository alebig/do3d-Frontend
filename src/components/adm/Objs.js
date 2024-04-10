import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Objs.css'

export default class Objetos extends Component {
    state={
        objetos: [],
        tabEst: ["activo", "susp.", "baja"],
        usuarios: [{id: "",
                    username: ""}]
    }

    componentDidMount() {
        this.leeUsuarios();
        this.leeObjetos();
    }

    leeObjetos = async () => {
        const res = await fetch('http://localhost:4040/api/adm/objs',
                            {method: 'GET'});
        if (res.ok){
            let objetos = await res.json()
            this.setState({objetos: objetos});
        } else {
            alert("HTTP-Error: " + res.status);
        }
    }

    leeUsuarios = async () => {
        const res = await fetch('http://localhost:4040/api/adm/usrs',
                            {method: 'GET'});
        if (res.ok){
            let usuarios = await res.json()
            this.setState({usuarios: usuarios});
        } else {
            alert("HTTP-Error: " + res.status);
        }
    }

    buscaUsuario(usr) {
        let i;
        for ( i = 0 ; i < this.state.usuarios.length ; i++) {
            if (this.state.usuarios[i].id === usr) { return this.state.usuarios[i].username; };
        }

    }

    rendRegistros() {
        return this.state.objetos.map((objeto) => {
            const { id, denom, desc_sint, desc_extensa, alta, usr_origen,
                    usr_design, sw_design, fork_de, mostrar, precio, moneda } = objeto;
            let mostr = "Sí";
            if (!mostrar) {mostr = "No"};
            let usrnmOrg = this.buscaUsuario(usr_origen);
            let usrnmDsg = this.buscaUsuario(usr_design);

            return (
                <tr key={id}>
                    <td className="centro">{id}</td>
                    <td>{denom}</td>
                    <td>{desc_sint}</td>
                    <td>{desc_extensa}</td>
                    <td>{alta.substr(0,10)} {alta.substr(11,8)}</td>
                    <td>{usrnmOrg}</td>
                    <td>{usrnmDsg}</td>
                    <td>{sw_design}</td>
                    <td className="centro">{fork_de}</td>
                    <td className="centro">{mostr}</td>
                    <td className="centro">{precio}</td>
                    <td className="centro">{moneda}</td>
                    <td>
                        <button className="edel col1">
                            <Link to={{
                                pathname: "/adm/obj/edit/" + id
                            }}
                                className="Link">
                                Editar
                            </Link>
                        </button>                        
                    </td>
                    <td>
                        <button 
                            className="edel col1" 
                            onClick = {() => this.bajaObj(objeto.id)}>
                                Quitar
                        </button>
                    </td>
                </tr>
            )
        })
    }

    bajaObj = async (id) => {
		const res = await fetch('http://localhost:4040/api/adm/objs/' + id, {
								method: 'DELETE',
							});
                        if (res.ok){
							let msg = await res.json()
							console.log(msg);
                        } else {
                            alert("HTTP-Error: " + res.status);
						}
		this.leeObjetos();
	}
    
    render() {
        return (
            <div id="obj">
                <div>
                    <h2 id="titobj">OBJETOS</h2>
                </div>
                <div>
                    <button className="opcAdm btn">
                        <Link to="/adm/obj/new" className="Link">Agregar</Link>
                        </button>
                </div>
                <div>
                    <table id="tb_obj">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Denom</th>
                                <th>Descripción sintética</th>
                                <th>Descripción extensa</th>
                                <th>Alta</th>
                                <th>Usuario origen</th>
                                <th>Diseñador</th>
                                <th>Soft diseño</th>
                                <th>Fork de...</th>
                                <th>Mostrar</th>
                                <th>Precio</th>
                                <th>Moneda</th>
                                <th> </th>
                                <th> </th>
                            </tr>
                            {this.rendRegistros()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}