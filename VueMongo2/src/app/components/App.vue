<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">Task -></a>
            <a href="/diccionario.html" class="navbar-brand">Diccionario -></a>
        </nav>
        <div class="container">
            <div class="row pt-3">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addOrUpdatePersona">
                                <div class="form-group">
                                    <input type="text" placeholder="Insert a task" class="form-control" v-model="persona.nombre">
                                </div>
                                <div class="form-group">
                                    <textarea cols="30" rows="10" class="form-control" placeholder="Insert a description" v-model="persona.apellido"></textarea>
                                </div>
                                <template v-if="id === ''">
                                    <button class="btn btn-primary btn-block">Save</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Update</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(persona, key) of personas" :key="key">
                                <th>{{ persona.nombre }}</th>
                                <th>{{ persona.apellido }}</th>
                                <th>
                                    <button @click="deletePersona(persona._id)" class="btn btn-danger">Delete</button>
                                    <button @click="getPersona(persona._id)" class="btn btn-secondary">Edit</button>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
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
                persona: new Persona(),
                personas: [],
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