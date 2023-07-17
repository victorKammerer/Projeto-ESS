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


