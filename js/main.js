Vue.createApp({
  data() {
    return {
      title: "Envie sua aplicação para DisCloud via API",
      apiToken: "",
      status: "",
      status2: "",
      status3: "",
      buttonActive: false,
    };
  },
  methods: {
    upload(e) {
      this.buttonActive = true;
      e.preventDefault();

      const file = document.getElementById("file").files[0];

      if (file === undefined || this.apiToken === "") {
        this.buttonActive = false;
        this.status = "Por favor preencha todos os campos";
        alert("Preencha todos os campos");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);


      const config = {
        headers: {
          "api-token": this.apiToken,
          "Content-Type": "multipart/form-data",
        },
      };

      this.status = "Fazendo o upload, aguarde...";

      let url = "https://api.discloud.app/v2/upload";

      axios
        .post(url, formData, config)
        .then((response) => {
          this.buttonActive = false;
          console.log(response.message)
          if (response.data) this.status = response.data.message
          else this.status = response;
          alert(this.status);
        })
        .catch((error) => {
          this.buttonActive = false;
          if (error.code === "ERR_NETWORK") this.status = "Enviar anexo/zip inferior a 100MB."
          else if(error.response.data.message === "Você não tem nenhum aplicativo.") this.status = "Você não tem nenhuma aplicação com ID informado."
          else if(error.response.data) this.status = error.response.data.message
          else this.status = error.response;
          alert(this.status);
        });
    },
    commit(e) {
      this.buttonActive = true;
      e.preventDefault();

      const file = document.getElementById("file").files[0];

      if (file === undefined || this.apiToken === "") {
        this.buttonActive = false;
        this.status = "Por favor preencha todos os campos";
        alert("Preencha todos os campos");
        return;
      }

      let botID = prompt("Insira o ID de sua aplicação");

      if(botID === null){
        this.buttonActive = false;
        this.status = "【COMMIT】Operação cancelada.";
        return;
      }

      if (!botID) {
        this.buttonActive = false;
        this.status = "Você precisa inserir o ID de sua aplicação";
        alert("Você precisa inserir o ID de sua aplicação");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const config = {
        headers: {
          "api-token": this.apiToken,
          "Content-Type": "multipart/form-data",
        },
      };

      this.status = "Fazendo o commit, aguarde...";

      let url = `https://api.discloud.app/v2/app/${botID}/commit`;

      axios
        .put(url, formData, config)
        .then((response) => {
          this.buttonActive = false;
          if (response.data) this.status = response.data.message
          else this.status = response;
          alert(this.status);
        })
        .catch((error) => {
          this.buttonActive = false;
          if (error.code === "ERR_NETWORK") this.status = "Enviar anexo/zip inferior a 100MB."
          else if(error.response.data.message === "Você não tem nenhum aplicativo.") this.status = "Você não tem nenhuma aplicação com ID informado."
          else if(error.response.data) this.status = error.response.data.message
          else this.status = error.response;
          alert(this.status);
        });
    },
    start(e) {
      this.buttonActive = true;
      e.preventDefault();

      if (this.apiToken === "") {
        this.buttonActive = false;
        this.status2 = "Forneça o token da API";
        alert("Forneça o token da API");
        return;
      }

      var botID = prompt("Insira o ID de sua aplicação");

      if(botID === null){
        this.buttonActive = false;
        this.status2 = "【INICIAR】Operação cancelada.";
        return;
      }

      if (!botID) {
        this.buttonActive = false;
        this.status2 = "Você precisa inserir o ID de sua aplicação";
        alert("Você precisa inserir o ID de sua aplicação");
        return;
      }

      const config = {
        headers: {
          "api-token": this.apiToken,
        },
      };

      this.status2 = "Iniciando, aguarde...";

      let url = `https://api.discloud.app/v2/app/${botID}/start`;

      axios
        .put(url, {}, config)
        .then((response) => {
          this.buttonActive = false;
          this.status2 = response.data.message;
          if (response.data.message === "Seu aplicativo foi conectado.") this.status2 = `Sua aplicação foi iniciada, não esqueça de clicar em “listar suas aplicações” para atualizar as informações das aplicações.`
          alert(this.status2);
        })
        .catch((error) => {
          this.buttonActive = false;
          if(error.response.data.message === "Você não tem nenhum aplicativo.") this.status2 = "Você não tem nenhuma aplicação com ID informado."
          else if(error.response.data) this.status2 = error.response.data.message
          else this.status2 = error.response;
          alert(this.status2);
        });
    },
    restart(e) {
      this.buttonActive = true;
      e.preventDefault();

      if (this.apiToken === "") {
        this.buttonActive = false;
        this.status2 = "Forneça o token da API";
        alert("Forneça o token da API");
        return;
      }

      let botID = prompt("Insira o ID de sua aplicação");

      if(botID === null){
        this.buttonActive = false;
        this.status2 = "【REINICIAR】Operação cancelada.";
        return;
      }

      if (!botID) {
        this.buttonActive = false;
        this.status2 = "Você precisa inserir o ID de sua aplicação";
        alert("Você precisa inserir o ID de sua aplicação");
        return;
      }

      const config = {
        headers: {
          "api-token": this.apiToken,
        },
      };

      this.status2 = "Reiniciando, aguarde...";

      let url = `https://api.discloud.app/v2/app/${botID}/restart`;

      axios
        .put(url, {}, config)
        .then((response) => {
          this.buttonActive = false;
          if (response.data) this.status2 = response.data.message
          else this.status2 = response;
          alert(this.status2);
        })
        .catch((error) => {
          this.buttonActive = false;
          if(error.response.data.message === "Você não tem nenhum aplicativo.") this.status2 = "Você não tem nenhuma aplicação com ID informado."
          else if(error.response.data) this.status2 = error.response.data.message
          else this.status2 = error.response;
          alert(this.status2);
        });
    },
    logs(e) {
      this.buttonActive = true;
      e.preventDefault();

      if (this.apiToken === "") {
        this.buttonActive = false;
        this.status2 = "Forneça o token da API";
        alert("Forneça o token da API");
        return;
      }

      let botID = prompt("Informe o ID da sua aplicação ou “all” (sem apas) para enviar os logs de todos os apps.");

      if(botID === null){
        this.buttonActive = false;
        this.status2 = "【LOGS】Operação cancelada.";
        return;
      }

      if (!botID) {
        this.buttonActive = false;
        this.status2 = "Informe o ID da sua aplicação ou “all” (sem apas) para enviar os logs de todos os apps.";
        alert("Informe o ID da sua aplicação ou “all” (sem apas) para enviar os logs de todos os apps.");
        return;
      }
  

      const config = {
        headers: {
          "api-token": this.apiToken,
        },
      };

      this.status2 = "Obtendo os logs, aguarde...";

      let url = `https://api.discloud.app/v2/app/${botID}/logs`;

      axios
      axios.get(url, config)
        .then((response) => {
          this.buttonActive = false;


          let listaa

          const result = Array.isArray(response.data.apps);

          if (result) {
            listaa = response.data.apps.map(a => a)
          } else {
            let a = []
            a.push(response.data.apps)
            listaa = a
          }


          async function fetchTodosApps() {

            let todosBtn = document.getElementById('todosApps');

            todosBtn.style.backgroundColor = "#76b5c5";
            todosBtn.style.color = "#202225"

            let cmdContainer = document.getElementById('apps');
            var content = `<input type="text" class="pesquisarDesign" id="myInput" onkeyup="searchInput()"
            placeholder="Pesquisar apps por nome ou ID 🔍" title="Digite o nome ou ID do app"><center>`
            let selectedApps = listaa;
            for (let i = 0; i < selectedApps.length; i++) {

              var usageContent =  selectedApps[i].terminal.url === null ? `<div class="appsUsage">Não foi possível gerar a URL dos logs, aqui estão os logs em texto:<br><code>${selectedApps[i].terminal.big.replaceAll("\n","<br>")}</code></div>` : `<div class="appsUsage"><code><a href="${selectedApps[i].terminal.url}" target="_blank">${selectedApps[i].terminal.url} </a></code></div>`

              content += `
              <div class="appsInfo" style="overflow-x: hidden;">
              <code class="appsName" id="${selectedApps[i].id}_cmd">${selectedApps[i].id}</code>
              </div>
              <div class="appsContent">
                ${usageContent}
              </div>
              </div>
              `
            }

            cmdContainer.innerHTML = content + `</center><br>`;


            var coll = document.getElementsByClassName("appsInfo");
            var i;

            for (i = 0; i < coll.length; i++) {
              coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                  content.style.maxHeight = null;
                  content.style.border = null
                } else {
                  content.style.maxHeight = content.scrollHeight + "px";
                  content.style.border = "2px solid #00a859";
                }
              });
            }
          }

          this.status2 = fetchTodosApps()
          this.status2 = "Aqui estão os logs de suas aplicações"
          alert(this.status2);

        })
        .catch((error) => {
          this.buttonActive = false;
          if(error.response.data.message === "Você não tem nenhum aplicativo.") this.status2 = "Você não tem nenhuma aplicação com ID informado."
          else if(error.response.data) this.status2 = error.response.data.message
          else this.status2 = error.response;
          alert(this.status2);
        });
    },

    b(e) {
      this.buttonActive = true;
      e.preventDefault();

      if (this.apiToken === "") {
        this.buttonActive = false;
        this.status2 = "Forneça o token da API";
        alert("Forneça o token da API");
        return;
      }

      let botID = prompt("Informe o ID da sua aplicação ou “all” (sem apas) para fazer backup de todos os apps.");

      if(botID === null){
        this.buttonActive = false;
        this.status2 = "【BACKUP】Operação cancelada.";
        return;
      }

      if (!botID) {
        this.buttonActive = false;
        this.status2 = "Informe o ID da sua aplicação ou “all” (sem apas) para fazer backup de todos os apps.";
        alert("Informe o ID da sua aplicação ou “all” (sem apas) para fazer backup de todos os apps.");
        return;
      }

      const config = {
        headers: {
          "api-token": this.apiToken,
        },
      };

      this.status2 = "Fazendo o backup, aguarde...";

      let url = `https://api.discloud.app/v2/app/${botID}/backup`;

      axios
      axios.get(url, config)
        .then((response) => {
          this.buttonActive = false;


          let listaa
          const result = Array.isArray(response.data.backups);

          if (result) {
            listaa = response.data.backups.map(a => a)
          } else {
            [].push(response.data.backups)
            listaa = a
          }


          async function fetchTodosApps() {

            let todosBtn = document.getElementById('todosApps');

            todosBtn.style.backgroundColor = "#76b5c5";
            todosBtn.style.color = "#202225"

            let cmdContainer = document.getElementById('apps');
            var content = `<input type="text" class="pesquisarDesign" id="myInput" onkeyup="searchInput()"
            placeholder="Pesquisar apps por nome ou ID 🔍" title="Digite o nome ou ID do app"><center>`
            let selectedApps = listaa;
            for (let i = 0; i < selectedApps.length; i++) {

              var usageContent = (selectedApps[i].id === "") ? "" : (selectedApps[i].url === "") ? "" : `<div class="appsUsage"><code><a href="${selectedApps[i].url}" target="_blank">${selectedApps[i].url}</a></code></div>`

              content += `
              <div class="appsInfo" style="overflow-x: hidden;">
              <code class="appsName" id="${selectedApps[i].id}_cmd">${selectedApps[i].id}</code>
              </div>
              <div class="appsContent">
                ${usageContent}
              </div>
              </div>
              `
            }

            cmdContainer.innerHTML = content + `</center><br>`;


            var coll = document.getElementsByClassName("appsInfo");
            var i;

            for (i = 0; i < coll.length; i++) {
              coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                  content.style.maxHeight = null;
                  content.style.border = null
                } else {
                  content.style.maxHeight = content.scrollHeight + "px";
                  content.style.border = "2px solid #00a859";
                }
              });
            }
          }

          this.status2 = fetchTodosApps()
          this.status2 = "Backup finalizado."
          alert(this.status2);

        })
        .catch((error) => {
          this.buttonActive = false;
          if(error.response.data.message === "Você não tem nenhum aplicativo.") this.status2 = "Você não tem nenhuma aplicação com ID informado."
          else if(error.response.data) this.status2 = error.response.data.message
          else this.status2 = error.response;
          alert(this.status2);
        });
    },
    userInfo(e) {
      this.buttonActive = true;
      e.preventDefault();

      if (this.apiToken === "") {
        this.buttonActive = false;
        this.status2 = "Forneça o token da API";
        alert("Forneça o token da API");
        return;
      }

      const config = {
        headers: {
          "api-token": this.apiToken,
        },
      };

      this.status2 = "Verificando os dados, aguarde...";

      let url = `https://api.discloud.app/v2/user`;

      axios
      axios.get(url, config)
        .then((response) => {
          this.buttonActive = false;

          let user = response.data.user

          async function fetchUser() {
            function getUnites(x) {
              const units = ['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
              let l = 0, n = parseInt(x, 10) || 0;
              while (n >= 1024 && ++l) {
                n = n / 1024;
              }
              return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
            }
            var date = new Date(`${user.planDataEnd}`);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            options.timeZone = 'UTC';
            options.timeZoneName = 'short';

            var content = ``
            var infoContainer = document.getElementById('apps');
            var info1
            var info2
            var info3
            var info4
            if (user.plan.toLowerCase() === "krypton") {
              info1 = "https://i.imgur.com/bWVjGE2.png"
              info2 = "#89ff82"
              info3 = "#12a505"
              info4 = "krypton"
            } else if (user.plan.toLowerCase() === "safira") {
              info1 = "https://i.imgur.com/GFjglX6.png"
              info2 = "#fc9ad4"
              info3 = "#c71180"
              info4 = "sapphire"
            } else if (user.plan.toLowerCase() === "ruby") {
              info1 = "https://i.imgur.com/fI5oxRf.png"
              info2 = "#F48FB1"
              info3 = "#d81b60"
              info4 = "ruby"
            } else if (user.plan.toLowerCase() === "diamond") {
              info1 = "https://i.imgur.com/UBItR2U.png"
              info2 = "#2ab7ff"
              info3 = "#1867ab"
              info4 = "diamond"
            } else if (user.plan.toLowerCase() === "platinum") {
              info1 = "https://i.imgur.com/am4466Q.png"
              info2 = "#79ffe3"
              info3 = "#15aa84 "
              info4 = "platinum"
            } else if (user.plan.toLowerCase() === "gold") {
              info1 = "https://i.imgur.com/SRywHIy.png"
              info2 = "#ffee70"
              info3 = "#dfa51c"
              info4 = "gold"
            } else if (user.plan.toLowerCase() === "carbon") {
              info1 = "https://i.imgur.com/uTBmbnB.png"
              info2 = "#616161"
              info3 = "#192024"
              info4 = "carbon"
            } else if (user.plan.toLowerCase() === "free") {
              info1 = "https://i.imgur.com/MzTNe38.png"
              info2 = "#d4d4d4"
              info3 = "#646464"
              info4 = "free"
            } else {
              info1 = "https://i.imgur.com/MzTNe38.png"
              info2 = "#d4d4d4"
              info3 = "#646464"
              info4 = "free"
            }

            if (user.plan) content = `<a href="https://discloudbot.com/plans">
<div class="badge ${info4}" style="overflow-x: initial;margin: 11px 1px 1px 1px;"  href="https://github.com/ravenastar-js"  target="_blank">
<div class="circle"><img  src="${info1}" class="img"></div>
<div class="ribbon">${info4}</div>
</div>
</a>

<section class="contributors">
      <div class="contributor-inner">
         <div class="contributor-card">
            <div class="credit-card" style="background:${info2};border: 4.5px solid ${info3};display: flow-root;">
               <div class="credit-card__user" >
                  <h1 style="color: ${info3};">
                  ${user.userID}<br>
                  </h1>
                  <h2 style="color: ${info3};font-size: 16px;">
                     RAM TOTAL &#10140; ${getUnites(user.totalRamMb)}<br>
                     RAM USADA &#10140; ${getUnites(user.ramUsedMb)}<br>
                     FIM DO PLANO &#10140; ${user.lastDataLeft.days}d ${user.lastDataLeft.hours}h ${user.lastDataLeft.minutes}m ${user.lastDataLeft.seconds}s<br>
                     ${date.toLocaleDateString('pt-BR', options)}
                  </h2>
               </div>
            </div>
          </div>
      </div>
</section>
`
            infoContainer.innerHTML = content
            var coll = document.getElementsByClassName("appsInfo");
            var i;

            for (i = 0; i < coll.length; i++) {
              coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                  content.style.maxHeight = null;
                  content.style.border = null
                } else {
                  content.style.maxHeight = content.scrollHeight + "px";
                  content.style.border = "2px solid #00a859";
                }
              });
            }

          }

          this.status2 = fetchUser()
          this.status2 = "Aqui estão as informações"
          alert(this.status2);

        })
        .catch((error) => {
          this.buttonActive = false;
          if(error.response.data.message === "Você não tem nenhum aplicativo.") this.status2 = "Você não tem nenhuma aplicação com ID informado."
          else if(error.response.data) this.status2 = error.response.data.message
          else this.status2 = error.response;
          alert(this.status2);
        });
    },

    all(e) {
      this.buttonActive = true;
      e.preventDefault();

      if (this.apiToken === "") {
        this.buttonActive = false;
        this.status2 = "Forneça o token da API";
        alert("Forneça o token da API");
        return;
      }

      const config = {
        headers: {
          "api-token": this.apiToken,
        },
      };

      this.status2 = "Obtendo informações das aplicações, aguarde...";

      let url = `https://api.discloud.app/v2/app/all`;

      axios.get(url, config)
        .then((response) => {
          this.buttonActive = false;


          var a = response.data.apps.map(i => i)
          async function fetchTodosApps() {

            let todosBtn = document.getElementById('todosApps');

            todosBtn.style.backgroundColor = "#76b5c5";
            todosBtn.style.color = "#202225"

            let cmdContainer = document.getElementById('apps');
            var content = `<input type="text" class="pesquisarDesign" id="myInput" onkeyup="searchInput()"
          placeholder="Pesquisar apps por nome ou ID 🔍" title="Digite o nome ou ID do app"><center>`
            let selectedApps = a;
            for (let i = 0; i < selectedApps.length; i++) {
              var perms = (selectedApps[i].lang === "") ? "" : `<a class="verde">${selectedApps[i].lang}</a>`;
              var perms2 = (selectedApps[i].online === "") ? "" : selectedApps[i].online === true ? ` <a class="verde">ON</a>` : selectedApps[i].online === false ? ` <a class="vermelho">OFF</a>` : ` <a class="verde">${selectedApps[i].online}</a>`;
              var usageContent = (selectedApps[i].ramKilled === "") ? "" : (selectedApps[i].ram === "") ? "" : (selectedApps[i].mainFile === "") ? "" : `<div class="appsUsage"><code>【RAM】${selectedApps[i].ram}<br>【MAIN】${selectedApps[i].mainFile}<br>【Caiu por falta de memoria RAM?】${selectedApps[i].ramKilled ? "sim" : "não"}</code></div>`

              content += `<div class="appsInfo" style="overflow-x: hidden;">
        <code class="appsName" id="${selectedApps[i].name + " - " + selectedApps[i].id}_cmd" onclick="copyText(${selectedApps[i].id})">${selectedApps[i].name + " - " + selectedApps[i].id}</code>
        <a>${perms}${perms2}</a>     
     
        </div>
   
        <div class="appsContent">
          ${usageContent}
        </div>
        `
            }

            cmdContainer.innerHTML = content + `</center><br>`;

            var coll = document.getElementsByClassName("appsInfo");
            var i;

            for (i = 0; i < coll.length; i++) {
              coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                  content.style.maxHeight = null;
                  content.style.border = null
                } else {
                  content.style.maxHeight = content.scrollHeight + "px";
                  content.style.border = "2px solid #00a859";
                }
              });
            }

          }

          this.status2 = fetchTodosApps()
          this.status2 = "Dados das aplicações entregue"
          alert(this.status2);

        })
        .catch(() => {
          this.buttonActive = false;
          if(error.response.data.message === "Você não tem nenhum aplicativo.") this.status2 = "Você não tem nenhuma aplicação com ID informado."
          else if(error.response.data) this.status2 = error.response.data.message
          else this.status2 = error.response;
          alert(this.status2);
        });
    },
    stop(e) {
      this.buttonActive = true;
      e.preventDefault();

      if (this.apiToken === "") {
        this.buttonActive = false;
        this.status2 = "Forneça o token da API";
        alert("Forneça o token da API");
        return;
      }

      let botID = prompt("Insira o ID de sua aplicação");

      if(botID === null){
        this.buttonActive = false;
        this.status2 = "【PARAR】Operação cancelada.";
        return;
      }

      if (!botID) {
        this.buttonActive = false;
        this.status2 = "Você precisa inserir o ID de sua aplicação";
        alert("Você precisa inserir o ID de sua aplicação");
        return;
      }

      const config = {
        headers: {
          "api-token": this.apiToken,
        },
      };

      this.status2 = "Parando sua aplicação, aguarde...";

      let url = `https://api.discloud.app/v2/app/${botID}/stop`;

      axios
        .put(url, {}, config)
        .then((response) => {
          this.buttonActive = false;
          this.status2 = response.data
          if (response.data.status === "ok" && response.data.message === "Seu aplicativo foi desligado.") this.status2 = "Sua aplicação foi desligada, não esqueça de clicar em “listar suas aplicações” para atualizar as informações das aplicações."
          if (response.data.status === "error" && response.data.message === "Seu aplicativo foi desligado.") this.status2 = "Sua aplicação já está desligada."
          alert(this.status2);
        })
        .catch((error) => {
          this.buttonActive = false;
          if(error.response.data.message === "Você não tem nenhum aplicativo.") this.status2 = "Você não tem nenhuma aplicação com ID informado."
          else if(error.response.data) this.status2 = error.response.data.message
          else this.status2 = error.response;
          alert(this.status2);
        });
    },
    remove(e) {
      this.buttonActive = true;
      e.preventDefault();

      if (this.apiToken === "") {
        this.buttonActive = false;
        this.status3 = "Forneça o token da API";
        alert("Forneça o token da API");
        return;
      }

      let botID = prompt("Insira o ID de sua aplicação");

      if(botID === null){
        this.buttonActive = false;
        this.status2 = "【REMOVER APP】Operação cancelada.";
        return;
      }

      if (!botID) {
        this.buttonActive = false;
        this.status3 = "Você precisa inserir o ID de sua aplicação";
        alert("Você precisa inserir o ID de sua aplicação");
        return;
      }

      const config = {
        headers: {
          "api-token": this.apiToken,
        },
      };

      this.status3 = "Removendo sua aplicação, aguarde...";

      let url = `https://api.discloud.app/v2/app/${botID}/delete`;

      axios
        .delete(url, config)
        .then((response) => {
          this.buttonActive = false;
          if (response.data) this.status3 = response.data.message
          else this.status3 = response;
          alert(this.status3);
        })
        .catch((error) => {
          this.buttonActive = false;
          if(error.response.data.message === "Você não tem nenhum aplicativo.") this.status3 = "Você não tem nenhuma aplicação com ID informado."
          else if(error.response.data) this.status3 = error.response.data.message
          else this.status3 = error.response;
          alert(this.status3);
        });
    },
  },
}).mount("#app");
function copyText(containerid) {
  navigator.clipboard.writeText(containerid);
  console.log(navigator.clipboard.writeText(containerid))
}
