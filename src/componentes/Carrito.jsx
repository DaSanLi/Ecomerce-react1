import { useEffect, useRef, useState } from 'react';
import logo from '../assets/carrito2.png';

const Carrito = ({ producto, setProductoSeleccionado }) => {
    const [cantidad, setCantidad] = useState([]);
    const contenedor = useRef(null);
    const precioT = useRef(null);
    const [abrir, setAbrir] = useState(false);
    const [ precio, setPrecio ] = useState(null);

    const abrirCarrito = () => {
        contenedor.current.classList.toggle('Abrir');
        setAbrir(!abrir);
    };

    useEffect(() => {
        const conteo = producto.reduce((acumulador, prod) => {
            acumulador[prod.id] = (acumulador[prod.id] || { ...prod, cantidad: 0 });
            acumulador[prod.id].cantidad += 1;
            return acumulador;
        }, {});

        const conteoArray = Object.values(conteo);
        setCantidad(conteoArray);
    }, [producto]);

    const vaciar = () =>{
        setCantidad([]);
        setProductoSeleccionado([]);
    }

    const eliminarP = (id) =>{
        setProductoSeleccionado(prev=> prev.filter(producto => producto.id !== id));
    }

useEffect(()=>{
    const precioTotal = () =>{
        let precioFinal = null;
        if(cantidad.length === 0){
            precioFinal = '';
            setPrecio(precioFinal);
        }else{
            precioFinal = cantidad.reduce((acc, prod) => {
                return acc + (prod.price * prod.cantidad);
            }, 0);
            let numeroR = precioFinal.toFixed(2);
            let Parseado = parseFloat(numeroR);
            setPrecio(Parseado);
        }
    }
    precioTotal();
},[cantidad])

    return (
        <div className="div-carrito">
            <button onClick={abrirCarrito}>
                <img src={logo} alt="Carrito" />
            </button>
            <div className='contenedor' ref={contenedor}>
                {
                    cantidad.length > 0 ? (
                        cantidad.map((item) => (
                            <div className='producto-cesta' key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <p>{item.price}€</p>
                                <p>Cantidad: {item.cantidad}</p>
                                <button onClick={(()=>(eliminarP(item.id)))}>Quitar</button>
                            </div>
                        ))
                    ) : (
                        <h1>¡No tienes productos aún!</h1>
                    )
                }
                <div className='carrito-inferior'>
                    <button className='reinicio' onClick={(()=>vaciar())}>Vaciar</button>
                    <p className='precioTotal' ref={precioT}>{ cantidad.length > 0 ? `Total ${precio}€`:"" }</p>
                </div>
            </div>
        </div>
    );
};

export default Carrito;