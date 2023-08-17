Feature: Criar Posts
    As um usuário do site de “review de jogos”
    I want to Criar uma nova postagem
    So that eu possa mostrar minha opinião sobre jogos

Scenario: Criar um post apenas com a avaliação em nota
    Given o usuário “vko” está na página inicial do site "review de jogos"
    When o usuário “vko” seleciona criação de posts
    And seleciona o jogo “Hollow Knight”
    And adiciona a avaliação “5/5”
    And Seleciona “publicar”
    Then recebe a notificação de “Publicação enviada”


Scenario: Criar um post com legenda e avaliação em nota
    Given o usuário “vko” está na página inicial "review de jogos"
    When o usuário “vko” seleciona criação de posts
    And seleciona o jogo “Hollow Knight”
    And adiciona a avaliação “5/5”
    And o usuário “vko” escreve a legenda “melhor jogo já criado, muito bom!!”
    And Seleciona “publicar”
    Then recebe a notificação de “Publicação enviada”

Scenario: Cancelar postagem
    Given O usuário “vko” está na página inicial "review de jogos"
    When O usuário “vko” Seleciona criação de posts
    And Seleciona o jogo “Hollow Knight”
    And Adiciona a avaliação “5/5”
    And O usuário “vko” escreve a legenda “melhor jogo já criado, muito bom!!”
    And Seleciona “x”
    Then A textfield é desselecionada.

