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
            <div v-for="(checks, index) in checklistItems" :key="index"
              class="form-check col-6 d-flex align-items-center">
              <input class="form-check-input me-3" type="checkbox" :id="'checklist-item-' + index"
                v-model="checks.value" disabled :class="{ 'is-false': !checks.value }" />
              <!-- <a href="#" style="color: #000"> -->
              <label class="form-check-label " :for="'checklist-item-' + index"
                v-if="!checks.value || checks.label == 'Termos e condições'">
                {{ checks.label }}
              </label>

              <button type="button" class="form-check-label"
                style="background-color: transparent; border: none; cursor: pointer;" :for="'checklist-item-' + index"
                v-if="checks.value && checks.label != 'Termos e condições'" @click="handleBaixar(checks)">
                {{ checks.label }}
              </button>
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
        { label: "CNH do motorista", value: false },
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
            { label: "CNH do motorista", value: res.data.data.send_crlv_vehicle },
            { label: "Prova de residência", value: res.data.data.send_proof_residence },
          ]
        }
      })
    },

    async handleBaixar(checks) {
      try {
        let item = this.item;
        console.log(checks, item);

        let urlFecth
        let fileName = ""

        if (checks.label == "Avatar") {
          // urlFecth = `http://localhost:3000/public/images/avatars/${item.avatar}`
          urlFecth = `https://api.carroai.app/public/images/avatars/${item.avatar}`
          fileName = 'avatar'
        } else if (checks.label == "Detalhes do veículo") {
          // urlFecth = `http://localhost:3000/public/images/vehicles/${item.vehicle.photo_plate}`
          urlFecth = `https://api.carroai.app/public/images/vehicles/${item.vehicle.photo_plate}`
          fileName = 'photo_plate'
        } else if (checks.label == "Lincença do motorista") {
          // urlFecth = `http://localhost:3000/public/images/drivers/${item.userDriver.license_photo}`
          urlFecth = `https://api.carroai.app/public/images/drivers/${item.userDriver.license_photo}`
          fileName = 'license_photo'
        } else if (checks.label == "CNH do motorista") {
          // urlFecth = `http://localhost:3000/public/images/vehicles/crlv/${item.vehicle.crlv}`
          urlFecth = `https://api.carroai.app/public/images/vehicles/crlv/${item.vehicle.crlv}`
          fileName = 'crlv'
        } else if (checks.label == "Prova de residência") {
          // urlFecth = `http://localhost:3000/public/images/residences/${item.userDriver.proof_residence}`
          urlFecth = `https://api.carroai.app/public/images/residences/${item.userDriver.proof_residence}`
          fileName = 'proof_residence'
        }

        // Fetch da imagem como blob
        const response = await fetch(urlFecth);
        if (!response.ok) {
          throw new Error("Falha ao buscar a imagem.");
        }
        const blob = await response.blob();

        // Extrair o nome do arquivo do URL
        // const urlParts = item.avatar.split("/");
        // const fileName = urlParts[urlParts.length - 1]; // Última parte do caminho

        // Criar um link para forçar o download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName; // Usar o nome extraído do URL

        // Simular um clique no link
        document.body.appendChild(link);
        link.click();

        // Limpar recursos
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Erro ao baixar a imagem:", error);
        alert("Erro ao baixar a imagem. Verifique o console para mais detalhes.");
      }
    }
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