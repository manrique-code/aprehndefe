import React, { useEffect, useState } from "react"
import { privateAxios, publicAxios } from "../../../lib/apiClient"
import "./ScrollViewTareas.css"

const ScrollViewTareas = (tareas,idclase,idestudiante) => {
    idclase = "6225659f6208d12d1cdce801"
    idestudiante = "622541aef1bd3418216d8831"
    const loadTareas =()=>{
        const datoTareas = tareas.array.map((dato,i)=>{
            return (<ItemTarea key={dato.numeroTarea} 
                data = {dato} idclase={idclase} idestudiante = {idestudiante}
            ></ItemTarea>)
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

const ItemTarea =(
    {data,idclase,idestudiante}
)=>{
    const  titulo = data.info.titulo
    const estado = data.estado
    const fecha = new Date(data.fechaEntrega)
    const f = Date(fecha)
    const fec = f.split(" ")
    const fechaEntrega = `${fec[2]} ${fec[1]} ${fec[3]} ${fec[4]}`
    const valor = data.info.Puntaje
    const valorAsig = data.Puntaje

    const [puntos,setPuntos] = useState(0)
    
    const evaluarTarea = async()=>{
        const evaluacion = privateAxios.put(`/api/v1/tareas/evaluartarea/${idclase}/${idestudiante}`,{

            numeroTarea:data.numeroTarea,
            puntaje:puntos
    
        })
    }

    const descargar = () =>{
        const evaluacion = privateAxios.get(`/api/v1/tareas/descargar/${data.documentoURL}`,{
            responseType:'blob'
        })
        .then((response)=>{
            console.log(response.data)
            const url = window.URL.createObjectURL(
                new Blob([response.data]),
              );
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute("target","_blank")
              link.setAttribute(
                'download',
                data.documentoURL,
              );
              
          
              // Append to html link element page
              document.body.appendChild(link);
          
              // Start download
              link.click();
          
              // Clean up and remove the link
              link.parentNode.removeChild(link);
        })
    }

    

    return(
        <>
            <div className="itemScroll">
                <div>
                    <p><b>Titulo:</b> {titulo}</p>
                    <p><b>Estado:</b> {estado}</p>
                    <p><b>Entregado en:</b> {fechaEntrega}</p>
                    <p><b>Valor:</b> {valor}%</p>
                </div>
                <div className="actions">
                    <button className="btn-download" onClick={()=>{descargar()}} >Descargar Archivo</button>
                    <input type={"number"} value={(valorAsig?valorAsig:puntos)} onChange={(e)=>{setPuntos(e.target.value)}} ></input>
                    <button className="btn-eval" onClick={()=>{evaluarTarea()}}>Evaluar</button>
                </div>
                
            </div>
        </>
    )
}

export default ScrollViewTareas