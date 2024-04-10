export default function MuestraCatalogo () {
    return (
        <div id="show_catalogo_1">
        <img id="flecha_obj_i" src="img/anterior_cat.jpg" alt="Anterior" onClick={prevOb}
            style={fleObIzq} />
        <img id="itemCat_A" src={imgOd1} alt="Quitar esto" onClick={cambiaOdSel} style={dest1} />
        <img id="itemCat_B" src={imgOd2} alt="Quitar esto" onClick={cambiaOdSel} style={dest2} />
        <img id="itemCat_C" src={imgOd3} alt="Quitar esto" onClick={cambiaOdSel} style={dest3} />
        <img id="flecha_obj_d" src="img/siguiente_cat.jpg" alt="Posterior" onClick={nextOb}
            style={fleObDer} />
    </div>

    )
}