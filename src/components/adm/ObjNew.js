import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ObjNew extends Component {

	state = {
		denom: '',
		desc_sint: '',
		desc_extensa: '',
		alta: '',
		usr_origen: '',
		Usr_design: '',
		sw_design: 'Blender 2.4',
		fork_de: null,
		mostrar: true,
		precio: 0,
		moneda: 'AR',

		usuarios: [{
			id: "",
			username: ""
		}],

		objetos: [{
			id: "",
			denom: ""
		}]
	}

	componentDidMount() {
		this.leeUsuarios();
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

	leeUsuarios = async () => {
		const res = await fetch('http://localhost:4040/api/adm/usrs',
			{ method: 'GET' });
		if (res.ok) {
			let usuarios = await res.json()
			this.setState({ usuarios: usuarios });
		} else {
			alert("HTTP-Error: " + res.status);
		}
	}

	grabar = async (e) => {
		e.preventDefault();
		const res = await fetch('http://localhost:4040/api/adm/objs', {
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
		this.props.history.push('/adm/objs')
	}

	cambioDato = (e) => {
		this.setState({ [e.target.name]: e.target.value })
		if (e.target.name === "fork_de" && e.target.value === "x") {
			this.setState({ [e.target.name]: null })
		}
	}

	render() {
		return (
			<div>
				<h2 id="titobj">OBJETOS</h2>
				<form className="frmEdAl" onSubmit={this.grabar}>
					<div className="lin">
						<div className="lab">
							<label>Denominación</label>
						</div>
						<div className="ipt">
							<input type="text"
								maxLength="32"
								name="denom" autoFocus
								required
								onChange={this.cambioDato}>
							</input>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Descripción sintética</label>
						</div>
						<div className="ipt">
							<input type="text"
								name="desc_sint"
								maxLength="32"
								onChange={this.cambioDato}
								required>
							</input>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Descripción extensa</label>
						</div>
						<div className="ipt">
							<input type="text"
								name="desc_extensa"
								maxLength="256"
								onChange={this.cambioDato}>
							</input>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Usuario de origen</label>
						</div>
						<div className="ipt">
							<select
								name="usr_origen"
								onChange={this.cambioDato}
								required>
								<option
									value="">
									Seleccionar
									</option>
								{this.state.usuarios.map(usuario => (
									<option
										key={usuario.id}
										value={usuario.id}>
										{usuario.username}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Usuario diseñador</label>
						</div>
						<div className="ipt">
							<select
								name="usr_design"
								onChange={this.cambioDato}
								required>
								<option
									value="">
									Seleccionar
									</option>
								{this.state.usuarios.map(usuario => (
									<option
										key={usuario.id}
										value={usuario.id}>
										{usuario.username}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Software de diseño</label>
						</div>
						<div className="ipt">
							<input type="text"
								name="sw_design"
								maxLength="24"
								value="Blender 2.4"
								onChange={this.cambioDato}>
							</input>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Basado en...</label>
						</div>
						<div className="ipt">
							<select
								name="fork_de"
								onChange={this.cambioDato}>
								<option
									value="">
									Seleccionar
									</option>
								<option
									key={1}
									value={"x"}>
									Ninguno
									</option>
								{this.state.objetos.map(obj => (
									<option
										key={obj.id}
										value={obj.id}>
										{obj.denom}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Mostrar u ocultar</label>
						</div>
						<div className="ipt">
							<select
								name="mostrar"
								value="1"
								onChange={this.cambioDato}>
								<option value={1}>Mostrar</option>
								<option value={0}>Ocultar</option>
							</select>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Precio de venta</label>
						</div>
						<div className="ipt">
							<input type="number"
								name="precio"
								step=".01"
								onChange={this.cambioDato}>
							</input>
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Moneda</label>
						</div>
						<div className="ipt">
							<input type="text"
								name="moneda"
								maxLength="2"
								defaultValue="AR"
								onChange={this.cambioDato}>
							</input>
						</div>
					</div>
					<button
						className="al_ob_btn btnCancel">
						<Link className="lnk" to={{
							pathname: "/adm/objs"
						}}>
							Cancelar
                            </Link>
					</button>
					<button className="al_ob_btn"
						type="submit"
						name="enviar">
						Guardar
					</button>
				</form>
			</div>
		)
	}
}