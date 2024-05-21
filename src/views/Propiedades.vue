<template>
    <div>
      <h2>Propiedades</h2>
  
      <div v-if="showForm">
        <h3>{{ isEditing ? 'Editar Propiedad' : 'Crear Propiedad' }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" v-model="form.direccion" required>
          </div>
          <div class="form-group">
            <label for="tipo">Tipo:</label>
            <input type="text" id="tipo" v-model="form.tipo" required>
          </div>
          <div class="form-group">
            <label for="precio">Precio:</label>
            <input type="number" id="precio" v-model="form.precio" required>
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <input type="text" id="estado" v-model="form.estado" required>
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" v-model="form.descripcion" required></textarea>
          </div>
          <button type="submit">{{ isEditing ? 'Guardar Cambios' : 'Crear' }}</button>
          <button type="button" @click="cancelForm">Cancelar</button>
        </form>
      </div>
  
      <button @click="createNew">Crear Nueva Propiedad</button>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dirección</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="propiedad in propiedades" :key="propiedad.id">
            <td>{{ propiedad.id }}</td>
            <td>{{ propiedad.direccion }}</td>
            <td>{{ propiedad.tipo }}</td>
            <td>{{ propiedad.precio }}</td>
            <td>{{ propiedad.estado }}</td>
            <td>
              <button @click="editPropiedad(propiedad)">Editar</button>
              <button @click="deletePropiedad(propiedad.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Asegúrate de tener Axios instalado
  import Swal from 'sweetalert2';

  export default {
    data() {
      return {
        propiedades: [],
        showForm: false,
        isEditing: false,
        form: {
          id: null,
          direccion: '',
          tipo: '',
          precio: 0,
          estado: '',
          descripcion: '',
        },
      };
    },
    mounted() {
      this.fetchPropiedades();
    },
    methods: {
      async fetchPropiedades() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/propiedades');
          this.propiedades = response.data;
        } catch (error) {
          console.error('Error fetching propiedades:', error);
        }
      },
      createNew() {
        this.showForm = true;
        this.isEditing = false;
        this.form = {
          id: null,
          direccion: '',
          tipo: '',
          precio: 0,
          estado: '',
          descripcion: '',
        };
      },
      editPropiedad(propiedad) {
        this.showForm = true;
        this.isEditing = true;
        this.form = { ...propiedad };
      },
      async handleSubmit() {
        try {
          if (this.isEditing) {
            await axios.put(`http://127.0.0.1:8000/api/propiedades/${this.form.id}`, this.form);
          } else {
            await axios.post('http://127.0.0.1:8000/api/propiedades', this.form);
          }
          this.fetchPropiedades();
          this.cancelForm();
        } catch (error) {
          console.error('Error saving propiedad:', error);
        }
      },
      cancelForm() {
        this.showForm = false;
        this.isEditing = false;
      },
      async deletePropiedad(id) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/propiedades/${id}`);
          this.fetchPropiedades();
        } catch (error) {
          console.error('Error deleting propiedad:', error);
        }
      },
    },
  };
  </script>

  <style scoped>

.propiedades-table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

.propiedades-table th, .propiedades-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.propiedades-table th {
  background-color: #f2f2f2; /* Color de fondo para la cabecera */
}
</style>