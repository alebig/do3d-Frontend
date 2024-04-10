import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Usrs.css'
import './Objs.css'

export default class ObjEdt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			denom: "",
			desc_sint: '',
			desc_extensa: '',
			alta: '',
			usr_origen: '',
			usr_design: '',
			sw_design: '',
			fork_de: '',
			mostrar: '',
			precio: '',
			moneda: '',

			usuarios: [{
				id: "",
				username: ""
			}],

			objetos: [{
				id: "",
				denom: ""
			}],

			forkSel: ""

		}
	}

	componentDidMount() {
		this.leeObjeto();
		this.leeUsuarios();
		this.leeObjetos();
	}

	leeObjeto = async () => {
		const id = this.props.match.params.id;
		const res = await fetch('http://localhost:4040/api/adm/objs/' + id,
			{ method: 'GET' });
		if (res.ok) {
			const objeto = await res.json()
			this.setState({
				id: objeto[0].id,
				denom: objeto[0].denom,
				desc_sint: objeto[0].desc_sint,
				desc_extensa: objeto[0].desc_extensa,
				alta: objeto[0].alta.substr(0, 19),
				usr_origen: objeto[0].usr_origen,
				usr_design: objeto[0].usr_design,
				sw_design: objeto[0].sw_design,
				fork_de: objeto[0].fork_de,
				mostrar: objeto[0].mostrar,
				precio: objeto[0].precio,
				moneda: objeto[0].moneda
			})
			this.setState({ forkSel: this.state.fork_de })
			if (this.state.fork_de === null) { this.setState({ forkSel: "" }) }
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

		if (this.state.fork_de === "x") {
			this.setState({ [this.state.fork_de]: null })
		}

		e.preventDefault();

		const id = this.state.id;
		const res = await fetch('http://localhost:4040/api/adm/objs/' + id, {
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
								value={this.state.denom}
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
								value={this.state.desc_sint}
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
								value={this.state.desc_extensa}
								onChange={this.cambioDato}
								required>
							</input>
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
					<div className="lin">
						<div className="lab">
							<label>Usuario de origen</label>
						</div>
						<div className="ipt">
							<select
								name="usr_origen"
								value={this.state.usr_origen}
								onChange={this.cambioDato}
								required>
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
								value={this.state.usr_design}
								onChange={this.cambioDato}
								required>
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
								value={this.state.sw_design}
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
								value={this.state.forkSel}
								onChange={this.cambioDato}>
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
								value={this.state.mostrar}
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
								value={this.state.precio}
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
								value={this.state.moneda}
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