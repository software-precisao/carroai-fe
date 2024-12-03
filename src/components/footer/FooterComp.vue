<template>
    <footer class="pc-footer">
        <div class="footer-wrapper container-fluid">
            <div class="row text-muted">
                <div class="col-6 text-start">
                    <p class="mb-0">
                        <a class="text-muted" href="#" target="_blank"><strong>Carro Ai</strong></a>
                        -
                        <a class="text-muted" href="#" target="_blank"><strong>Carro Ai Plataforma</strong></a>
                        &copy;
                    </p>
                </div>
                <div class="col-6 text-end">
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <a class="text-muted" href="#" target="_blank">Suporte</a>
                        </li>
                        <li class="list-inline-item">
                            <a class="text-muted" href="#" target="_blank">Help Center</a>
                        </li>
                        <li class="list-inline-item">
                            <a class="text-muted" href="#" data-bs-toggle="modal"
                                data-bs-target="#privacidadeModal">Privacidade</a>
                        </li>
                        <li class="list-inline-item">
                            <a class="text-muted" href="#" data-bs-toggle="modal"
                                data-bs-target="#termosModal">Termos</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">

export default {
    name: "FooterComponent",
}
</script>