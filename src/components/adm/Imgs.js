import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Imgs.css'

export default class Imagenes extends Component {
    state={
        imagenes: [],
        objetos: [{id: "",
                   denom: ""}]
    }

    componentDidMount() {
        this.leeObjetos();
        this.leeImagenes();
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

    leeImagenes = async () => {
        const res = await fetch('http://localhost:4040/api/adm/imgs',
                            {method: 'GET'});
        if (res.ok){
            let imagenes = await res.json()
            this.setState({imagenes: imagenes});
        } else {
            alert("HTTP-Error: " + res.status);
        }
    }

    buscaObjeto(obj) {
        let i;
        for ( i = 0 ; i < this.state.objetos.length ; i++) {
            if (this.state.objetos[i].id === obj) { return this.state.objetos[i].denom; };
        }

    }

    rendRegistros() {
        return this.state.imagenes.map((imagen) => {
            const { id, obj_id, nro_orden, ruta,
                    nomarch, publicar, alta } = imagen;
            let visible = "Sí";
            if (!publicar) {visible = "No"};
            let objDenom = this.buscaObjeto(obj_id);

            return (
                <tr key={id}>
                    <td className="centro">{id}</td>
                    <td>{objDenom}</td>
                    <td className="centro">{nro_orden}</td>
                    <td>{ruta}</td>
                    <td>{nomarch}</td>
                    <td className="centro">{visible}</td>
                    <td>{alta.substr(0,10)} {alta.substr(11,8)}</td>
                    <td>
                        <button className="edel col1">
                            <Link to={{
                                pathname: "/adm/img/edit/" + id
                            }}
                                className="Link">
                                Editar
                            </Link>
                        </button>                        
                    </td>
                    <td>
                        <button 
                            className="edel col1" 
                            onClick = {() => this.bajaImg(imagen.id)}>
                                Quitar
                        </button>
                    </td>
                </tr>
            )
        })
    }

    bajaImg = async (id) => {
		const res = await fetch('http://localhost:4040/api/adm/imgs/' + id, {
								method: 'DELETE',
							});
                        if (res.ok){
							let msg = await res.json()
							console.log(msg);
                        } else {
                            alert("HTTP-Error: " + res.status);
						}
		this.leeImagenes();
	}
    
    render() {
        return (
            <div id="img">
                <div>
                    <h2 id="titimg">IMAGENES</h2>
                </div>
                <div>
                    <button className="opcAdm btn">
                        <Link to="/adm/img/new" className="Link">Agregar</Link>
                        </button>
                </div>
                <div>
                    <table id="tb_img">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Objeto</th>
                                <th>Orden</th>
                                <th>Ruta</th>
                                <th>Archivo</th>
                                <th>Publicar</th>
                                <th>Fecha de alta</th>
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