feature: Historico de reviews

    Scenario: Remoção de um review no histórico
        Given estou logado em minha conta “Maria Eduarda” de usuário comum
        And estou na página “Histórico de Reviews” da minha conta
        When clico no botão “Excluir” associado a um review selecionado
        Then uma janela é exibida na tela 
        And uma mensagem de confirmação é exibida
        When clico no botão “confirmar”
        Then uma nova mensagem de confirmação é exibida