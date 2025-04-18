import { useState } from 'react';
import './App.css'
import Header from './componentes/Header'
import Producto from './componentes/Producto';
import Carrito from './componentes/carrito';
import Filter from './componentes/Filter';
import Footer from './componentes/Footer';
function App() {
  const [ producto, setProducto ] = useState([]);
  const [ item, setItemSeleccionado ] = useState([]);
  const [ filtro, setFiltro ] = useState([]);

  return (
    <>
      <Header />
      <div className='position'>
        <Filter producto={ producto } setProductoSeleccionado={setItemSeleccionado} 
        filtro={filtro} setFiltro={setFiltro} />
        <Carrito producto={ item } setProductoSeleccionado={setItemSeleccionado} />
        </div>
      <Producto producto={ producto } setProducto={setProducto}
      item={item} setItemSeleccionado={setItemSeleccionado} filtro={filtro}/>
      <Footer />
    </>
  )
}

export default App
