import React from 'react'
import {db} from '../firebase'
import {useState, useEffect} from 'react'
import "./Usuario.css"

export const Libros = () => {
    const [libros, setLibros] = useState([])
    const [venta, setVenta] = useState([])
    const [usuario, setUsuario] = useState([])
    const [nombreLibro, setNombreLibro] = useState([])
    const [precioLibro, setPrecioLibro] = useState([])
    const [descripcionLibro, setDescripcionLibro] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [modoEliminar, setModoEliminar] = useState(false)
    const [id, setId] = useState('')
    var f = new Date();
    var dia = f.getDate()
    var mes = f.getMonth()+1
    var messig = 1
    var año = f.getFullYear()
    var fecha = ""
    fecha.concat(dia, "/", mes, "/", año)
  
    const getLibros = async () =>{
      const data = await db.collection('libro').get()
      const arrayLibros = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setLibros(arrayLibros)
      console.log(libros)
    }

    const getVentas = async() =>{
        const data = await db.collection('venta').get()
        const arrayVentas = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setVenta(arrayVentas)
        console.log(venta)
    }

    const getUsuarios = async() =>{
        const data = await db.collection('usuarios').get()
        const arrayUsuarios = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setUsuario(arrayUsuarios)
        console.log(usuario)
    }
  
      useEffect(()=>{
        getLibros()
        getVentas()
        getUsuarios()
     },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
     const limpiarIns =() =>{
        setNombreLibro("")
        setPrecioLibro("")
        setDescripcionLibro("")
        setId("")
     }
  
     const agregarLibro = async(e)=>{
        e.preventDefault()
        const firebaseLibros = await db.collection('libro').add({
            LibroNombre: nombreLibro,
            LibroPrecio: precioLibro,
            LibroDescripcion: descripcionLibro,
        })
        limpiarIns()
        getLibros()
     }

     const agregarVenta = async(e, idL, idU, lPr)=>{
        e.preventDefault()
        const firebaseVentas = await db.collection('venta').add({
            VentaTipo: "Libro",
            ClienteId: idU,
            VentaPrecio: lPr,
            LibroId: idL,
        })
     }

     const agregarRenta = async(e, idL, idU, lPr)=>{
        e.preventDefault()
        const firebaseVentas = await db.collection('renta').add({
            Tiporenta: "Libro",
            Clienteid: idU,
            Preciorenta: lPr,
            idobj: idL,
            Iniciorenta: fecha.concat(dia, "/", mes, "/", año),
            Finrenta: fecha.concat(dia, "/", messig, "/", año)
        })
     }
  
      const activarEdicion = (item) =>{
        setModoEdicion(true)
        if(!modoEdicion){
            setNombreLibro(item.LibroNombre)
            setPrecioLibro(item.LibroPrecio)
            setDescripcionLibro(item.LibroDescripcion)
            setId(item.id)
        }else{
          setModoEdicion(false)
          limpiarIns()
        }
        
      }
  
      const activarEliminar = (item) =>{
        setModoEliminar(!modoEliminar)
      }
  
      const editarLibro = async(e) =>{
        e.preventDefault()
        const firebaseLibros = await db.collection('libro').doc(id).update({
            LibroNombre: nombreLibro,
            LibroPrecio: precioLibro,
            LibroDescripcion: descripcionLibro,
        })
        setModoEdicion(false)
        limpiarIns()
        getLibros() 
      }
  
      const eliminarLibro = async(id) =>{
        await db.collection('libro').doc(id).delete()
        activarEliminar()
        getLibros()
      }

      const mostrarVenta = (item) =>{
          document.getElementById(item.id).style.display="block";
      }

      const esconderVenta = (item) =>{
        document.getElementById(item.id).style.display="none";
    }

    return (
        <div className = "container bg-default">
      <h1>Listado</h1>
      {modoEdicion ? <h2>Editar</h2> : <h2>Agregar</h2>}
      <form onSubmit = {modoEdicion ? editarLibro : agregarLibro}>
          <div className="container form-group">
            <label>Titulo </label>
            <input type="text" className="form-control" value={nombreLibro} onChange={e => setNombreLibro(e.target.value)} required></input>
            <label>Precio</label>
            <input type="text" className="form-control" value={precioLibro} onChange={e => setPrecioLibro(e.target.value)} required></input>
            <label>Descripcion</label>
            <input type="text" className="form-control" value={descripcionLibro} onChange={e => setDescripcionLibro(e.target.value)} required></input>
            <button type="submit" className="btn btn-success btn-block">Aceptar</button>
          </div>
          
      </form>
      <ul className = "list-group ">
        {
        libros.map(item => (
          <li className = "list-group-item bg-primary" key = {item.id}>
            <ul className="list-group-item bg-secondary text-white"> Titulo libro: {item.LibroNombre}</ul>
            <ul className="list-group-item bg-secondary text-white"> ID libro: {item.id}</ul>
            <ul className="list-group-item bg-secondary text-white"> Precio libro: {item.LibroPrecio}</ul>
            <ul className="list-group-item bg-secondary text-white"> Descripcion libro: {item.LibroDescripcion}</ul>
            {modoEdicion ? <button className = "btn btn-warning btn-block " onClick={() => activarEdicion(item)}>Cancelar edicion</button> : 
            <button className = "btn btn-warning btn-block " onClick={() => activarEdicion(item)}>Editar</button>}
            {modoEliminar ?
            <h>
              Seguro?
              <button className = "btn btn-danger btn-block " onClick={() => eliminarLibro(item.id)}>Si</button>
              <button className = "btn btn-danger btn-block " onClick={() => activarEliminar(item)}>No</button>
            </h> 
            : <button className = "btn btn-danger btn-block " onClick={() => activarEliminar(item)}>Eliminar</button>}
            <button onClick={()=> mostrarVenta(item)}>Comprar/Rentar</button>
            <div className="divdesa" id={item.id} >
            <button onClick={()=> esconderVenta(item)}>Cerrar</button>
            <p>Que usuario quiere Comprar este libro?</p>
            {
                usuario.map(itemU => (
                    <ul>Nombre usuario: {itemU.UsuarioNombre}
                    <button onClick={e => {
                        agregarVenta(e, item.id, itemU.id, item.LibroPrecio) 
                        esconderVenta(item)}}>Comprar</button>
                    <button onClick={e => {
                        agregarRenta(e, item.id, itemU.id, (item.LibroPrecio)*.35) 
                        esconderVenta(item)}}>Rentar</button>
                    </ul>                    
                ))
            }
            </div>
            <p></p>
        </li>
        ))
        }
      </ul>
    </div>
    )
}
