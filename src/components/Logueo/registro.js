import React, {useState} from 'react'
import {leeUsuarios as lectura} from '../api/usrsRead.js'
//import './registro.css'

function AltaUsr(props) {
	const [state, setState] = useState({
		nombre : "",
		apellido : "",
		usuario : "",
		passwd1 : "",
		passwd2 : "",
		email : "",
		errusr : 0
	})

	const cambioDato = (e) => { 
		const {name, value} = e.target
		setState(prevState => ({
			...prevState,
			[name] : value
		}))
	}

	const valida = (e) => {

		switch (e.target.name) {
		case "usuario":
			validaUsu(e.target.value)
			break;
		case "passwd2":
			validaPwd()
			break;
		default:
			break;
		}
	}			

	const validaUsu = async (usu) => {
		state.errusr = 0
		const usuarios =  await lectura()
		if (usuarios.some(({username}) => username.toLowerCase() === usu.toLowerCase())) {
			console.log(`El nombre de usuario ${usu} ya existe`)
			state.errusr = 1
			return 
		}
	}

	const validaPwd = () => {
		if (state.passwd1 !== state.passwd2) {
			console.log("Las contraseñas no coinciden")
		}
	}

	const grabaUsu = async (e) => {
		e.preventDefault();
		if ((state.passwd1 !== state.passwd2) || state.errusr === 1) {
			alert("No graba por errores")}
		else {
			const alta = {username: state.usuario,
							pwd: state.passwd1,
							nombre: state.nombre,
							apellido: state.apellido,
							email: state.email,
							perfil: "USU",
							aut_acc: "5",
							estado: "1"
			}
			const res = await fetch('http://localhost:4040/api/adm/usrs', {
				method: 'POST',
				body: JSON.stringify(alta),
				headers: { 'Content-Type': 'application/json' }
			});
			if (res.ok) {
				let msg = await res.json()
				console.log(msg);
			} else {
				alert("HTTP-Error: " + res.status);
			}
			alert(`El usuario ${state.usuario} ha sido incorporado`)
			props.history.goBack()
		}
	}

	return (
		<div id='registro'>
			<h2 id="titusu">Nuevo usuario</h2>
			<form className="frmEdAl"> 
				<div className="lin">
					<div className="lab">
						<label>Usuario</label>
					</div>
					<div className="ipt">
						<input type="text"
							maxLength="16"
							name="usuario" 
							autoFocus
							required
							value={state.usuario}
							onChange={cambioDato}
							onBlur={valida}>
						</input>
					</div>
				</div>
				<div className="lin">
					<div className="lab">
						<label>Contraseña</label>
					</div>
					<div className="ipt">
						<input type="password"
							name="passwd1"
							maxLength="16"
							value={state.pwd}
							onChange={cambioDato}
							required>
						</input><br />
					</div>
				</div>
				<div className="lin">
					<div className="lab">
						<label>Repetir contraseña</label>
					</div>
					<div className="ipt">
						<input type="password"
							name="passwd2"
							maxLength="16"
							value={state.pwd2}
							onChange={cambioDato}
							onBlur={valida}
							required>
						</input>
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
							value={state.nombre}
							onChange={cambioDato}
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
							value={state.apellido}
							onChange={cambioDato}
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
							value={state.email}
							onChange={cambioDato}
							required>
						</input><br />
					</div>
				</div>
				<button 
					type='submit'
					onClick={grabaUsu}>
					Enter
				</button>
			</form>
		</div>
	)
}

export default AltaUsr;