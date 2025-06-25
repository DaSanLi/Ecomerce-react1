import React, { useEffect, useState } from 'react';
//estado para traer los productos y aplicar el filtro de los productos

const Filter = ({ producto, setFiltro }) => {

// Estado local para el precio máximo y minimo
const [maxPrice, setMaxPrice] = useState(1000);  
const [ menorPrecio, setMenorPrecio ] = useState(0);

//estado para la ordenacion 
const [ sortOption, setSortOption ] = useState(null);
const [ precioSeleccionado, setPrecioSeleccionado ] = useState(20);

useEffect(()=>{
    const precios = producto.map(producto => producto.price);
    let menorPrecio = Math.min(...precios);
    let mayorPrecio = Math.max(...precios);
    setMenorPrecio(menorPrecio);
    setMaxPrice(mayorPrecio);
    setPrecioSeleccionado(mayorPrecio);
},[producto])

// Función que filtra los productos según el precio
const applyFilter = () => {

    let filteredData = producto.filter(item => item.price <= precioSeleccionado);

    //aplico la ordenacion si es necesario 
    if(sortOption === 'asc'){
        filteredData = [...filteredData].sort((a,b)=>a.price - b.price);
    }else if(sortOption === 'desc'){
        filteredData = [...filteredData].sort((a,b) =>b.price - a.price);
    }else if(sortOption === 'rating'){
        filteredData = [...filteredData].sort((a,b) =>b.rating?.rate - a.rating?.rate);
    }
    setFiltro(filteredData);
};

return (
    <div className="filter-container">
        <div className='filter-container-position'>
            <input
                type="range"
                min={menorPrecio}
                max={maxPrice}
                value={precioSeleccionado}
                onChange={(e) => setPrecioSeleccionado(Number(e.target.value))}
            />
                <span>Precio máximo: {precioSeleccionado.toFixed(2)} € </span>
            <select 
            id='orden'
            name='orden'
            onChange={(e) => setSortOption(e.target.value)}>
                <option value="">Ordenar por: </option>
                <option value="asc">Menor a mayor precio</option>
                <option value="desc">Mayor a menor precio</option>
                <option value='rating'>Mejor valoracion</option>
            </select>
            <button onClick={applyFilter}>Filtrar</button>
        </div>
    </div>
);
};

export default Filter;