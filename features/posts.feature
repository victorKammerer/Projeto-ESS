Feature: Criar Posts
    # As um usuário do site de “review de jogos”
    # I want to Criar uma nova postagem
    # So that eu possa mostrar minha opinião sobre jogos

Scenario: Creating new post
    Given Existe um usuário com o username "usuario1", email "usuario1@example.com", senha "senha123" e id "1".
    And Existe uma categoria com o nome "Aventura" 
    And Existe um jogo com o nome "Hollow Knight”"
    When Uma requisição de POST é feita pra rota "/database/post" com o request body
    Then recebo a mensagem "Post Enviado com sucesso"
        

#  And Eu seleciono o jogo "Hollow Knight"
#     And Eu seleciono a categoria "Aventura"
#     And Eu adiciono a avaliação "5"
#     And Eu coloco o título "Primeiro Post no forum pessoal!! Hollow Knight"
#     And Eu escrevo "Usando essa oportunidade para dar as boas vindas à todos os novos membros que chegarem aqui, vamos fazer um espaço massa pra todo mundo compartilhar e discutir nossa opinião em jogos!! Meu jogo favorito é Hollow Knight!!"!”
# Scenario: Criar um post com legenda e avaliação em nota
#     Given o usuário “vko” está na página inicial "review de jogos"
#     When o usuário “vko” seleciona criação de posts
#     And seleciona o jogo “Hollow Knight”
#     And adiciona a avaliação “5/5”
#     And o usuário “vko” escreve a legenda “melhor jogo já criado, muito bom!!”
#     And Seleciona “publicar”
#     Then recebe a notificação de “Publicação enviada”

# Scenario: Cancelar postagem
#     Given O usuário “vko” está na página inicial "review de jogos"
#     When O usuário “vko” Seleciona criação de posts
#     And Seleciona o jogo “Hollow Knight”
#     And Adiciona a avaliação “5/5”
#     And O usuário “vko” escreve a legenda “melhor jogo já criado, muito bom!!”
#     And Seleciona “x”
#     Then A textfield é desselecionada.

