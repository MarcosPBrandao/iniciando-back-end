# Recuperação de senha

**RF** ( Requisitos funcionais)

- o usuário deve poder recuperar sua senha informando o seu email
- O usuário deve receber um e-mail com instruções de recuperação de senha
- o usuário deve poder resetar sua senha

**RNF** ( Requisitos não funcionais)

- Utilizar Mailtrap para testar envios em ambientes de desenvolvimento ( https://mailtrap.io/ armadilha de email )
- Utilizar Amazon SES ( pesquisar ) para envios em produção
- o envio de e-mails deve acontecer em segundo plano (background job)

**RN** ( Regra de negócio )

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirma a nova senha ao resetar sua senha.


# atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome , email e senha .

**RNF**

**RN**

- o usuário não pode alterar seu email para um email já atualizado
- para atualizar sua senha, o usuário deve informar a senha antiga
- para atualizar sua senha, o usuário precisa confirmar a nova senha



# painel do prestador

**RF**

- o usuário deve poder listar seus agendamentos de um dia específico;
- o prestador deve receber uma notificação sempre que houver um novo agendamento;
- o prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io ( pesquisar sobre envio de mensagens );

**RN**

- A notificação dever ter um status de lida ou não-lida para que o prestador possa controlar;

# agendamento de serviços

**RF**

- o usuário deve poder listar todos os prestadores de serviços cadastrados
- deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- deve poder listar horários disponiveis em um dia específico de um prestador
- o usuário deve poder realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache; 

**RN**

- cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponiveis entre 8 às 18h ( Primeiro às 8h, último às 17 h )
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar em um horário que já passou
- O usuário não pode agendar serviços consigo mesmo;

