const leeUsuarios = async () => {
    const res = await fetch('http://localhost:4040/api/adm/usrs',
                        {method: 'GET'});
    if (res.ok){
        let usuarios = await res.json()
        return usuarios
    } else {
        alert("HTTP-Error: " + res.status);
    }
}
//const usuarios = async () => await leeUsuarios()
export { leeUsuarios/* , usuarios */ }