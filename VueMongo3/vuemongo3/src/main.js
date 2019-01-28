import Vue from "vue";
import App from "./App.vue";
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

mongoose
  .connect("mongodb://localhost/vuemongo");

// Settings
App.set("port", process.env.PORT || 3000);

// Middlewares
App.use(morgan("dev"));
App.use(express.json());

// Routes
App.use("/api/tasks", require("./routes/tasks"));

// Static files
App.use(express.static(__dirname + "./public"));

// Server is listening
App.listen(App.get("port"));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
