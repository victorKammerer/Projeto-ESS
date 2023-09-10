Feature: Seguidores
  As a usuário,
  I want to seguir e deixar de seguir outros usuários,
  So that posso acompanhar as atualizações dos meus seguidores.

Scenario: Seguir uma pessoa
  Given o usuário está na página "users/2"
  And "Seguir" está visível
  When clico em "Seguir"
  Then o texto muda de "Seguir" para "Seguindo"
  And o usuário de id "1" está na lista Seguidores do usuário de id "2"
  And a contagem de "Seguidores" do usuário de id "2" aumenta em "1"
  And o feed "Seguindo" contém as postagens do usuário de id "2"
  And o usuário de id "2" está na lista Seguindo do usuário de id "1"

Scenario: Deixar de seguir uma pessoa
  Given o usuário está na página "users/3"
  And "Seguindo" está visível
  When clico em "Seguindo"
  Then o texto muda de "Seguindo" para "Seguir"
  And a contagem de "Seguidores" do usuário de id "3" aumenta em "-1"
  And o usuário de id "1" não está na lista Seguidores do usuário de id "3"
  And o feed "Seguindo" não contém as postagens do usuário de id "3"
  And o usuário de id "3" não está na lista Seguindo do usuário de id "1"