import { useState,useEffect } from "react";
import "./actividades.css";
import { privateAxios, publicAxios } from "../../../lib/apiClient";
import ScrollActiviades from "../../ui/scroll/ScrollActividades";
import { useParams,Link } from "react-router-dom";

const ActiviadesClase =()=>{
    //DATA DE PRUEBA
    //const idClase = "6225659f6208d12d1cdce801"
    //const idEstudiante = "622541aef1bd3418216d8831"

    const {idClase, idEstudiante} = useParams()
    

    const  [clase,setClase] =useState("")
    const  [nombre,setNombre] =useState("")
    const  [seccion,setSeccion] =useState("")
    const  [identidad,setIndentidad] = useState("")
    const  [tareas,setTareas] = useState([])
    const [horaInicio,setHoraInicio]=useState("")
    const [horaFin,setHoraFin]=useState("")


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
                const hor = claseData.horario
                const hi = hor.hora[0].toString().split("")
                const hf = hor.hora[1].toString().split("")

                setHoraInicio(`${hi[0]}${hi[1]}:${hi[2]}${hi[3]}`)
                setHoraFin(`${hf[0]}${hf[1]}:${hf[2]}${hf[3]}`)
                
            })

        }
        infoClas()
    },[])

    return(
        <>  
            <div className="container">
                    <div className="container-body">
                    
                        <div className="descripcion-clase">
                        <h2 className="titulo-activ">Clase:</h2>
                            <h3 className="titulo-activ"><b>{clase}</b></h3>
                            <br/>
                            <h3 className="subtitulo">Seccion </h3>  
                            <p className="puntaje">
                                <b>{seccion}</b>
                            </p>
                            <br/>
                            <h3 className="subtitulo">Horario</h3> 
                            <p className="puntaje">
                                Comienza: {horaInicio}<br/>Termina:  {horaFin}
                            </p>
                            <br></br>
                            <h3 className="subtitulo">Alumno</h3>
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
                            <div className="back-clases">
                                <Link to={'/Clases'}>
                                <button className="btn-back-clases">REGRESAR</button>
                                </Link>
                            </div>
                        </div>


                        <div className="actividades-clase">
                        <div className="titulo-activ">
                                <h2><b>{tareas.length}</b> Actividades Asignadas </h2>
                            </div>
                            <ScrollActiviades tareas={tareas} idestudiante={idEstudiante} idclase={idClase}/>
                        </div>
                        
                    </div>
                </div>
        </>
    );
}

export default ActiviadesClase;