Feature: Criar / Remover / Editar usuario comum 
	As: Um usuario da plataforma de compartilhamento de reviews
	I want to: Criar, remover e editar minha conta quando quiser
	So that: Possa navegar pela plataforma e interagir com outros usuários

Scenario: Criar uma nova conta com sucesso
    Given Estou na tela "Cadastro"
    When Preencho o campo de "Usuario" com "bonc"
    And Preencho o campo de "Email" com "bonc@gmail.com"
    And Preencho o campo de "Senha" com "123456A"
    And Preencho o campo de "Nome" com "Matheus"
    And Preencho o campo de "Sobrenome" com "Julio"
    And Preencho o campo de "Pronomes" com "Ele/Dele"
    And Preencho o campo de "Bio" com "Gosto de jogar"
    And Confirmo a criacao da conta
    Then Recebo uma confirmacao que minha conta foi criada
    And Vou para página "Inicio" do aplicativo, com minha conta conectado

Scenario: Criar uma conta com informações opcionais faltando
    Given Estou na tela "Cadastro"
    And Vejo varios espaços para preenchimento
    When Preencho o campo de "Usuario" com "bonc"
    And Preencho o campo de "Email" com "bonc@gmail.com"
    And Preencho o campo de "Senha" com "123456A"
    And Preencho o campo de "Nome" com "Matheus"
    And Preencho o campo de "Sobrenome" com "Julio"
    And O campo de "Pronomes" está em branco
    And Preencho o campo de "Bio" com "Gosto de jogar"
    And Confirmo a criacao da conta
    Then Recebo uma confirmacao que minha conta foi criada
    And Vou para página "Inicio" do aplicativo, com minha conta conectado

Scenario: Criar uma conta com informações obrigatórias faltando
	Given Estou na tela "Cadastro"
	When Preencho o campo de "Usuario" com "bonc"
    And Preencho o campo de "Email" com "bonc@gmail.com"
    And Preencho o campo de "Senha" com "123456A"
	And O campo de "Nome" está em branco
    And Preencho o campo de "Sobrenome" com "Julio"
    And Preencho o campo de "Pronomes" com "Ele/Dele"
    And Preencho o campo de "Bio" com "Gosto de jogar"
	And Confirmo a criacao da conta
	Then Recebo uma notificacao que ha campos obrigatorios a serem preenchidos
	And Continuo na tela de cadastro
 
Scenario: Criar uma conta com alguma informação ja cadadastrada
	Given Estou na tela "Cadastro"
	When Preencho o campo de "Usuario" com "bonc"
	And O email "bonc@gmail.com" já está cadastrado
    And Preencho o campo de "Email" com "bonc@gmail.com"
    And Preencho o campo de "Senha" com "123456A"
	And Preencho o campo de "Nome" com "Matheus"
    And Preencho o campo de "Sobrenome" com "Julio"
    And Preencho o campo de "Pronomes" com "Ele/Dele"
    And Preencho o campo de "Bio" com "Gosto de jogar"
	And Confirmo a criacao da conta
	Then Recebo uma notificacao que ha campos com informacoes já cadastradas
	And Continuo na tela de cadastro 

Scenario: Criar uma conta com senha invalida
	Given Estou na tela "Cadastro"
	When Preencho o campo de "Usuario" com "bonc"
    And Preencho o campo de "Email" com "bonc@gmail.com"
    And Preencho o campo de "Senha" com "1256A"
	And Preencho o campo de "Nome" com "Matheus"
    And Preencho o campo de "Sobrenome" com "Julio"
    And Preencho o campo de "Pronomes" com "Ele/Dele"
    And Preencho o campo de "Bio" com "Gosto de jogar"
	And Confirmo a criacao da conta
	Then Recebo uma notificacao que a senha nao e valida
	And Continuo na tela de cadastro

Scenario: Excluir minha conta com sucesso
	Given Estou na tela "Perfil"
	When Seleciono a opção de exclusão de conta
	Then Aparece uma notificacao de confirmacao
	When Confirmo a exclusao da conta
	Then Vou para a pagina de "Inicio", sem estar conectado à conta
	And Percebo uma mensagem de confirmação de exclusão

Scenario: Recusar exclusão da conta
	Given Estou na tela "Perfil"
	When Seleciono a opção de exclusão de conta
	Then Aparece uma notificacao de confirmacao
	When Recuso a exclusao da conta
	Then Retorno para meu perfil

Scenario: Editar minha conta com sucesso
	Given Estou na tela "Perfil"
	And O campo "Usuário" está preenchido com "Mathbonc"
	When Clico na opcao de edicao de conta
	Then Aparece uma notificacao para confirmar a edicao da conta
	When Confirmo a edicao
	Then Eu preencho o campo de "Usuario" com "Boncsidai"
	When Clico para salvar as alterações
	Then O campo "Usuário" agora mostra "Boncsidai" na tela "Perfil"
	And Retorno para tela de perfil

Scenario: Não confirmar edição de conta
	Given Estou na tela "Perfil"
	When Clico na opcao de edicao de conta
	Then Aparece uma notificacao para confirmar a edicao da conta
	When Não confirmo a edicao
	Then Retorno para tela de perfil

