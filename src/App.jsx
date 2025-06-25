import { useState } from 'react';
import './App.css'
import Header from './componentes/Header'
import Producto from './componentes/Producto';
import Carrito from './componentes/Carrito';
import Filter from './componentes/Filter';
import Footer from './componentes/Footer';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
function App() {
  const [ producto, setProducto ] = useState([]);
  const [ item, setItemSeleccionado ] = useState([]);
  const [ filtro, setFiltro ] = useState([]);
  const [ usuarios, setUsuarios ] = useState ([]);

  return (
    <>
      <Header />
      <div className='position'>
        <Filter producto={ producto } setProductoSeleccionado={setItemSeleccionado} 
        filtro={filtro} setFiltro={setFiltro} />
        <Login usuarios={usuarios} setUsuarios={setUsuarios}/>
        <Carrito producto={ item } setProductoSeleccionado={setItemSeleccionado} />
      </div>
      <Producto producto={ producto } setProducto={setProducto}
      item={item} setItemSeleccionado={setItemSeleccionado} filtro={filtro}/>
      <Registro usuarios={usuarios} setUsuarios={setUsuarios}/>
      <Footer />
    </>
  )
}

export default App
