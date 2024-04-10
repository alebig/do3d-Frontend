import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Adm extends Component {
    render() {
        return (
            <div>
                <button className="opcAdm col1">
                    <Link to="/adm/usrs" className="Link">Usuarios </Link>
                    </button>
                <button className="opcAdm col2">
                    <Link to="/adm/objs" className="Link">Objetos </Link>
                    </button>
                <button className="opcAdm col3">
                    <Link to="/adm/imgs" className="Link">Imágenes </Link>
                    </button>
                <button className="opcAdm col4">
                    <Link to="/adm/peds" className="Link">Pedidos </Link>
                    </button>
                <button className="opcAdm col5">
                    <Link to="/adm/fact" className="Link">Facturas </Link>
                    </button>
            </div>
        )
    }
}
