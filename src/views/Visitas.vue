<template>
    <div>
      <h2>Visitas</h2>
  
      <div v-if="showForm">
        <h3>{{ isEditing ? 'Editar Visita' : 'Crear Visita' }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="propiedad_id">Propiedad ID:</label>
            <input type="number" id="propiedad_id" v-model.number="form.propiedad_id" required>
          </div>
          <div class="form-group">
            <label for="cliente_id">Cliente ID:</label>
            <input type="number" id="cliente_id" v-model.number="form.cliente_id" required>
          </div>
          <div class="form-group">
            <label for="fecha">Fecha:</label>
            <input type="date" id="fecha" v-model="form.fecha" required>
          </div>
          <div class="form-group">
            <label for="hora">Hora:</label>
            <input type="time" id="hora" v-model="form.hora" required>
          </div>
          <div class="form-group">
            <label for="comentarios">Comentarios:</label>
            <textarea id="comentarios" v-model="form.comentarios"></textarea>
          </div>
          <button type="submit">{{ isEditing ? 'Guardar Cambios' : 'Crear' }}</button>
          <button type="button" @click="cancelForm">Cancelar</button>
        </form>
      </div>
  
      <button @click="createNew">Crear Nueva Visita</button>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Propiedad ID</th>
            <th>Cliente ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="visita in visitas" :key="visita.id">
            <td>{{ visita.id }}</td>
            <td>{{ visita.propiedad_id }}</td>
            <td>{{ visita.cliente_id }}</td>
            <td>{{ visita.fecha }}</td>
            <td>{{ visita.hora }}</td>
            <td>{{ visita.comentarios }}</td>
            <td>
              <button @click="editVisita(visita)">Editar</button>
              <button @click="deleteVisita(visita.id)">Eliminar</button>
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
        visitas: [],
        showForm: false,
        isEditing: false,
        form: {
          id: null,
          propiedad_id: null,
          cliente_id: null,
          fecha: '',
          hora: '',
          comentarios: '',
        },
      };
    },
    mounted() {
      this.fetchVisitas();
    },
    methods: {
      async fetchVisitas() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/visitas');
          this.visitas = response.data;
        } catch (error) {
          console.error('Error fetching visitas:', error);
        }
      },
      createNew() {
        this.showForm = true;
        this.isEditing = false;
        this.form = {
          id: null,
          propiedad_id: null,
          cliente_id: null,
          fecha: '',
          hora: '',
          comentarios: '',
        };
      },
      editVisita(visita) {
        this.showForm = true;
        this.isEditing = true;
        this.form = { ...visita };
      },
      async handleSubmit() {
        try {
          if (this.isEditing) {
            await axios.put(`http://127.0.0.1:8000/api/visitas/${this.form.id}`, this.form);
          } else {
            await axios.post('http://127.0.0.1:8000/api/visitas', this.form);
          }
          this.fetchVisitas();
          this.cancelForm();
        } catch (error) {
          console.error('Error saving visita:', error);
        }
      },
      cancelForm() {
        this.showForm = false;
        this.isEditing = false;
      },
      async deleteVisita(id) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/visitas/${id}`);
          this.fetchVisitas();
        } catch (error) {
          console.error('Error deleting visita:', error);
        }
      },
    },
  };
  </script>