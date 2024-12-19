<template>
  <tr>
    <td>{{ item.first_name ? item.first_name : "--" }} {{ item.last_name ? item.last_name : "--" }}</td>
    <td>{{ item.email ? item.email : "--" }}</td>
    <td>{{ item.phone_number ? item.phone_number : "--" }}</td>
    <td>{{ item.vehicle ? item.vehicle.license_plate : "--" }}</td>
    <td v-if="item.activated == false"><span class="badge text-bg-success p-2">Ativo</span></td>
    <td v-if="item.activated == true"><span class="badge text-bg-danger p-2">Inativo</span></td>

    <td class="row m-0 p-0" style="justify-content: center;">
      <div class="col-3">
        <button v-if="item.activated == false" @click="handleEditStatusAtivate(item.id)" type="button"
          class="btn btn-success px-2 py-1 mt-2 mb-2">
          <i class="fa fa-check"></i>
        </button>
        <button v-if="item.activated == true" @click="handleEditStatusBlock(item.id)" type="button"
          class="btn btn-warning px-2 py-1 mt-2 mb-2">
          <i class="fa fa-ban" style="color: #fff"></i>
        </button>
      </div>
      <div class="col-3">
        <button type="button" @click="openModal(item.id)" class="btn btn-info px-2 py-1 mt-2 mb-2">
          <i class="fa-regular fa-eye" style="color: #fff"></i>
        </button>
      </div>
      <!-- <div class="col-2">
        <button type="button" class="btn btn-danger px-3 py-1 mt-2 mb-2">
          <i class="fa-solid fa-exclamation"></i>
        </button>
      </div> -->
    </td>

    <!-- <EditModal :item="item" @save="handleEditUsuario" /> -->
  </tr>
  <ModalDriverComp :id="item.id" :item="item" />
</template>

<script lang="ts">
import ModalDriverComp from '../modals/ModalDriverComp.vue';
import * as bootstrap from 'bootstrap';


export default {
  name: "TableDriverComp",
  props: {
    item: {
      type: Object,
      required: true
    },
    handleEditStatusAtivate: {
      type: Function,
      required: true
    },
    handleEditStatusBlock: {
      type: Function,
      required: true
    },
  },
  components: {
    ModalDriverComp,
  },
  methods: {
    openModal(id: string) {
      const modalElement = document.getElementById(`modalDriver${id}`);
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();  // Abre o modal
      } else {
        console.error(`Modal com ID modalDriver${id} não encontrado.`);
      }
    },
  }
}
</script>