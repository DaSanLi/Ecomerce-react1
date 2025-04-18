import React, { useEffect } from 'react';

const Producto = ({producto, setProducto, setItemSeleccionado, filtro }) =>{

        // Hacemos fetch y actualizamos el estado en App.js 
        useEffect(() => {
            fetch('https://fakestoreapi.com/products/')
            .then(response => response.json())
            .then(data => setProducto(data))
            .catch(error => console.error('Error fetching data:', error));
        }, [setProducto, setItemSeleccionado]); // Dependencias: setProducto

        
        const seleccion = (productoId) =>{
                const seleccionado = producto.find((item) => item.id === productoId);
                if (seleccionado) {
                setItemSeleccionado((itemSelected) => [...itemSelected, seleccionado]);
                } else {
                console.error('Producto no encontrado');
                }
            }

    return(
        <div className="div-productos">
            {
                filtro.length < 1 ? (
                    producto.length > 0 ? (
                        producto.map((item) => (
                            <div className='producto' key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <p>{item.price}€ - {item.rating?.rate}⭐</p>
                                <button onClick={() => seleccion(item.id)}>Comprar</button>
                            </div>
                        ))
                    ) : (
                        <h1>Cargando productos...</h1>
                    )
                ) : (
                    filtro.map((item) => (
                        <div className='producto' key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <p>{item.price}€ - {item.rating?.rate}⭐</p>
                            <button onClick={() => seleccion(item.id)}>Comprar</button>
                        </div>
                    ))
                )
            }
        </div>
    );
}
export default Producto