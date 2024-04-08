console.log(`
 --       --        --
|  Discord: haarley7. | 👁️‍🗨️👩‍💻🎭🤴  
 --       --        --
██╗  ██╗ █████╗  █████╗ ██████╗ ██╗     ███████╗██╗   ██╗
██║  ██║██╔══██╗██╔══██╗██╔══██╗██║     ██╔════╝╚██╗ ██╔╝
███████║███████║███████║██████╔╝██║     █████╗   ╚████╔╝ 
██╔══██║██╔══██║██╔══██║██╔══██╗██║     ██╔══╝    ╚██╔╝  
██║  ██║██║  ██║██║  ██║██║  ██║███████╗███████╗   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   
`);

// ID's dos cargos que serão notificados quando a denuncia for enviada para discord
const cargoIDs = ["1226656301568888842"];
const cargosMencionados = cargoIDs.map(id => `<@&${id}>`).join(" ");

// link do webhookURL para ser enviado a mensagem pro discord
const webhookURL = "https://discord.com/api/webhooks/1226661086254731304/YjOV3In7hVr5cEO_AyFofMs2TGAWuMBOiimmp_A1IAVeNndgKcjdlP1g9GhALRyeP5I4";

function verificarTamanhoArquivo(fileInput) {
    const file = fileInput.files[0];
    if (file && file.size > 10 * 1024 * 1024) { // 10MB em bytes
        Swal.fire({
            title: "Erro",
            text: "O tamanho máximo do arquivo é de 10MB.",
            icon: "error"
        });
        fileInput.value = "";
    } else {
        var fileType = file.type.split('/')[0];

        if (fileType == "image") {
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    Swal.fire({
                        title: "Você realmente deseja enviar esse arquivo?",
                        closeButton: true,
                        imageUrl: e.target.result,
                        imageAlt: "O arquivo de mídia está carregando, aguarde!",
                        showCancelButton: true,
                        confirmButtonText: 'Sim',
                        cancelButtonText: 'Cancelar',
                        customClass: {
                            confirmButton: 'btn-success' // Adiciona a classe CSS para alterar a cor do botão
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 5000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.onmouseenter = Swal.stopTimer;
                                    toast.onmouseleave = Swal.resumeTimer;
                                }
                            });
                            Toast.fire({
                                icon: "success",
                                title: "Arquivo enviado com sucesso!"
                            });
                        }
                    });
                };
                reader.readAsDataURL(file);
            }
        }
    }
}


document.getElementById("media").addEventListener("change", function () {
    verificarTamanhoArquivo(this);
});

const dataAtual = new Date().toISOString().split("T")[0];

document.getElementById("data").setAttribute("max", dataAtual);

document.getElementById("denunciaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtém os dados do formulário
    const formData = new FormData(this);

    // Valida se o usuário escolheu enviar um vídeo ou fornecer um link
    const fileInput = document.getElementById('media');
    const file = fileInput.files[0];
    const url = formData.get("url");

    if (!file && !url) {
        Swal.fire({
            title: "Erro",
            text: "Por favor, escolha enviar um vídeo ou fornecer um link.",
            color: "#FF0000",
            icon: "error"
        });
        return;
    }

    Swal.fire({
        title: "Enviando denúncia...",
        timerProgressBar: true,
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });

    const dataSelecionada = new Date(formData.get("data"));
    const dia = ('0' + dataSelecionada.getDate()).slice(-2);
    const mes = ('0' + (dataSelecionada.getMonth() + 1)).slice(-2);
    const ano = dataSelecionada.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Como a mensagem vai ser enviada para o discord
    const mensagemTexto = `_**Nova denuncia recebida!**_ ${cargosMencionados}\n**Nome:** ${formData.get("nome")}\n**ID:** ${formData.get("identificador")}\n**Data do ocorrido:** ${dataFormatada}\n**Link da denúncia:** ${formData.get("url")}\n**Descrição:** ${formData.get("descricao")}\n**Mídia:**`;

    enviarMensagemTexto(webhookURL, mensagemTexto)
        .then(() => {
            // Se for uma denúncia com mídia, enviar a mídia em seguida
            if (file) {
                const formDataToSend = new FormData();
                formDataToSend.append("file", file);
                return enviarMensagemComMidia(webhookURL, formDataToSend);
            }
            return Promise.resolve();
        })
        .then(() => {
            Swal.fire({
                title: "Denúncia feita com sucesso",
                text: "Sua denúncia foi enviada para nosso suporte e será analisada!",
                icon: "success"
            });
            document.getElementById("denunciaForm").reset();
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                title: "Erro",
                text: "Erro ao enviar a denúncia. Por favor, entre em contato com \-json_allen-\.",
                icon: "error"
            });
        });
});

function enviarMensagemTexto(webhookURL, mensagem) {
    return fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: mensagem,
            embeds: []
        })
    });
}

function enviarMensagemComMidia(webhookURL, formData) {
    return fetch(webhookURL, {
        method: "POST",
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error("Erro ao enviar mídia para o Discord");
        }
        return response.json();
    });
}
