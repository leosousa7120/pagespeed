$("#enviar").click(function () {
  event.preventDefault();
  let dominio = $("#dominio").val();
  let conta = $("#conta").val();

  const url = `https://pagespeed.awsli.com.br/v1/lojas/cadastrar`;

  function removeHttp(dominio) {
    return dominio.replace(/https?:?\/\//, "");
  }

  jsonLoja = {
    dominio: removeHttp(dominio).trim(),
    conta_id: conta,
  };

  function fazPost(url, jsonLoja) {
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(jsonLoja));

    request.onload = function () {
      console.log(this.responseText);
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("response-cadastro").innerHTML =
          "Loja Cadastrada com sucesso.";
        $("#response").removeClass("fail");
        $("#response").addClass("sucess");
        $("#response").slideDown(function () {
          setTimeout(function () {
            $("#response").slideUp();
          }, 5000);
        });
      } else if (this.readyState == 4 && this.status == 400) {
        document.getElementById("response-cadastro").innerHTML =
          "Loja já cadastrada.";
        $("#response").removeClass("sucess");
        $("#response").addClass("fail");
        $("#response").slideDown(function () {
          setTimeout(function () {
            $("#response").slideUp();
          }, 5000);
        });
      }
      return request.responseText;
    };
  }
  fazPost(url, jsonLoja);
});
