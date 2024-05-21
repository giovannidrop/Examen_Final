<template>
    <div>
      <h2>Agentes</h2>
  
      <div v-if="showForm">
        <h3>{{ isEditing ? 'Editar Agente' : 'Crear Agente' }}</h3>
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
  
      <button @click="createNew">Crear Nuevo Agente</button>
  
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
          <tr v-for="agente in agentes" :key="agente.id">
            <td>{{ agente.id }}</td>
            <td>{{ agente.nombre }}</td>
            <td>{{ agente.apellido }}</td>
            <td>{{ agente.telefono }}</td>
            <td>{{ agente.email }}</td>
            <td>
              <button @click="editAgente(agente)">Editar</button>
              <button @click="deleteAgente(agente.id)">Eliminar</button>
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
        agentes: [],
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
      this.fetchAgentes();
    },
    methods: {
      async fetchAgentes() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/agentes');
          this.agentes = response.data;
        } catch (error) {
          console.error('Error fetching agentes:', error);
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
      editAgente(agente) {
        this.showForm = true;
        this.isEditing = true;
        this.form = { ...agente };
      },
      async handleSubmit() {
        try {
          if (this.isEditing) {
            await axios.put(`http://127.0.0.1:8000/api/agentes/${this.form.id}`, this.form);
          } else {
            await axios.post('http://127.0.0.1:8000/api/agentes', this.form);
          }
          this.fetchAgentes();
          this.cancelForm();
        } catch (error) {
          console.error('Error saving agente:', error);
        }
      },
      cancelForm() {
        this.showForm = false;
        this.isEditing = false;
      },
      async deleteAgente(id) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/agentes/${id}`);
          this.fetchAgentes();
        } catch (error) {
          console.error('Error deleting agente:', error);
        }
      },
    },
  };
  </script>