function preencherFormulario(id, primeiroNome, sobrenome, dataAdmissao, statusFuncionario) {
  document.getElementById('employee-id').value = id;
  document.getElementById('primeiro-nome').value = primeiroNome;
  document.getElementById('sobrenome').value = sobrenome;
  document.getElementById('data-admissao').value = dataAdmissao;
  document.getElementById('status-funcionario').value = statusFuncionario;
  document.getElementById('add-employee').value = 'Atualizar';  
}

function limparFormulario() {
  document.getElementById('employee-id').value = '';
  document.getElementById('primeiro-nome').value = '';
  document.getElementById('sobrenome').value = '';
  document.getElementById('data-admissao').value = '';
  document.getElementById('status-funcionario').value = '';
  document.getElementById('add-employee').value = 'Adicionar e Finalizar';
}