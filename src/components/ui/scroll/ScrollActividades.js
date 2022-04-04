import { useState } from "react"
import { privateAxios } from "../../../lib/apiClient"
import { Link } from "react-router-dom"
import "./ScrollActividades.css"


const ScrollActiviades = ({tareas,idclase,idestudiante}) => {
    // console.log(tareas,idclase,idestudiante)
    idclase = "6225659f6208d12d1cdce801"
    idestudiante = "622541aef1bd3418216d8831"
    const loadTareas =()=>{
        const datoTareas = tareas.map((dato,i)=>{
            if(tareas.length>0){
                return (<ItemActividades key={dato.numeroTarea} 
                    data = {dato} idclase={idclase} idestudiante = {idestudiante}
                ></ItemActividades>)
            }else{
                return (<h1>No tienes actividades Asignadas</h1>)
            }
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
    
    const fecha = new Date(data.fechaEntrega)
    const f = Date(fecha)
    const fec = f.split(" ")
    const fechaEntrega = `${fec[2]} ${fec[1]} ${fec[3]}`

    return(
        <>
            <div className="itemScrollAct">
                <div>
                    <h4>Tarea</h4>
                    <p> <b>Titulo: </b>{data.info.titulo}</p>
                    <p> <b>Valor:  </b>{data.info.Puntaje}%</p>
                    <p><b>Fecha Entrega: </b>{fechaEntrega}</p>
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