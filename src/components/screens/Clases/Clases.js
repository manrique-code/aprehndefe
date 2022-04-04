import React, { useEffect, useState } from 'react';
import { privateAxios } from '../../../lib/apiClient';
import './Clases.css'
import flecha from "../../../assets/img/classImg/flecha.png";
import { Link } from 'react-router-dom';


const Clases = () =>{
    const  idEstudiante = "622541aef1bd3418216d8831"
    const [clases,setClases]=useState([])
    const [tareas,setTareas]=useState([])
    
    const  [clase,setClase] =useState("")
    const  [nombre,setNombre] =useState("")
    const  [seccion,setSeccion] =useState("")
    const  [identidad,setIndentidad] = useState("")
    const  [email,setEmail] = useState("")



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
        const infoEst  = async()=>{
            const data = await privateAxios(`/api/v1/estudiantes/verestudiante/${idEstudiante}`)
            .then((response)=>{
                const estuData = response.data.rslt
                setNombre(estuData.nombres+" "+estuData.apellidos)
                setIndentidad(estuData.identidad)
                setEmail(estuData.usuario.email)
            })
        }
        infoEst()
    },[])



    const cargarCard = () =>{
        return  clases.map((dato) =>{
            return (<Card data={dato} idEstudiante={idEstudiante}></Card>)
        })
    }



    return(
    <>
    <div className='container-total'>
        
        <div className='container-tareas'> 
            <div className="des-info">
            <h2 className="titulo">Clases</h2>
                <h2 className="titulo"><b>{clase}</b></h2>
                <br/> 
                
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
                <h3 className="subtitulo">Email</h3> 
                <p className="puntaje">
                    {email}
                </p>
                <br></br>
                {/* <h3 className="subtitulo">Estado</h3> 
                <p className={entregada?"entregado":"pendiente"}>{entregada?"Entregado":"Sin Entregar"}</p> */}
                <div className="regresar">
                    <button className="btn-regresar">Regresar</button>
                </div>
          </div>
        </div>
        <div className='container-cards'>
            {cargarCard()}
        </div>
        
    </div>
    </>
  );
}

const Card = ({data, idEstudiante}) =>{
    const imageUrl='https://static6.depositphotos.com/1012885/565/i/450/depositphotos_5653101-stock-photo-backgrounds-book-cover.jpg'
    const title = data.nombre
    const seccion= data.seccion
    const idClase = data._id
    console.log(idClase)
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
                <Link to={`/clases/actividades/${idClase}/${idEstudiante}`}>
                    <button className='btn-verclass'>
                        Ver clase
                    </button>
                </Link>
          </div>
     </>
    )
}

export default Clases;