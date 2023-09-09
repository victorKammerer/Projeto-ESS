Feature: Seguidores
  As a usuário,
  I want to seguir e deixar de seguir outros usuários,
  So that posso acompanhar as atualizações dos meus seguidores.

Scenario: Seguir uma pessoa
  Given o usuário está na página "users/2"
  When clico em "Seguir"
  Then o texto muda de "Seguir" para "Seguindo"
  And a contagem de "Seguindo" dessa pessoa aumenta em "1"
  And o meu feed "Seguindo" contém as postagens da conta de id "2"