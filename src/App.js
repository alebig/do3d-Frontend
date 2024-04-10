import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Encabezado from './components/Encabezado'
import Adm from './components/adm/Adm'
import Usrs from './components/adm/Usrs'
import UsrNew from './components/adm/UsrNew'
import UsrEdt from './components/adm/UsrEdt'
import Objs from './components/adm/Objs'
import ObjNew from './components/adm/ObjNew'
import ObjEdt from './components/adm/ObjEdt'
import Imgs from './components/adm/Imgs'
import ImgNew from './components/adm/ImgNew'
import ImgEdt from './components/adm/ImgEdt'
import Peds from './components/adm/Peds'
import Fact from './components/adm/Fact'
import Prueba from './components/hookExample'
import AltaUsr from './components/Logueo/registro.js'
import Objetos from './components/exhibe_obj/Objetos2.js';

function App() {
  return (
    <Router>
      <Encabezado/>
      <Route path="/adm" component={Adm} />
      <Route exact path="/adm/usrs" component={Usrs} />
      <Route path="/adm/usr/new" component={UsrNew}/>
      <Route exact path="/adm/usr/edit/:id" component={UsrEdt}/>
      <Route exact path="/adm/objs" component={Objs} />
      <Route exact path="/adm/obj/new" component={ObjNew}/>
      <Route exact path="/adm/obj/edit/:id" component={ObjEdt}/>
      <Route exact path="/adm/imgs" component={Imgs} />
      <Route exact path="/adm/img/new" component={ImgNew}/>
      <Route exact path="/adm/img/edit/:id" component={ImgEdt}/>
      <Route exact path="/adm/peds" component={Peds} />
      <Route exact path="/adm/fact" component={Fact} />
      <Route exact path="/registro" component={AltaUsr} />
      <Route exact path="/prueba" component={Prueba} />
      <Objetos/>
    </Router>
  );
}

export default App;
