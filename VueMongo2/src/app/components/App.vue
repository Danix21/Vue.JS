<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">Inicio -></a>
        </nav>
        <div class="container">
            <div class="row pt-3">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addTask">
                                <div class="form-group">
                                    <input type="text" placeholder="Insert a task" class="form-control" v-model="task.title">
                                </div>
                                <div class="form-group">
                                    <textarea cols="30" rows="10" class="form-control" placeholder="Insert a description" v-model="task.description"></textarea>
                                </div>
                                <button class="btn btn-primary btn-block">Save</button>
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
                            <tr v-for="(task, key) of tasks" :key="key">
                                <th>{{ task.title }}</th>
                                <th>{{ task.description }}</th>
                                <th>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
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
    class Task {
        constructor(titulo, desc) {
            this.title = titulo;
            this.description = desc;
        }
    }

    export default {
        data() {
            return {
                task: new Task(),
                tasks: []
            }
        },
        created() {
            this.getTasks();
        },
        methods: {
            getTasks() {
                fetch('/api/tasks')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data
                    });
            },
            addTask() {
                fetch('/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTasks();
                })
                this.task = new Task();
            },
            deleteTask(id) { 
                fetch('/api/tasks/' + id, {
                method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .then(data => this.getTasks());
            },
            editTask(id) {
                
            }
        }   
    }
</script>