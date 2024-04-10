import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Usrs.css'

export default class UsrEdt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			username: "",
			pwd: '',
			nombre: '',
			apellido: '',
			email: '',
			perfil: '',
			aut_acc: '',
			alta: '',
			ult_ing: '',
			estado: ''
		}
	}

	componentDidMount() {
		this.leeUsuario();
	}

	leeUsuario = async () => {
		const id = this.props.match.params.id;
		const res = await fetch('http://localhost:4040/api/adm/usrs/' + id,
			{ method: 'GET' });
		if (res.ok) {
			const usuario = await res.json()
			if (usuario[0].ult_ing === null) { usuario[0].ult_ing = "" }
			this.setState({
				id: usuario[0].id,
				username: usuario[0].username,
				pwd: usuario[0].pwd,
				nombre: usuario[0].nombre,
				apellido: usuario[0].apellido,
				email: usuario[0].email,
				perfil: usuario[0].perfil,
				aut_acc: usuario[0].aut_acc,
				alta: usuario[0].alta.substr(0, 19),
				ult_ing: usuario[0].ult_ing.substr(0, 19),
				estado: usuario[0].estado
			})
		} else {
			alert("HTTP-Error: " + res.status);
		}
	}

	grabar = async (e) => {
		e.preventDefault();
		const id = this.state.id;
		const res = await fetch('http://localhost:4040/api/adm/usrs/' + id, {
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
		this.props.history.push('/adm/usrs')
	}

	cambioDato = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	confirPw = (e) => {
		if (e.target.value !== this.state.pwd) {
			alert("Las contraseñas ingresadas no coinciden")
		}
	}

	render() {
		return (
			<div>
				<h2 id="titusu">USUARIOS</h2>
				<form className="frmEdAl" onSubmit={this.grabar}>
					<div className="lin">
						<div className="lab">
							<label>Usuario</label>
						</div>
						<div className="ipt">
							<input type="text"
								maxLength="16"
								name="username" autoFocus
								value={this.state.username}
								required
								onChange={this.cambioDato}>
							</input><br />
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Contraseña</label>
						</div>
						<div className="ipt">
							<input type="text"
								name="pwd"
								maxLength="16"
								value={this.state.pwd}
								onChange={this.cambioDato}
								required>
							</input><br />
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Nombre</label>
						</div>
						<div className="ipt">
							<input type="text"
								name="nombre"
								maxLength="30"
								value={this.state.nombre}
								onChange={this.cambioDato}
								required>
							</input><br />
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Apellido</label>
						</div>
						<div className="ipt">
							<input type="text"
								name="apellido"
								maxLength="30"
								value={this.state.apellido}
								onChange={this.cambioDato}
								required>
							</input><br />
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>E-mail</label>
						</div>
						<div className="ipt">
							<input type="email"
								name="email"
								maxLength="64"
								value={this.state.email}
								onChange={this.cambioDato}
								required>
							</input><br />
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Perfil</label>
						</div>
						<div className="ipt">
							<select name="perfil"
								value={this.state.perfil}
								onChange={this.cambioDato}>
								<option value="ADM">ADM</option>
								<option value="USU">USU</option>
								<option value="OTR">OTR</option>
							</select><br />
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Nivel aut. acceso</label>
						</div>
						<div className="ipt">
							<input type="number"
								name="aut_acc"
								maxLength="1"
								value={this.state.aut_acc}
								onChange={this.cambioDato}>
							</input><br />
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Fecha de alta</label>
						</div>
						<div className="ipt">
							<input type="datetime-local"
								name="alta"
								value={this.state.alta || ""}
								//						pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
								onChange={this.cambioDato}>
							</input><br />
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Ultimo ingreso</label>
						</div>
						<div className="ipt">
							<input type="datetime-local"
								name="ult_ing"
								value={this.state.ult_ing || ""}
								//						pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
								onChange={this.cambioDato}>
							</input><br />
						</div>
					</div>
					<div className="lin">
						<div className="lab">
							<label>Estado</label>
						</div>
						<div className="ipt">
							<select name="estado"
								value={this.state.estado}
								onChange={this.cambioDato}>
								<option value="1">Activo</option>
								<option value="2">Suspendido</option>
								<option value="3">Baja</option>
							</select><br />
						</div>
					</div>
					<button
						className="al_us_btn btnCancel">
						<Link className="lnk" to={{
							pathname: "/adm/usrs"
						}}>
							Cancelar
                            </Link>
					</button>
					<button className="al_us_btn"
						type="submit"
						name="enviar">
						Guardar
					</button>
				</form>
			</div>
		)
	}
}
