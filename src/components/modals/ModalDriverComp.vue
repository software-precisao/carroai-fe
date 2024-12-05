<template>
  <div class="modal fade" :id="`modalDriver${id}`" tabindex="-1" aria-labelledby="modalDriver" aria-hidden="true">
    <div class="modal-dialog" style="background-color: transparent;">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ item.first_name }} {{ item.last_name }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Aqui vai o conteúdo do modal.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <!-- <button type="button" class="btn btn-primary">Salvar mudanças</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ModalDriverComp",
  props: {
    id: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
  },
  methods: {
  },
};
</script>

<style scoped>
/* Estilos específicos para o modal, se necessário */
</style>