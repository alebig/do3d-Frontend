function sqlDateString (sqlDateString) {

    const ymdhms = sqlDateString.split(/[- : T Z .]/);

    const meses = [ ["enero", "ene", 31], 
                    ["febrero", "feb", 28], 
                    ["marzo", "mar", 31], 
                    ["abril", "abr", 30], 
                    ["mayo", "may", 31], 
                    ["junio", "jun", 30], 
                    ["julio", "jul", 31], 
                    ["agosto", "ago", 31], 
                    ["septiembre", "sep", 30], 
                    ["octubre", "oct", 31], 
                    ["noviembre", "nov", 30], 
                    ["diciembre", "dic", 31]];

    const dias = [  ["Sábado", "Sá"],
                    ["Domingo", "Do"],
                    ["Lunes", "Lu"],
                    ["Martes", "Ma"],
                    ["Miercoles", "Mi"],
                    ["Jueves", "Ju"],
                    ["Viernes", "Vi"]];

    let sumaDias = (dia, mes, anio) => {
        let suma = 0;
        suma = (anio - 1) * 365 + parseInt((parseInt(anio) - 1) / 4);
        for (let x = 0; (mes - 1) > x; x++ ) {
            suma += meses[x][2];
        }
        if (mes > 2 && anio % 4 === 0) {
            suma++;
        }
        suma += dia;
        return suma;
    }

    const resultado = {
        yyyy: ymdhms[0],
        yy: ymdhms[0].slice(-2),
        mm: ymdhms[1],
        mesStrCorto: meses[parseInt(ymdhms[1])-1][1],
        mesStrLargo: meses[parseInt(ymdhms[1])-1][0],
        dd: ymdhms[2],
        diaSemCorto: "",
        diaSemLargo: "",
        hh: ymdhms[3],
        min: ymdhms[4],
        ss: ymdhms[5]
    };

    const desdeCero = sumaDias(parseInt(resultado.dd), parseInt(resultado.mm), parseInt(resultado.yyyy))
    const diaSem = desdeCero % 7
    resultado.diaSemCorto = dias[diaSem][1];
    resultado.diaSemLargo = dias[diaSem][0];
    return resultado;
}

export default sqlDateString;