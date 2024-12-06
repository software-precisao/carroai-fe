<template>
  <div class="modal fade" :id="`modalDriver${id}`" tabindex="-1" aria-labelledby="modalDriver" aria-hidden="true">
    <div class="modal-dialog" style="background-color: transparent;">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ item.first_name }} {{ item.last_name }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h6>{{
            checklist != null ? checklist.message :
              "⚠️ Checklist incompleto. Alguns campos ainda precisam serpreenchidos." }}</h6>
          <div class="row mt-4 px-4">
            <div v-for="(item, index) in checklistItems" :key="index"
              class="form-check col-6 d-flex align-items-center">
              <input class="form-check-input me-3" type="checkbox" :id="'checklist-item-' + index" v-model="item.value"
                disabled :class="{ 'is-false': !item.value }" />
              <!-- <a href="#" style="color: #000"> -->
              <label class="form-check-label " :for="'checklist-item-' + index">
                {{ item.label }}
              </label>
              <!-- </a> -->
            </div>
          </div>
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
import api from "../../services/api/driver/index"

interface Checklist {
  id: string
  isComplete: boolean;
  data: object;
  message: string
}

interface ChecklistItem {
  label: string;
  value: boolean
}

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
  data() {
    return {
      checklist: null as Checklist | null,
      checklistItems: [
        { label: "Termos e condições", value: false },
        { label: "Avatar", value: false },
        { label: "Detalhes do veículo", value: false },
        { label: "Lincença do motorista", value: false },
        { label: "Prova de residência", value: false },
      ] as ChecklistItem[]
    }
  },
  mounted() {
    this.handleGetChecklist()
  },
  methods: {
    handleGetChecklist() {
      api.getDriverChecklist(this.id).then((res) => {
        if (typeof res !== "string" && res.status === 200) {
          console.log("Checklist do motorista ===>", res.data)
          this.checklist = res.data

          this.checklistItems = [
            { label: "Termos e condições", value: res.data.data.acept_terms_conditions },
            { label: "Avatar", value: res.data.data.send_avatar },
            { label: "Detalhes do veículo", value: res.data.data.send_detail_vehicle },
            { label: "Lincença do motorista", value: res.data.data.send_license_driver },
            { label: "Prova de residência", value: res.data.data.send_proof_residence },
          ]
        }
      })
    },
  },
};
</script>

<style scoped>
/* Estilo padrão do checkbox */
.form-check-input {
  width: 1.5rem;
  height: 1.5rem;
}

/* Estilo para o estado falso */
.form-check-input.is-false {
  background-color: red;
  /* Fundo vermelho */
  border-color: red;
  /* Borda vermelha */
  position: relative;
}

/* Adiciona o X para estado falso */
.form-check-input.is-false::before {
  content: "✕";
  /* Símbolo de X */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1rem;
  font-weight: bold;
}
</style>