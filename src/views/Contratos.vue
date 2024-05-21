<template>
    <div>
      <h2>Contratos</h2>
  
      <div v-if="showForm">
        <h3>{{ isEditing ? 'Editar Contrato' : 'Crear Contrato' }}</h3>
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
            <label for="agente_id">Agente ID:</label>
            <input type="number" id="agente_id" v-model.number="form.agente_id" required>
          </div>
          <div class="form-group">
            <label for="tipo_contrato">Tipo de Contrato:</label>
            <input type="text" id="tipo_contrato" v-model="form.tipo_contrato" required>
          </div>
          <div class="form-group">
            <label for="fecha_contrato">Fecha del Contrato:</label>
            <input type="date" id="fecha_contrato" v-model="form.fecha_contrato" required>
          </div>
          <div class="form-group">
            <label for="detalles">Detalles:</label>
            <textarea id="detalles" v-model="form.detalles"></textarea>
          </div>
          <button type="submit">{{ isEditing ? 'Guardar Cambios' : 'Crear' }}</button>
          <button type="button" @click="cancelForm">Cancelar</button>
        </form>
      </div>
  
      <button @click="createNew">Crear Nuevo Contrato</button>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Propiedad ID</th>
            <th>Cliente ID</th>
            <th>Agente ID</th>
            <th>Tipo de Contrato</th>
            <th>Fecha del Contrato</th>
            <th>Detalles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contrato in contratos" :key="contrato.id">
            <td>{{ contrato.id }}</td>
            <td>{{ contrato.propiedad_id }}</td>
            <td>{{ contrato.cliente_id }}</td>
            <td>{{ contrato.agente_id }}</td>
            <td>{{ contrato.tipo_contrato }}</td>
            <td>{{ contrato.fecha_contrato }}</td>
            <td>{{ contrato.detalles }}</td>
            <td>
              <button @click="editContrato(contrato)">Editar</button>
              <button @click="deleteContrato(contrato.id)">Eliminar</button>
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
        contratos: [],
        showForm: false,
        isEditing: false,
        form: {
          id: null,
          propiedad_id: null,
          cliente_id: null,
          agente_id: null,
          tipo_contrato: '',
          fecha_contrato: '',
          detalles: '',
        },
      };
    },
    mounted() {
      this.fetchContratos();
    },
    methods: {
      async fetchContratos() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/contratos');
          this.contratos = response.data;
        } catch (error) {
          console.error('Error fetching contratos:', error);
        }
      },
      createNew() {
        this.showForm = true;
        this.isEditing = false;
        this.form = {
          id: null,
          propiedad_id: null,
          cliente_id: null,
          agente_id: null,
          tipo_contrato: '',
          fecha_contrato: '',
          detalles: '',
        };
      },
      editContrato(contrato) {
        this.showForm = true;
        this.isEditing = true;
        this.form = { ...contrato };
      },
      async handleSubmit() {
        try {
          if (this.isEditing) {
            await axios.put(`http://127.0.0.1:8000/api/contratos/${this.form.id}`, this.form);
          } else {
            await axios.post('http://127.0.0.1:8000/api/contratos', this.form);
          }
          this.fetchContratos();
          this.cancelForm();
        } catch (error) {
          console.error('Error saving contrato:', error);
        }
      },
      cancelForm() {
        this.showForm = false;
        this.isEditing = false;
      },
      async deleteContrato(id) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/contratos/${id}`);
          this.fetchContratos();
        } catch (error) {
          console.error('Error deleting contrato:', error);
        }
      },
    },
  };
  </script>