import React from 'react'
import {db} from '../firebase'
import {useState, useEffect} from 'react'
import "./Usuario.css"

export const Ventas = () => {
    const [ventas, setVentas] = useState([])
    const [modoEliminar, setModoEliminar] = useState(false)
  
    const getVentas = async () =>{
      const data = await db.collection('venta').get()
      const arrayVentas = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setVentas(arrayVentas)
      console.log(ventas)
    }
  
      useEffect(()=>{
        getVentas()
     },[]) // eslint-disable-line react-hooks/exhaustive-deps

      const activarEliminar = (item) =>{
        setModoEliminar(!modoEliminar)
      }

      const eliminarLibro = async(id) =>{
        await db.collection('venta').doc(id).delete()
        activarEliminar()
        getVentas()
      }
    return (
        <div>
            Listado de ventas
      <ul className = "list-group ">
        {
        ventas.map(item => (
          <li className = "list-group-item bg-primary" key = {item.id}>
              <ul className="list-group-item bg-secondary text-white"> Tipo de venta: {item.VentaTipo}</ul>
            <ul className="list-group-item bg-secondary text-white"> Id venta: {item.id}</ul>
            <ul className="list-group-item bg-secondary text-white"> Id Libro: {item.LibroId}</ul>
            <ul className="list-group-item bg-secondary text-white"> Id Cliente: {item.ClienteId}</ul>
            <ul className="list-group-item bg-secondary text-white"> Costo: {item.VentaPrecio}</ul>
            {modoEliminar ?
            <h>
              Seguro?
              <button className = "btn btn-danger btn-block " onClick={() => eliminarLibro(item.id)}>Si</button>
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
