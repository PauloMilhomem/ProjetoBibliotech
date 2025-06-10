document.addEventListener("DOMContentLoaded", function () {
    const tableRows = document.querySelectorAll("table tbody tr");
    const alterarTituloInput = document.getElementById("alterar_titulo");
    const alterarAnoInput = document.getElementById("alterar_ano");
    const alterarAutorInput = document.getElementById("alterar_autor");
    const alterarTipoInput = document.getElementById("alterar_tipo");
    const btnAlterar = document.getElementById("btnAlterar");
    const btnExcluir = document.getElementById("btnExcluir");

    let selectedRow = null;
    let selectedRowId = null;

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    tableRows.forEach(row => {
        row.addEventListener("click", function () {
            if (selectedRow) {
                selectedRow.classList.remove("selected");
            }

            this.classList.add("selected");
            selectedRow = this;
            selectedRowId = this.dataset.id;

            alterarTituloInput.value = this.dataset.titulo || "";
            alterarAnoInput.value = this.dataset.ano || "";
            alterarAutorInput.value = this.dataset.autor || "";
            alterarTipoInput.value = this.dataset.tipo || "";
        });
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest("table tbody tr") && !event.target.closest(".action-section")) {
            if (selectedRow) {
                selectedRow.classList.remove("selected");
                selectedRow = null;
                selectedRowId = null;

                alterarTituloInput.value = "";
                alterarAnoInput.value = "";
                alterarAutorInput.value = "";
                alterarTipoInput.value = "";
            }
        }
    });

    btnExcluir.addEventListener("click", function() {
    if (selectedRowId) {
        if (confirm("Tem certeza que deseja excluir este livro?")) {
            fetch(`/sistema-restrito-crud/delete/${selectedRowId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                    "Content-Type": "application/json"
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Livro excluído com sucesso!");
                    location.reload();
                } else {
                    alert("Erro ao excluir livro: " + data.error);
                }
            })
            .catch(error => {
                console.error("Erro na requisição de exclusão:", error);
                alert("Ocorreu um erro ao tentar excluir o livro.");
            });
        }
    } else {
        alert("Por favor, selecione um livro para excluir.");
    }
});

    btnAlterar.addEventListener("click", function () {
        if (selectedRowId) {
            const titulo = alterarTituloInput.value;
            const ano = alterarAnoInput.value;
            const autor = alterarAutorInput.value;
            const tipo = alterarTipoInput.value;

            const formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("ano_de_publicacao", ano);
            formData.append("autor", alterarAutorInput.value);
            formData.append("tipo", alterarTipoInput.value);

            fetch(`/sistema-restrito-crud/update/${selectedRowId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Livro alterado com sucesso!");
                        location.reload();
                    } else {
                        alert("Erro ao alterar livro: " + data.error);
                    }
                })
                .catch(error => {
                    console.error("Erro na requisição de alteração:", error);
                    alert("Ocorreu um erro ao tentar alterar o livro.");
                });
        } else {
            alert("Por favor, selecione um livro para alterar.");
        }
    });
});
