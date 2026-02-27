const form = document.getElementById("denunciaForm");
const botao = form.querySelector("button");
const modal = document.getElementById("modalSucesso");

const selectNome = document.getElementById("informarNome");
const campoNome = document.getElementById("campoNome");

const tipo = document.getElementById("tipoSituacao");
const empresa = document.getElementById("empresa");
const cnpj = document.getElementById("cnpj");
const descricao = document.getElementById("descricao");
const sugestao = document.getElementById("sugestao");
const nome = document.getElementById("nome");

/* ================= EMAILJS INIT ================= */
(function () {
  emailjs.init("3wkVhiGHZrM4dHHUB");
})();

/* ================= MOSTRAR NOME ================= */
selectNome.addEventListener("change", () => {
  campoNome.classList.toggle("hidden", selectNome.value !== "sim");
});

/* ================= SUBMIT ================= */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!tipo.value) {
    alert("Selecione o tipo da situação.");
    return;
  }

  botao.classList.add("loading");
  botao.innerText = "Enviando...";
  botao.disabled = true;

  const templateParams = {
    nome: selectNome.value === "sim" && nome.value ? nome.value : "Denúncia Anônima",
    tipo: tipo.value,
    empresa: empresa.value,
    cnpj: cnpj.value || "Não informado",
    descricao: descricao.value,
    sugestao: sugestao.value || "Nenhuma sugestão enviada",
    data: new Date().toLocaleString("pt-BR"),
  };

  emailjs.send("service_zgubrue", "template_vk4tpdo", templateParams).then(
    () => {
      botao.classList.remove("loading");
      botao.innerText = "Enviar Denúncia";
      botao.disabled = false;

      modal.classList.add("active");
      form.reset();
      campoNome.classList.add("hidden");
    },
    () => {
      botao.classList.remove("loading");
      botao.innerText = "Enviar Denúncia";
      botao.disabled = false;
      alert("Erro ao enviar. Tente novamente.");
    }
  );
});

/* ================= MODAL ================= */
function fecharModal() {
  modal.classList.remove("active");
}