<template>
    <div>
      <h2>Clientes</h2>
  
      <div v-if="showForm">
        <h3>{{ isEditing ? 'Editar Cliente' : 'Crear Cliente' }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="form.nombre" required>
          </div>
          <div class="form-group">
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" v-model="form.apellido" required>
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input type="text" id="telefono" v-model="form.telefono" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <button type="submit">{{ isEditing ? 'Guardar Cambios' : 'Crear' }}</button>
          <button type="button" @click="cancelForm">Cancelar</button>
        </form>
      </div>
  
      <button @click="createNew">Crear Nuevo Cliente</button>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.apellido }}</td>
            <td>{{ cliente.telefono }}</td>
            <td>{{ cliente.email }}</td>
            <td>
              <button @click="editCliente(cliente)">Editar</button>
              <button @click="deleteCliente(cliente.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        clientes: [],
        showForm: false,
        isEditing: false,
        form: {
          id: null,
          nombre: '',
          apellido: '',
          telefono: '',
          email: '',
        },
      };
    },
    mounted() {
      this.fetchClientes();
    },
    methods: {
      async fetchClientes() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/clientes');
          this.clientes = response.data;
        } catch (error) {
          console.error('Error fetching clientes:', error);
        }
      },
      createNew() {
        this.showForm = true;
        this.isEditing = false;
        this.form = {
          id: null,
          nombre: '',
          apellido: '',
          telefono: '',
          email: '',
        };
      },
      editCliente(cliente) {
        this.showForm = true;
        this.isEditing = true;
        this.form = { ...cliente };
      },
      async handleSubmit() {
        try {
          if (this.isEditing) {
            await axios.put(`http://127.0.0.1:8000/api/clientes/${this.form.id}`, this.form);
          } else {
            await axios.post('http://127.0.0.1:8000/api/clientes', this.form);
          }
          this.fetchClientes();
          this.cancelForm();
        } catch (error) {
          console.error('Error saving cliente:', error);
        }
      },
      cancelForm() {
        this.showForm = false;
        this.isEditing = false;
      },
      async deleteCliente(id) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/clientes/${id}`);
          this.fetchClientes();
        } catch (error) {
          console.error('Error deleting cliente:', error);
        }
      },
    },
  };
  </script>