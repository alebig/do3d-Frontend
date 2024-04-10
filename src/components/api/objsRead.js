const leeObjetos = async () => {
    const res = await fetch('http://localhost:4040/api/adm/objs',
                        {method: 'GET'});
    if (res.ok){
        const objetos = await res.json()
        return objetos
    } else {
        alert("HTTP-Error: " + res.status);
    }
}
export default leeObjetos()