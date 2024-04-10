import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ImgEdt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			obj_id: '',
			nro_orden: '',
			ruta: '',
			nomarch: '',
			publicar: true,
			alta: '',

			objetos: [{
				id: "",
				denom: ""
			}]
		}
	}

	componentDidMount() {
		this.leeImagen();
		this.leeObjetos();
	}

	leeImagen = async () => {
		const id = this.props.match.params.id;
		const res = await fetch('http://localhost:4040/api/adm/imgs/' + id,
			{ method: 'GET' });
		if (res.ok) {
			const imagen = await res.json()
			this.setState({
				id: imagen[0].id,
				obj_id: imagen[0].obj_id,
				nro_orden: imagen[0].nro_orden,
				ruta: imagen[0].ruta,
				nomarch: imagen[0].nomarch,
				publicar: imagen[0].publicar,
				alta: imagen[0].alta.substr(0, 19)
			})
			this.setState({ forkSel: this.state.fork_de })
		} else {
			alert("HTTP-Error: " + res.status);
		}
	}

	leeObjetos = async () => {
		const res = await fetch('http://localhost:4040/api/adm/objs',
			{ method: 'GET' });
		if (res.ok) {
			let objetos = await res.json()
			this.setState({ objetos: objetos });
		} else {
			alert("HTTP-Error: " + res.status);
		}
	}

	grabar = async (e) => {

		e.preventDefault();

		const id = this.state.id;
		const res = await fetch('http://localhost:4040/api/adm/imgs/' + id, {
			method: 'PUT',
			body: JSON.stringify(this.state),
			headers: { 'Content-Type': 'application/json' }
		});
		if (res.ok) {
			let msg = await res.json()
			console.log(msg.resultado);
		} else {
			alert("HTTP-Error: " + res.status);
		}
		this.props.history.push('/adm/imgs')
	}

	cambioDato = (e) => {
		this.setState({ [e.target.name]: e.target.value })
		if (e.target.name === "nro_orden" && e.target.value === "") {
			this.setState({ [e.target.name]: 0 })
		}
	}

	render() {
		return (
			<div>
				<h2 id="titimg">IMAGENES</h2>
				<form className="frmEdAl" onSubmit={this.grabar}>
					<div className="lin">
						<div className="lab">
							<label>Objeto</label>
						</div>
						<div className="ipt">
							<select
								name="obj_id"
								onChange={this.cambioDato}
								value={this.state.obj_id}
								required>
								{this.state.objetos.map(objeto => (
									<option
										key={objeto.id}
										value={objeto.id}>
										{objeto.denom}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Nro. orden</label>
						</div>
						<div className="ipt">
							<input type="text"
								name="nro_orden"
								maxLength="3"
								value={this.state.nro_orden}
								onChange={this.cambioDato}>
							</input>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Ruta</label>
						</div>
						<div className="ipt">
							<input type="text"
								name="ruta"
								maxLength="128"
								value={this.state.ruta}
								onChange={this.cambioDato}>
							</input>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Archivo</label>
						</div>
						<div className="ipt">
							<input type="text"
								name="nomarch"
								maxLength="64"
								value={this.state.nomarch}
								onChange={this.cambioDato}>
							</input>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Publicar</label>
						</div>
						<div className="ipt">
							<select
								name="publicar"
								value={this.state.publicar}
								onChange={this.cambioDato}>
								<option value={1}>Sí</option>
								<option value={0}>No</option>
							</select>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Fecha de alta</label>
						</div>
						<div className="ipt">
							<input type="datetime-local"
								name="alta"
								value={this.state.alta}
								onChange={this.cambioDato}
								required>
							</input>
						</div>
					</div>
					<button
						className="al_im_btn btnCancel">
						<Link className="lnk" to={{
							pathname: "/adm/imgs"
						}}>
							Cancelar
                            </Link>
					</button>
					<button className="al_im_btn"
						type="submit"
						name="enviar">
						Guardar
					</button>
				</form>
			</div>
		)
	}
}