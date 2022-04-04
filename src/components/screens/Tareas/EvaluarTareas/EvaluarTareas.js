import { useEffect, useState } from "react";
import "./EvaluarTareas.css"
import ScrollViewTareas from "../../../ui/scroll/ScrollViewTareas";
import { privateAxios } from "../../../../lib/apiClient";

const Evaluar = () =>{
    const idClase = "6225659f6208d12d1cdce801"
    const idEstudiante ="622541aef1bd3418216d8831"

    const  [clase,setClase] =useState("")
    const  [nombre,setNombre] =useState("")
    const  [seccion,setSeccion] =useState("")
    const  [identidad,setIndentidad] = useState("")
    // const  [puntaje,setPuntaje] =useState("40%")
    // const  [tiempo,setTiempo] = useState("2 Dias 4 horas 5 minutos")
    const  [tareas,setTareas] = useState([])
    const  [cant, setCant] = useState(0)

    useEffect(() => {
        const allTareas = async()=>{
            const data = await privateAxios("api/v1/tareas/allentregas",{
                params:{
                    idclas:idClase,
                    idest:idEstudiante
                }
            }).then((response)=>{
                setTareas(response.data.rslt[0].tareaEntregable)
                console.log(tareas.length)
                setCant(tareas.length)
            })
        }
        allTareas()
        
        const infoEst  = async()=>{
            const data = await privateAxios(`/api/v1/estudiantes/verestudiante/${idEstudiante}`)
            .then((response)=>{
                const estuData = response.data.rslt
                console.log(estuData);
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
            })

        }
        infoClas()

        
    }, [])
    


    return ( 
        <>  
            <div className="container">
                    <div className="container-body">
                    
                        <div className="descripcion-info-clase">
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


                        <div className="entregable-tarea-view">
                            <div className="tittle">
                                <h2><b>{tareas.length}</b> Tareas Entregadas </h2>
                            </div>
                            <ScrollViewTareas array={tareas}/>
                        </div>
                        
                    </div>
                </div>
        </>
    )
}



export default Evaluar;