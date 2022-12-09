# Projeto desenvolvido para a atividade final da disciplina de Programação 2

## (desenvolvimento interrompido)

<br>

## Objetivos <s>além de tentar tirar um 10 na disciplina</s>

<br>

    Esse projeto foi inspirado no projeto que desenvolvi para a disciplina de Prática Profissionalizante Orientada 2,
    portanto o objetivo principal era desenvolver um software que possa auxiliar na gestão empresarial com foco em
    pequenas empresas do setor varejista (admito que só pensei nisso quando precisei escrever um "artigo científico"
    sobre o projeto original), permitindo o gerenciamento de estoque e de funcionários e registro das operações
    relacionadas às compras e vendas que a empresa realiza. Me orgulho do meu avanço na questão do design.

<hr>
<br>

## Aspectos abordados/tecnologias utilizadas:<br>

<br>

- Frontend:

      React TS, geração de PDF com pdfmake, componentes da lib Material UI, tema dark (a coisa mais importante de todo o
      projeto sem dúvida), responsividade, requisições com Axios, formulários com Unform, validação de formulários com
      YUP, autorização de acesso a certas funcionalidades de acordo com o cargo do usuário.

- Backend:

      API rest com Express e TS, CRUD com Typeorm e PostgreSql, documentação com Swagger, autenticação com JWT em rotas
      privadas através de um middleware de autenticação, tratamento de erros com middleware de erros.

- Geral:

      Docker e Docker-compose, Eslint para padronização do código.

<hr>
<br>

## Resumo

<br>

Esse negócio aqui está (bem) longe de ser um projeto profissional, mas serviu para aprender várias coisas principalmente com
relação ao frontend, e a principal delas é que agora eu tenho certeza de que prefiro backend.

<hr>
<br>

## TODO List:

<br>

### Alta prioridade (coisas que fazem eu me arrepender de não ter escolhido fazer um Todo App):

<br>

- [ ] Não permitir adicionar o mesmo produto em mais de um item em compras e vendas - frontend

- [ ] Impedir que sejam comprados produtos em quantidades maiores que as disponíveis
	no estoque - frontend

- [X] Resolver os problemas na visualização de valores monetários - frontend

<hr>

### Média prioridade (não essencial):

<br>

- [ ] Criar arquivos docker-compose para desenvolvimento e para produção

<hr>

### Baixa prioridade (<s>muita preguiça</s> Pouco tempo disponível pra implementar):

<br>

- [ ] Resolver gambiarra com InvoiceItemsContext (Bom, tá funcionando...) - frontend
