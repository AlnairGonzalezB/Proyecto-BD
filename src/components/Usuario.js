import React from 'react'
import {db} from '../firebase'
import {useState, useEffect} from 'react'
import "./Usuario.css"

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([])
    const [rentas, setRentas] = useState([])
    const [usuarioId, setUsuarioId] = useState([])
    const [membresia, setMembresia] = useState([])
    const [nombres, setNombres] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [modoEliminar, setModoEliminar] = useState(false)
    const [id, setId] = useState('')
    const [modoRenta, setModoRenta] = useState(false)
  
    const getUsuarios = async () =>{
      const data = await db.collection('usuarios').get()
      const arrayUsuarios = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setUsuarios(arrayUsuarios)
      console.log(usuarios)
    }

    const getRenta = async () =>{
        const data = await db.collection('renta').get()
        const arrayRentas = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setRentas(arrayRentas)
        console.log(rentas)
    }
  
      useEffect(()=>{
        getUsuarios()
        getRenta()
     },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
     const limpiarIns =() =>{
        setUsuarioId("")
        setMembresia("")
        setNombres("")
        setId("")
     }
  
     const agregarUsuario = async(e)=>{
        e.preventDefault()
        const firebaseUsuarios = await db.collection('usuarios').add({
          UsuarioId: id,
          UsuarioMembresia: membresia,
          UsuarioNombre: nombres
        })
        limpiarIns()
        getUsuarios()
     }
  
      const activarEdicion = (item) =>{
        setModoEdicion(true)
        if(!modoEdicion){
            setUsuarioId(item.UsuarioId)
            setMembresia(item.UsuarioMembresia)
            setNombres(item.UsuarioNombre)
            setId(item.id)
        }else{
          setModoEdicion(false)
          limpiarIns()
        }
        
      }
  
      const activarEliminar = (item) =>{
        setModoEliminar(!modoEliminar)
      }

      const activarRenta = (item) =>{
        setModoRenta(!modoRenta)
      }
  
      const editarUsuario = async(e) =>{
        e.preventDefault()
        const firebaseUsuarios = await db.collection('usuarios').doc(id).update({
            UsuarioId: usuarioId,
            UsuarioMembresia: membresia,
            UsuarioNombre: nombres
        })
        setModoEdicion(false)
        limpiarIns()
        getUsuarios() 
      }
  
      const eliminarUsuarios = async(id) =>{
        await db.collection('usuarios').doc(id).delete()
        activarEliminar()
        getUsuarios()
      }
    return (
        <div className = "divPadre">
          <h1>Listado</h1>
          {modoEdicion ? <h2>Editar</h2> : <h2>Agregar</h2>}
          <form className = "forBase" onSubmit = {modoEdicion ? editarUsuario : agregarUsuario}>
              <div className="DivBase">
                <label>Nombre</label>
                <input type="text" className="form-control" value={nombres} onChange={e => setNombres(e.target.value)} required></input>
                <label>Membresia</label>
                <input type="text" className="form-control" value={membresia} onChange={e => setMembresia(e.target.value)} required></input>
              </div>
                <button type="submit" className="btnAce">Aceptar</button>
          </form>
          <ul className = "list-group ">
            {
            usuarios.map(usuarios => (
              <li className = "list-group-item bg-primary" key = {usuarios.id}>
                <ul className="list-group-item bg-secondary text-white"> Nombre: {usuarios.UsuarioNombre}</ul>
                <ul className="list-group-item bg-secondary text-white"> ID: {usuarios.id}</ul>
                <ul className="list-group-item bg-secondary text-white"> Membresia: {usuarios.UsuarioMembresia}</ul>
                {modoEdicion ? <button className = "btn btn-warning btn-block " onClick={() => activarEdicion(usuarios)}>Cancelar edicion</button> : 
                <button className = "btn btn-warning btn-block " onClick={() => activarEdicion(usuarios)}>Editar</button>}
                {modoEliminar ?
                <h>
                  Seguro?
                  <button className = "btn btn-danger btn-block " onClick={() => eliminarUsuarios(usuarios.id)}>Si</button>
                  <button className = "btn btn-danger btn-block " onClick={() => activarEliminar(usuarios)}>No</button>
                </h> 
                : <button className = "btn btn-danger btn-block " onClick={() => activarEliminar(usuarios)}>Eliminar</button>}
                {
                rentas.map(rentas =>(
                    <lu key = {rentas.id}>
                        {usuarios.UsuarioId === rentas.ClienteId &&(
                            <ul> Id renta: {rentas.RentaId}</ul>
                        )
                        }
                    </lu>
                    ))
            }
            <button onClick={() => activarRenta(usuarios)}>Rentar</button>
            {modoRenta ? 
             <form className = "forBase" onSubmit = {modoEdicion ? editarUsuario : agregarUsuario}>
             <div className="DivBase">
               <label>Nombre</label>
               <input type="text" className="form-control" value={nombres} onChange={e => setNombres(e.target.value)} required></input>
               <label>Id</label>
               <input type="text" className="form-control" value={usuarioId} onChange={e => setUsuarioId(e.target.value)} required></input>
               <label>Membresia</label>
               <input type="text" className="form-control" value={membresia} onChange={e => setMembresia(e.target.value)} required></input>
             </div>
               <button type="submit" className="btnAce">Aceptar</button>
            </form>: <p></p> 
                }
            </li>
            ))
            }
          </ul>
          
        </div>
    )
}

export default Usuario
