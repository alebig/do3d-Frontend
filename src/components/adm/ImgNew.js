import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ImgNew extends Component {

	state = {
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

	componentDidMount() {
		this.leeObjetos();
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
		const res = await fetch('http://localhost:4040/api/adm/imgs', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: { 'Content-Type': 'application/json' }
		});
		if (res.ok) {
			let msg = await res.json()
			console.log(msg);
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
								required>
								<option
									value="">
									Seleccionar
									</option>
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
								onChange={this.cambioDato}>
								<option value={1}>Sí</option>
								<option value={0}>No</option>
							</select>
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
