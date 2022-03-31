import { useState,useEffect } from "react";
import "./EntregarTareas.css";
import { privateAxios, publicAxios } from "../../../../lib/apiClient";

const Entregar =()=>{
    const id = "6225659f6208d12d1cdce801"
    const [descripcion, setDescripcion] = useState("");
    const [titulo, setTitulo] = useState("");
    const [puntaje, setPuntaje] = useState("");
    const [tiempo,setTiempo] = useState("");
    const [archivo,setArchivo] = useState(null);
    const changeFile = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            //ENVIAR ARCHIVO
        }
    };

    //Obtener el tiempo restante segun la fecha de asignacion de la tarea
    const tiempoRestante = (fecha)=>{
        const fechaA = new Date(Date.now());
        const fechaE = new Date(fecha)
        const dif = fechaE.getTime()-fechaA.getTime();
        const difer = dif/(1000*3600*24)
        const dias = Math.floor(difer)
        const horas = Math.floor((difer-dias)*24)
        const minutos = Math.floor(((((difer-dias)*24)-horas)*60))
        const strRestante = `${dias} ${dias>1 || dias==0?'Dias':'Dia'}  ${horas} ${horas>=1?'Horas':'Hora'}  ${minutos} Minutos`
        return strRestante;
    }

    //TODOS LOS DATOS DE ESTE USEEFFECT DEBEN PROVEERLOS LA PAGINA ANTERIOR
    useEffect(() => {
        
        const loadTarea = async(e)=>{ 
            const data = await privateAxios.get(
                '/api/v1/tareas/alltareas',{
                    params : {
                        id:id,
                    }
                }
            ).then((response)=>{
                const tarea = response.data.rslt[0];
                //console.log(tarea)
                setTitulo(tarea.info.titulo)
                setDescripcion(tarea.info.descripcion)
                setPuntaje(tarea.info.Puntaje)
                setTiempo(tiempoRestante(tarea.fechaEntrega))


            })
            .catch((response)=>{console.log(response)})
    
        }
        loadTarea();
      
    }, [])

    const clickEntregar = async() =>{
        const tarea = await privateAxios.put("/api/v1/tareas/newentregable",{

        })
    }
    
    

    return(
        <>  
            <div className="container">
                    <div className="container-body">
                    
                        <div className="descripcion-tarea">
                            <h2 className="titulo">Entregar Tarea:</h2>
                            <h2 className="titulo">{titulo}</h2>
                            <br/>
                            <h3 className="subtitulo">Descripción</h3>  
                            <p className="descripcion">
                                {descripcion}
                            </p>
                            <br/>
                            <h3 className="subtitulo">Valor</h3>
                            <p className="puntaje">
                                {puntaje} Puntos
                            </p>
                            <br/>
                            <h3 className="subtitulo">Tiempo Restante</h3> 
                            <p className="tiempo-restante">
                                {tiempo}
                            </p>
                        </div>


                        <div className="entregable-tarea">
                            <h3 className="subtitulo">Archivo de tarea</h3>  
                            <p className="descripcion">
                            Arrastra y suelta el archivo de tu tarea en el cuadro o da un click en el boton para elegir el archivo. Cuando tu tarea este lista, da click en en bóton de "Entregar Tarea"
                            </p>
                            <br>
                
                            </br>
                            <div className="image-upload-wrap">
                                <input
                                    className="file-upload-input"
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    onChange={(e) => {
                                    changeFile(e);
                                    }}
                                />
                                <div className="text-information">
                                    <h3>Arrastra y Suelta el archivo, o bien da click para buscar el archivo</h3>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button className="btn-cancel">Cancelar</button>
                                <button className="btn-up"
                                    // onClick={(e)=>{
                                    //     // getTareas(e);
                                    // }}
                                >Enviar Tarea</button>
                                
                            </div>
                            <br></br>
                        </div>
                        
                    </div>
                </div>
        </>
    );
}

export default Entregar;