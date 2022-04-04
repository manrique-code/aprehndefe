import { useState } from "react"
import { privateAxios } from "../../../lib/apiClient"
import { Link } from "react-router-dom"
import "./ScrollActividades.css"


const ScrollActiviades = ({tareas,idclase,idestudiante}) => {
    console.log(tareas,idclase,idestudiante)
    idclase = "6225659f6208d12d1cdce801"
    idestudiante = "622541aef1bd3418216d8831"
    const loadTareas =()=>{
        const datoTareas = tareas.map((dato,i)=>{
            return (<ItemActividades key={dato.numeroTarea} 
                data = {dato} idclase={idclase} idestudiante = {idestudiante}
            ></ItemActividades>)
        })
        return datoTareas
    }

    return(
        <>
            <div className="scrollTareas">
                    {loadTareas()}
            </div>
        </>
    )
}

const ItemActividades =(
    {data,idclase,idestudiante}
)=>{
    
    const f  = new Date(data.fechaEntrega)
    console.log(f)

    return(
        <>
            <div className="itemScrollAct">
                <div>
                    <h4>Tarea</h4>
                    <p>{data.info.titulo}</p>
                    <p>{data.info.Puntaje}%</p>
                    <p>{data.fechaEntrega}</p>
                </div>
                <div>
                    <Link to={`/tareas/entregar/${data.numeroTarea}/${idclase}/${idestudiante}`}>
                        <p>Ver Tarea</p>
                    </Link> 
                </div>

                
            </div>
        </>
    )
}


export default ScrollActiviades