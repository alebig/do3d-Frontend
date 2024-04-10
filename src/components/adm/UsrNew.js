import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Usrs.css'

export default class UsrNew extends Component {

	state = {
		username: '',
		pwd: '',
		nombre: '',
		apellido: '',
		email: '',
		perfil: 'USU',
		aut_acc: '5',
		estado: '1',
	}

	grabar = async (e) => {
		e.preventDefault();
		const res = await fetch('http://localhost:4040/api/adm/usrs', {
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
								onChange={this.cambioDato}>
								<option value="">Seleccionar</option>
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
								onChange={this.cambioDato}>
								<option value="">Seleccionar</option>
								<option value="1">Activo</option>
								<option value="2">Suspendido</option>
								<option value="3">Baja</option>
							</select><br />
						</div>
					</div>
					<button
						className="al_us_btn btnCancel">
						<Link id="lnk" to={{
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