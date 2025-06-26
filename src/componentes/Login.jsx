import { useState } from "react";

const Login = () => {

    const [formData, setFormData] = useState({
        emailL: '',
        password: ''
    });

    const [ usuario, setUsuario ] = useState(null);
    const [ bienvenida, setBienvenida ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        console.log('Datos enviados:', formData);
        
        const response = await fetch('https://ecomerce.is-great.net', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Indica que se envía JSON  
        },
        body: JSON.stringify(formData), // Convierte el objeto a JSON
        });

        try{

            //esta es la respueta del server, en ella se aplican diferentes valores que haran cambios en la interfaz de usuario
            const respuesta = await response.json();

            let respuestaExitosa = respuesta['success'];

            if(respuestaExitosa){
                setBienvenida(true);
                setUsuario((respuesta["nick"]));
            }

            if (!response.ok) {
                const errorRespuesta = await response.json();
                throw new Error(`Error del servidor: ${response.status} - ${errorRespuesta}`);
            }
            
        } catch (err) {
            console.log("Ha ocurrido un error:", err);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev, 
            [ e.target.name ]: e.target.value
        }));
    };


    return (
        <>{
        bienvenida === false ?(
            <div className="login"> 
                <form onSubmit={handleSubmit}>
                    <div className="inputLogin">
                        <label htmlFor="emailL">Email: </label>
                        <input 
                            type="email" 
                            id="emailL"
                            name="emailL"
                            onChange={handleChange} 
                            placeholder="Email"
                        />
                    </div>
                    <div className="inputLogin">
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Contraseña"
                        />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
                <p><a href="#registro">¿No tienes cuenta aún?</a></p>
            </div>) :(
            <div className="loginB">
                <p>{`¡Bienvenido ${usuario}!`}</p>
            </div>)}
        </>
    );
};

export default Login;