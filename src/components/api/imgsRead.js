const leeImagenes = async () => {
    const res = await fetch('http://localhost:4040/api/adm/imgs',
                        {method: 'GET'});
    if (res.ok){
        const imagenes = await res.json()
        return imagenes
    } else {
        alert("HTTP-Error: " + res.status);
    }
}
export default leeImagenes()