import { useState,useEffect } from "react";
import "./actividades.css";
import { privateAxios, publicAxios } from "../../../lib/apiClient";
import ScrollActiviades from "../../ui/scroll/ScrollActividades";

const ActiviadesClase =()=>{
    //DATA DE PRUEBA
    const idClase = "6225659f6208d12d1cdce801"
    const idEstudiante = "622541aef1bd3418216d8831"

    const  [clase,setClase] =useState("")
    const  [nombre,setNombre] =useState("")
    const  [seccion,setSeccion] =useState("")
    const  [identidad,setIndentidad] = useState("")
    const  [tareas,setTareas] = useState([])


    useEffect(()=>{
        const infoEst  = async()=>{
            const data = await privateAxios(`/api/v1/estudiantes/verestudiante/${idEstudiante}`)
            .then((response)=>{
                const estuData = response.data.rslt
                setNombre(estuData.nombres+" "+estuData.apellidos)
                setIndentidad(estuData.identidad)
            })
        }
        infoEst()

        const infoClas  = async()=>{
            const data = await privateAxios(`/api/v1/clases/verclase/${idClase}`)
            .then((response)=>{
                const claseData = response.data.rslt
                setClase(claseData.nombre)
                setSeccion(claseData.seccion)
                setTareas(claseData.tareaAsignada)
            })

        }
        infoClas()
    },[])

    return(
        <>  
            <div className="container">
                    <div className="container-body">
                    
                        <div className="descripcion-tarea">
                        <h2 className="titulo">Clase:</h2>
                            <h2 className="titulo"><b>{clase}</b></h2>
                            <br/>
                            <h3 className="subtitulo">Seccion: <b>{seccion}</b></h3>  
                            
                            <br/>
                            <h3 className="subtitulo">Alumno:</h3>
                            <p className="puntaje">
                                {nombre} 
                            </p>
                            <br/>
                            <h3 className="subtitulo">Identidad</h3> 
                            <p className="puntaje">
                                {identidad}
                            </p>
                            <br></br>
                            {/* <h3 className="subtitulo">Estado</h3> 
                            <p className={entregada?"entregado":"pendiente"}>{entregada?"Entregado":"Sin Entregar"}</p> */}
                            <div className="back">
                                <button className="btn-back">Regresar</button>
                            </div>
                        </div>


                        <div className="entregable-tarea">
                        <div className="tittle">
                                <h2><b>10</b> Actividades Asignadas </h2>
                            </div>
                            <ScrollActiviades tareas={tareas} idestudiante={idEstudiante} idclase={idClase}/>
                        </div>
                        
                    </div>
                </div>
        </>
    );
}

export default ActiviadesClase;