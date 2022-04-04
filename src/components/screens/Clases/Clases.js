import React, { useEffect, useState } from 'react';
import { privateAxios } from '../../../lib/apiClient';
import './Clases.css'
import flecha from "../../../assets/img/classImg/flecha.png";
import { Link } from 'react-router-dom';


const Clases = () =>{
    const  idEstudiante = "622541aef1bd3418216d8831"
    const [clases,setClases]=useState([])
    const [tareas,setTareas]=useState([])




    useEffect(()=>{
        const loadClases = async()=>{
            const data = await privateAxios.get(`/api/v1/clases/clasest/${idEstudiante}`)
            .then((response)=>{
                const cls = response.data.rslt
                const rem = cls.map((dato) => {
                    return dato.Clases[0]
                })
                setClases(rem)
               
                const tar = rem.map((dato) => {
                    const datos = dato?.tareaAsignada
                    if (datos){
                        return datos
                    }
                })
                console.log(tar)
            })
        }
        loadClases();
    },[])



    const cargarCard = () =>{
        return  clases.map((dato) =>{
            return (<Card data={dato}></Card>)
        })
    }



    return(
    <>
    <div className='container-total'>
        <div className='container-cards'>
            {cargarCard()}
        </div>
        <div className='container-tareas'> 
            <div className="des-tareas">
                <h2 className="titulo">Tarea</h2>
                {/* crad 1 de tarea */}
                <div className='tarea-content1'>
                    <div className='tarea-content'>
                        <div className='tarea-descrip'>
                            <h3>Informacion de la tarea</h3>
                        </div>
                        <div className='tarea-boy'>
                            <table>
                                <tr>
                                    <td>Puntos</td>
                                    <td>Entrega:</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <button className='btn-tareas'>
                        Ver tarea
                    </button>
              </div>
          </div>
        </div>
        
    </div>
    </>
  );
}

const Card = ({data}) =>{
    const imageUrl='https://static6.depositphotos.com/1012885/565/i/450/depositphotos_5653101-stock-photo-backgrounds-book-cover.jpg'
    const title = data.nombre
    const seccion= data.seccion
    return(
     <>
     <div className='card-container'>
            <div className="image-container">
              <img src={imageUrl} alt=''/>
            </div>
            <div className='card-content'>
              <div className='card-title'>
                <h4>{title}</h4>
              </div>
              <div className='card-boy'>
                <p>{seccion}</p>
              </div>
            </div>
                <Link to={`/clases/actividades`}>
                    <button className='btn-verclass'>
                        Ver clase
                    </button>
                </Link>
          </div>
     </>
    )
}

export default Clases;