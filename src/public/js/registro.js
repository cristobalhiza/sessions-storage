const inputNombre=document.getElementById('nombre')
const inputEmail=document.getElementById('email')
const inputPassword=document.getElementById('password')
const btnSubmit=document.getElementById('btnSubmit')
const divMensajes=document.getElementById('mensajes')

btnSubmit.addEventListener('click', async(e)=>{
    e.preventDefault()
    const nombre=inputNombre.value.trim()
    const email=inputEmail.value.trim()
    const password=inputPassword.value.trim()
    if(!nombre||!email||!password){
        alert('Complete los datos')
        return
    }
    //validaciones
    const body={
        nombre, email, password
    }

    const respuesta=await fetch('/api/sessions/registro', {
        method: 'post',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify(body)
    })
    let datos= await respuesta.json()
    if(respuesta.status>=400){
        divMensajes.textContent=datos.error
        setTimeout(()=>{
            divMensajes.textContent=''
        }, 5000)
    }else{
        window.location.href=`/login?mensaje=Registro Exitoso para ${datos.nuevoUsuario.email}`
    }
})