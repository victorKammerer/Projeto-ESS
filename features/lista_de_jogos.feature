Feature: Lista de jogos já finalizados, abandonados e desejados.
    As a usuário.
    I want to adicionar os jogos que já joguei, quero jogar ou abandonei em uma lista.
    So that I possa compartilhar minhas opiniões sobre um jogo e acompanhar as opiniões de quem eu me interesso.

Scenario: Adicionar jogo que não existe no sistema
    Given o usuário "Davi" está em qualquer página do sistema
    When o usuário "Davi" seleciona a opção “Adicionar Jogo”
    And o usuário "Davi" escolhe o jogo "SilkSong"
    Then o usuário "Davi" visualiza uma mensagem de erro "Jogo não encontrado"
    And o usuário "Davi" continua na página de adicionar jogo


Scenario: Adicionar jogo como “Finalizou”, sem dar nota e sem review
    Given o usuário "Davi" está em qualquer página do sistema
    When o usuário "Davi" seleciona a opção “Adicionar Jogo”
    And o usuário "Davi" escolhe o jogo "Hollow Knight"
    And o usuário "Davi" seleciona a opção "Finalizado"
    And o usuário "Davi" não dá nota ao jogo
    And o usuário "Davi" não escreve uma review
    And o usuário "Davi" seleciona a opção "Submeter"
    Then o usuário "Davi" visualiza uma mensagem de erro 
    And o usuário "Davi" continua na página de adicionar jogo

Scenario: Pesquisar um jogo na lista de jogos de um usuário, sem sucesso
    Given o usuário "João" está na página da lista de jogos do usuário "Davi"
    And o usuário "Davi" tem uma entrada na lista de jogos com o título "Hollow Knight"
    When o usuário "João" pesquisa pelo jogo "League of Legends"
    Then o usuário "João" não visualiza o jogo "League of Legends" na lista de jogos do usuário "Davi"
    And o usuário "João" visualiza uma mensagem de erro 
    And o usuário "João" continua na página da lista de jogos do usuário "Davi"

Scenario: Editar uma entrada na lista de jogos, mas ultrapassando o limite de caracteres
    Given o usuário "João" está na página da sua lista de jogos
    And o usuário "João" tem uma entrada na lista de jogos com o título "Hollow Knight"
    And o usuário "João" escreveu uma review para o jogo "Hollow Knight"
    When o usuário "João" seleciona a opção “Editar” do jogo "amei esse"
    And o usuário "João" altera o título da review para "Hollow Knight é um jogo muuuu...ito bom" com mais de 120 caracteres
    And o usuário "João" seleciona a opção "Submeter"
    Then o usuário "João" visualiza uma mensagem de erro 
