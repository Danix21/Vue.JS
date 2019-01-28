<template>
    <div class="container">
        <nav class="navbar navbar-dark bg-dark">
            <button class="btn btn-primary btn-block col-md-4" >Vene-tino</button><button class="btn btn-primary btn-block col-md-4">Argen-lano</button>
            
        </nav>
    </div>
</template>

<script lang="vue">

    class Persona {
        constructor(nombre, apellido, fechadenacimiento, mail, dni) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.fechadenacimiento = fechadenacimiento;
            this.mail = mail;
            this.dni = dni;
        }
    }

    export default {
        data() {
            return {
                palabra: new Palabra(),
                diccionario: [],
                id: ''
            }
        },
        created() {
            this.getPersonas();
        },
        methods: {
            getPersonas() {
                fetch('/api/personas')
                    .then(res => res.json())
                    .then(data => {
                        this.personas = data
                    });
            },
            addPersona() {
                fetch('/api/personas', {
                    method: 'POST',
                    body: JSON.stringify(this.persona),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getPersonas();
                })
                this.persona = new Persona();
                this.id= '';
            },
            deletePersona(id) { 
                fetch('/api/personas/' + id, {
                method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .then(data => {
                    this.getPersonas();
                    this.persona = new Persona()
                });
            },
            getPersona(id) {
                fetch('/api/personas/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.persona = new Persona(data.nombre, data.apellido, data.fechadenacimiento, data.mail, data.dni);
                        this.id = id;
                    });
            },
            updatePersona(id) {
               fetch('/api/personas/' + id, {
                    method: 'PUT',
                    body: JSON.stringify(this.persona),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getPersonas();
                })
                this.persona = new Persona();
                this.id= '';
            },
            addOrUpdatePersona() {
                console.log(this.id);
                if(this.id === ''){
                    this.addPersona();
                }else{
                    this.updatePersona(this.id);
                }
            }
        }   
    }
</script>