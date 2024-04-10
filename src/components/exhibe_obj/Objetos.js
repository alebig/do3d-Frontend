import React, { useState, useEffect } from 'react';
import leeObjetos from '../api/objsRead.js';
import leeImagenes from '../api/imgsRead.js';
import "./exhibe_obj.css";


function Objetos() {

    //--------------------------------------V A R I A B L E S-------------------------------------
    const selected = { border: '3px solid #0489b1' }
    const unSelected = { border: '3px solid #1c1c1c' }
    const oculto = { visibility: 'hidden' }
    const visible = { visibility: 'visible' }

    const [imgOd1, setImgOd1] = useState('')
    const [imgOd2, setImgOd2] = useState('')
    const [imgOd3, setImgOd3] = useState('')
    const [imgOdSelected, setImgOdSelected] = useState('')
    const [fleImDer, setFleImDer] = useState({ visibility: 'visible' })
    const [fleImIzq, setFleImIzq] = useState({ visibility: 'hidden' })
    const [fleObDer, setFleObDer] = useState({ visibility: 'visible' })
    const [fleObIzq, setFleObIzq] = useState({ visibility: 'hidden' })
    const [dest, setDest] = useState([selected, unSelected, unSelected])  
    const [denom, setDenom] = useState("jhgfjhgfjhf")
    const [indOd, setIndOd] = useState(0)
    const [indImg, setIndImg] = useState(0)
    
    const [odSelected, setOdSelected] = useState({
        /* alta: "2020-04-17T10:49:28.000Z",
        denom: "Cabezal trípode Vivitar",
        desc_extensa: "Fue diseñada para reemplazar una pieza de similares características que se partió",
        desc_sint: "Sujeta la cámara al trípode",
        fork_de: null,
        id: 3,
        moneda: "AR",
        mostrar: 1,
        precio: 1600,
        sw_design: "Blender 2.4",
        usr_design: 13,
        usr_origen: 10 */
    })
    let imgSelAll = [{
        ruta: "",
        nomarch: ""
    }]
    let rutanom = ""
    let dnm = ""
    let odFil = []
    let imgFil = []
    let objx3 = []
    
    
    useEffect(() => {
        lecturas(main) 
    })   

    // -------------------------------------------------------------------------------------
    async function lecturas(main) {
        const od = await leeObjetos
        const img = await leeImagenes
        odFil = await od.filter((obj) => obj.mostrar === 1)   // Elimina de objetos e imágenes
        imgFil = await img.filter((im) => im.publicar === 1)  // los que tienen indicado no publicar
        main(indOd,/*  odSelected, */ indImg)
    }    
    
    //      Fotos del objeto seleccionado y mecánica de desplazamiento
    //      ----------------------------------------------------------

    const imgsOdSel = (odSel) => {
        let id = odSel.id
            imgSelAll = imgFil.filter((im) => im.obj_id === id)
    }

    //      Presentación de objetos para seleccionar y mecánica de desplazamiento
    //      ---------------------------------------------------------------------

    const exhibeOd = (indOd) => {
        objx3.push(odFil[indOd], odFil[indOd + 1], odFil[indOd + 2])

        const agregaImg = (obid) => {
            let index = imgFil.findIndex(e => e.obj_id === obid)
            objx3.push(index)
        }    

        for (let i = 0; i < 3; i++) {
            agregaImg(objx3[i].id)
        }    

        setImgOd1(imgFil[objx3[3]].ruta + "/" + imgFil[objx3[3]].nomarch)
        setImgOd2(imgFil[objx3[4]].ruta + "/" + imgFil[objx3[4]].nomarch)
        setImgOd3(imgFil[objx3[5]].ruta + "/" + imgFil[objx3[5]].nomarch)

        imgsOdSel(odSelected)
    }   
    
    //      ----------------------------------------------------------


    const exhibeSel = async (indImg) => {
        dnm = odSelected.denom
        setDenom(dnm)
        if (imgSelAll) {
            rutanom = imgSelAll[indImg].ruta + "/" + imgSelAll[indImg].nomarch
        }
        setImgOdSelected(rutanom)
    }

    //      ---------------------------------------------------------------------


    const nextOb = () => {
        if (indOd + 5 > odFil.length) {
            setFleObDer(oculto)
        } else {
            setFleObDer(visible)

        }
        setDest(unSelected, unSelected, unSelected)
        if (odFil[indOd + 1] === odSelected) {
            setDest([selected, unSelected, unSelected])
        }
        if (odFil[indOd + 2] === odSelected) {
            setDest([unSelected, selected, unSelected])
        }
        if (odFil[indOd + 3] === odSelected) {
            setDest([unSelected, unSelected, selected])
        }
        setIndOd(indOd + 1)
        setFleObIzq(visible)
    }        

    const prevOb = () => {
        if (indOd < 2) {
            setFleObIzq(oculto)
        } else {
            setFleObIzq(visible)
        }        
        setDest(unSelected, unSelected, unSelected)
        if (odFil[indOd - 1] === odSelected) {
            setDest([selected, unSelected, unSelected])
        }
        if (odFil[indOd] === odSelected) {
            setDest([unSelected, selected, unSelected])
        }
        if (odFil[indOd + 1] === odSelected) {
            setDest([unSelected, unSelected, selected])
        }
        setIndOd(indOd -1)
        setFleObDer(visible)
    }        

    //      ----------------------------------------------------------

    const cambiaOdSel = (e) => {
        if (e.target.id === "itemCat_A") {
            setDest([selected, unSelected, unSelected])
            setOdSelected(objx3[0])
            dnm = objx3[0].denom
        }
        if (e.target.id === "itemCat_B") {
            setDest([unSelected, selected, unSelected])
            setOdSelected(objx3[1])
            dnm = objx3[1].denom
        }
        if (e.target.id === "itemCat_C") {
            setDest([unSelected, unSelected, selected])
            setOdSelected(objx3[2])
            dnm = objx3[2].denom
        }
        setIndImg(0);
        setFleImIzq(oculto);
        setFleImDer(visible)
    }

    //debugger;
    
    function nextIm () {
        if (imgSelAll.length < 2) {
            setFleImDer(oculto)
        } else {
            setFleImDer(visible)
            setIndImg(indImg + 1)
        }
        if (indImg > imgSelAll.length - 3) {
            setFleImDer(oculto)
        } else {
            setFleImDer(visible)
        }
        if (imgSelAll.length < 2) {
            setFleImIzq(oculto)
        } else {
            setFleImIzq(visible)
        }
    }
    
    function prevIm () {
        setIndImg(indImg - 1)
        if (indImg < 2) {
            setFleImIzq(oculto)
        } else {
            setFleImIzq(visible)
        }
        setFleImDer(visible)
    }
    
//    exhibeOd, imgsOdSel, exhibeSel
    function main (indOd, /* odSelected,  */indImg) {
        exhibeOd(indOd)
//        imgsOdSel(odSelected)
        exhibeSel(indImg)
    }

    return (
        <div>
        <div id="selector_objetos">
            <h3>Algunos objetos digitales</h3>
            <div id="show_catalogo_1">
                <img id="flecha_obj_i" src="img/anterior_cat.jpg" alt="Anterior" onClick={prevOb}
                    style={fleObIzq} />
                <img id="itemCat_A" src={imgOd1} alt="Quitar esto" onClick={cambiaOdSel} style={dest[0]} />
                <img id="itemCat_B" src={imgOd2} alt="Quitar esto" onClick={cambiaOdSel} style={dest[1]} />
                <img id="itemCat_C" src={imgOd3} alt="Quitar esto" onClick={cambiaOdSel} style={dest[2]} />
                <img id="flecha_obj_d" src="img/siguiente_cat.jpg" alt="Posterior" onClick={nextOb}
                    style={fleObDer} />
            </div>
            <div className="clear">
            </div>
            <p id="desc_obj">{denom}</p>
        </div>
        <div id="selector_fotos">
            <div id="show_fotos_1">
                <img id="flecha_fotos_i" src="img/anterior_cat.jpg" alt="Anterior" onClick={prevIm}
                    style={fleImIzq} />
                <img id="foto_obj" src={imgOdSelected} alt="Quitar esto" />
                <img id="flecha_fotos_d" src="img/siguiente_cat.jpg" alt="Posterior" onClick={nextIm}
                    style={fleImDer} />
            </div>
            <p id="desc_fot">Nada o detalles de la foto</p>
        </div>
    </div>)
}

export default Objetos