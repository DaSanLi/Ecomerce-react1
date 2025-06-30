import { useState } from "react";

const Login = () => {

    const [formData, setFormData] = useState({
        emailL: '',
        passwordL: ''
    });

    const [ usuario, setUsuario ] = useState(null);
    const [ bienvenida, setBienvenida ] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);

        const response = await fetch('http://localhost/tareasPHP/API_REST/Login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if(response.status !== 200){
            console.log("el codigo de request es:", response.status);
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error HTTP:", response.status);
            console.error("Detalles:", errorText);
            return;
        }

        const datosProcesados = await response.json();

        if (datosProcesados?.nick) {
            setUsuario(datosProcesados.nick);
            setBienvenida(true);
        } else {
            console.warn("Respuesta sin nick:", datosProcesados);
        }


};

    const handleChange = (e) =>{
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    return (
        <>{
        bienvenida === false ?(
            <div className="login"> 
                <form onSubmit={handleSubmit}>
                    <div className="inputLogin">
                        <label htmlFor="emailL">Email: </label>
                        <input 
                            id="emailL"
                            name="emailL"
                            placeholder="ingresa tu email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputLogin">
                        <label htmlFor="passwordL">Password: </label>
                        <input 
                            type="password"
                            id="passwordL"
                            name="passwordL"
                            placeholder="ingresa tu contraseña"
                            onChange={handleChange}
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