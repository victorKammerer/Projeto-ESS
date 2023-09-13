Feature: Criar / Remover / Editar usuario comum 
	As: Um usuario da plataforma de compartilhamento de reviews
	I want to: Criar, remover e editar minha conta quando quiser
	So that: Possa navegar pela plataforma e interagir com outros usuários

Scenario: Ir para página de edição do usuário
    Given o usuário está na página "users/1"
    And "Editar" está visível
	When clico em "Editar"
	Then Aparece uma notificação com a menssagem ""
	When Confirmo a notificação
    Then o usuário está na página "users/1/edit"

Scenario: Excluir minha conta com sucesso
	Given o usuário está na página "users/1/edit"
	And "Excluir" está visível
	When clico em "Excluir"
	Then Aparece uma notificação com a menssagem ""
	When Confirmo a notificação
	Then o usuário está na página "/"
	And Aparece uma notificacao com a menssagem ""

Scenario: Editar minha conta com sucesso
	Given o usuário está na página "users/1/edit"
    And o campo "Nome" contém a string "Fulano"
	When O campo "Nome" é editado com para a string "Treloso"
	And clico em "Salvar"
    And A página é recarregada
	And O campo "Nome" agora mostra "Treloso"

    Scenario: Criar uma conta com informações opcionais faltando
	Given o usuário está na página "/signup"
	When Preencho o campo de "username" com "Willie"
	And Preencho o campo de "email" com "Willow@etest.com"
	And Preencho o campo de "password" com "123456a"
	And Preencho o campo de "name" com "Willah"
	And Preencho o campo de "lastname" com "Cat"
	And Preencho o campo de "pronouns" com ""
	And Preencho o campo de "bio" com "Willie Willow Willah tutuutututuututu..."
	And clico em "Cadastrar"
	Then o usuário está na página do seu perfil