import { useState } from "react"

const Registro = () => {  

const [ datosForm, setDatosForm ] = useState({
    email: "",
    nick: "",
    password: ""
});

const handleChange = (e) => {
    setDatosForm((prev)=>({
        ...prev, [e.target.name]: e.target.value
    }));
}

const handleSubmit = async (e) =>{
    e.preventDefault(); // Evita que la página se recargue
    console.log(datosForm);

const response = await fetch('https://ecomerce.is-great.net/Registro.php', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json', // Indica que se envía JSON  
            },
        body: JSON.stringify(datosForm), // Convierte el objeto a JSON
    });

    try{
        const text = await response.text();
        console.log(text);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
            }
        
    } catch (err) {
        console.log("Ha ocurrido un error:", err);
    }

} 

return (
    <div id="registro">
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>
                    <h2>Formulario de registro</h2>
                </legend>
                <legend>
                    <div className="formInterior">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ingresa tu correo electronico"
                        onChange={handleChange}/>
                    </div>
                </legend>
                <legend>
                    <div className="formInterior">
                        <label htmlFor="nick">Nick</label>
                        <input 
                        type="text"
                        name="nick"
                        id="nick"
                        placeholder="Ingresa tu seudónimo"
                        onChange={handleChange}/>
                    </div>
                </legend>
                <legend>
                    <div className="formInterior">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Ingresa tu contraseña"
                        onChange={handleChange}/>
                    </div>
                </legend>
                <legend className="legend-btn">
                    <button type="submit">enviar</button>
                </legend>
            </fieldset>
        </form>
    </div>
)
} 

export default Registro