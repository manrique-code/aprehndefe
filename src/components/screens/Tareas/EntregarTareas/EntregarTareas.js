import { useState,useEffect } from "react";
import "./EntregarTareas.css";
import { privateAxios, publicAxios } from "../../../../lib/apiClient";
import { useParams, useNavigate } from "react-router-dom";

const Entregar =()=>{
    // OBTENER LOS DATOS ENVIADOS POR LA VIEW ANTERIOR
    const {numTarea,idClase,idEstudiante} = useParams()
    const navigate = useNavigate()
    

    // const idClase = "6225659f6208d12d1cdce801"
    // const idEstudiante = "622541aef1bd3418216d8831"

    const [descripcion, setDescripcion] = useState("");
    const [titulo, setTitulo] = useState("");
    const [puntaje, setPuntaje] = useState("");
    const [tiempo,setTiempo] = useState("");
    const [entregada,setEntregada] = useState(false);
    const [enviado,setEnviado] = useState(true);

    const inicialCargado = "Arrastra y Suelta el archivo, o bien da click para buscar el archivo"

    const [cargado,setCargado] = useState(inicialCargado);

    const inicialArchivo = {
        archivo:null,
        archivoNombre:'',
        archivoURL:''
    }
    const [archivo,setArchivo] = useState(inicialArchivo);

    const changeFile = (e) => {
        console.log(e.target.files[0].name);
        if (e.target.files[0] !== undefined) {
            setArchivo({
                archivo:e.target.files[0],
                archivoNombre:e.target.files[0].name
            })
            setCargado(`Se ha cargado el archivo: ${e.target.files[0].name}`)
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
        const existTarea = async(e)=>{
            const data = await privateAxios.get('/api/v1/tareas/entregada',{
                params:{
                    idclas:idClase, 
                    idest:idEstudiante,
                    num:numTarea
                }
            }).then((response)=>{console.log(response.data.rslt)
                setEntregada(response.data.rslt)
            })
        }
        existTarea()

        const loadTarea = async(e)=>{ 
            const data = await privateAxios.get(
                '/api/v1/tareas/tareabyid',{
                    params : {
                        idclas:idClase,
                        num:numTarea
                    }
                }
            ).then((response)=>{
                const tarea = response.data.rslt[0];
                console.log(tarea)
                setTitulo(tarea.info.titulo)
                setDescripcion(tarea.info.descripcion)
                setPuntaje(tarea.info.Puntaje)
                setTiempo(tiempoRestante(tarea.fechaEntrega))

            })
            .catch((response)=>{console.log(response)})
    
        }
        loadTarea();
      
    }, [enviado])

    const clickEntregar = async(e) =>{

        e.preventDefault();
        //SE CONFIGURA EL ARCHIVO DE LA TAREA
        const fd = new FormData()
        fd.append('file',archivo.archivo,archivo.archivoNombre);
        var error = false;
        const tarea = await privateAxios.put("/api/v1/tareas/newentregable",{
            params:{
                idclas:idClase, 
                idest:idEstudiante,
            },
            body:{
                numeroTarea: numTarea, 
                documentoURL:archivo.archivoNombre, 
                estado:"true",
                fechaEntrega:new Date(Date.now()).toISOString()
            }
        }).then((response)=>{
            console.log(response)})
        .catch((err)=>{
            console.log(err)
            error=true
        });
        
        
        // SE ENVIA LA TAREA
        if(!error){
            const fl = await privateAxios.post('/api/v1/tareas/file',fd,{
                onUploadProgress: progressEvent =>{
                    console.log('Upload progress: '+Math.round(progressEvent.loaded/progressEvent.total *100)+'%')
                }
            })
            setArchivo(inicialArchivo);
            setCargado(inicialCargado)
            console.log(archivo)

        }
        setEnviado(!enviado)
    }

    const clickActualizar = async(e)=>{
        e.preventDefault();
        //SE CONFIGURA EL ARCHIVO DE LA TAREA
        const fd = new FormData()
        fd.append('file',archivo.archivo,archivo.archivoNombre);
        var error = false;
        const tarea = await privateAxios.put("/api/v1/tareas/updateentregable",{
            params:{
                idclas:idClase, 
                idest:idEstudiante,
            },
            body:{
                numeroTarea: numTarea, 
                documentoURL:archivo.archivoNombre, 
                estado:"true",
                fechaEntrega:new Date(Date.now()).toISOString()
            }
        }).then((response)=>{
            console.log(response)})
        .catch((err)=>{
            console.log(err)
            error=true
        });
        
        
        // SE ENVIA LA TAREA
        if(!error){
            const fl = await privateAxios.post('/api/v1/tareas/file',fd,{
                onUploadProgress: progressEvent =>{
                    console.log('Upload progress: '+Math.round(progressEvent.loaded/progressEvent.total *100)+'%')
                }
            })
            setArchivo(inicialArchivo);
            setCargado(inicialCargado)
            console.log(archivo)

        }
        setEnviado(!enviado)
    }
    
    const clickEliminar =async(e)=>{
        e.preventDefault();
        const del  =  await privateAxios.delete('/api/v1/tareas/deleteentregable',{
            params:{
                idclas:idClase, 
                idest:idEstudiante,
                numeroTarea:numTarea
            }
        }).then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)})
        setEnviado(!enviado)
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
                            <br></br>
                            <h3 className="subtitulo">Estado</h3> 
                            <p className={entregada?"entregado":"pendiente"}>{entregada?"Entregado":"Sin Entregar"}</p>
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
                                    id="archivo-input"
                                    name="archivo"
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    onChange={(e) => {
                                    changeFile(e);
                                    }}
                                />
                                <div className="text-information">
                                    <h3>{cargado}</h3>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button className="btn-cancel" onClick={()=>{navigate(-1)}}>Cancelar</button>
                                <button className="btn-up"
                                    style={entregada?{display:"none"}:{}}
                                    onClick={(e)=>{
                                        clickEntregar(e)
                                    }}
                                >Enviar Tarea</button>

                                <button className="btn-update"
                                    style={!entregada?{display:"none"}:{}}
                                    onClick={(e)=>{
                                        clickActualizar(e)
                                    }}
                                >Actualizar Tarea
                                </button>

                                <button className="btn-del"
                                    style={!entregada?{display:"none"}:{}}
                                    onClick={(e)=>{
                                        clickEliminar(e);
                                    }}
                                >Eliminar Tarea</button>
                            </div>
                            <br></br>
                        </div>
                        
                    </div>
                </div>
        </>
    );
}

export default Entregar;