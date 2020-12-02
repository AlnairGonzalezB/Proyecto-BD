import React from 'react'
import {db} from '../firebase'
import {useState, useEffect} from 'react'
import "./Usuario.css"

export const Rentas = () => {
    const [rentas, setRentas] = useState([])
    const [modoEliminar, setModoEliminar] = useState(false)
  
    const getRentas = async () =>{
      const data = await db.collection('renta').get()
      const arrayRentas = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setRentas(arrayRentas)
      console.log(rentas)
    }
  
      useEffect(()=>{
        getRentas()
     },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
      const activarEliminar = (item) =>{
        setModoEliminar(!modoEliminar)
      }
  
      const eliminarRenta = async(id) =>{
        await db.collection('renta').doc(id).delete()
        activarEliminar()
        getRentas()
      }
    return (
        <div className = "container bg-default">
      <ul className = "list-group ">
        {
        rentas.map(item => (
          <li className = "list-group-item bg-primary" key = {item.id}>
            <ul className="list-group-item bg-secondary text-white"> Tipo de renta: {item.Tiporenta}</ul>
            <ul className="list-group-item bg-secondary text-white"> Id renta: {item.id}</ul>
            <ul className="list-group-item bg-secondary text-white"> Id cliente: {item.Clienteid}</ul>
            <ul className="list-group-item bg-secondary text-white"> Id articulo: {item.idobj}</ul>
            <ul className="list-group-item bg-secondary text-white"> Inicio de renta: {item.Iniciorenta}</ul>
            <ul className="list-group-item bg-secondary text-white"> Fin renta: {item.Finrenta}</ul>
            <ul className="list-group-item bg-secondary text-white"> Precio renta: {item.Preciorenta}</ul>
            {modoEliminar ?
            <h>
              Seguro?
              <button className = "btn btn-danger btn-block " onClick={() => eliminarRenta(item.id)}>Si</button>
              <button className = "btn btn-danger btn-block " onClick={() => activarEliminar(item)}>No</button>
            </h> 
            : <button className = "btn btn-danger btn-block " onClick={() => activarEliminar(item)}>Eliminar</button>}
            
        </li>
        ))
        }
      </ul>
    </div>
    )
}
