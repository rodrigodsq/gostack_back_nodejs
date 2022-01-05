<!-- markdownlint-disable-file -->
# ------------------------ INSTALAÇÃO------------------------------

* -------------------------------AULA1----------------------
* yarn init -y  :   `iniciar o package.json`;
* yarn add express  :   `instalar express`;
* yarn add typescript -D    :   `instalar typescript como ferramenta de desenvolvimento`;
* yarn tsc --init   :   `iniciando o arquivo de conf do typescript`;
* yarn tsc  :   `converte o codigo Ts para js na pasta  dist`;
* yarn add ts-node-dev -D   :   `instalando o convertedor de codigo ts para js e executa como se fosse o nodemon`;
* yarn dev:server   :  ` executar a aplicação`;

# --------------------AULA2 EDITORCONFIG-----------------
* so copiar o que esta nesse arquivo .editorconfig.

# ---------------------------AULA3 ESLINT------------------------
* yarn add eslint -D  :   `instalar eslint`;
* yarn eslint --init  :   `configurar eslint`;

* Passo:  `to check sintax, find problems, and enforce code style`,
          `Javascript modules (import/export)`,
          `none of these`,
          `Y`,
          `Node`,
          `Use a popular style guide`,
          `Airbnb`,
          `JSON`,
          `No`,

* instalar os pacotes que faltam  :   `yarn add -D @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1 @typescript-eslint/parser@latest`

* cola essas configurações nas configurações do vs code;
  "[javascript]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        }
    },
    "[javascriptreact]":{
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        }
    },
    "[typescript]":{
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        }
    },
    "[typescriptreact]":{
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        }
    },

* yarn add -D eslint-import-resolver-typescript :   `o node so encontra importações js, para isso instalamos esse modulo que encontra importações typescript das outras pastas do proprio projeto`;


# --------------------------AULA 5 PRETTIER-----------------------------
* yarn add prettier eslint-config-prettier eslint-plugin-prettier -D    :   `instalar o prettier para deixar o codigo mais bonito`;

# -----------------------CONFIG PACKAGE.JSON ----------------------

`script para executar a aplicação`
ts-node-dev : `compila de ts para js e executa a aplicação como o nodemon`
--transpile-only :   `Não verifica se o codigo esta com erro, ate pq ñ é tarefa dele, com isso deixa a execução mais rapida`;
--ignore-watch node_modules :   `não verifica os arquivos nodemodules, com isso a execução fica mais rapida`;
src/server.ts   :   `diretorio do aquivo de execução`;

"dev:server": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"


# -----------------------------INSTALANDO POSTGRES DOCKER ----------------------------

* docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres   :
  `--name: nomeando o container (bd), Password: colocando a senha do banco, -p: a porta que ira executar, postgres: a imagem que vamos utilizar`;

* docker ps   :   `mostra todos os container que estão rodando no meu pc`;
* docker ps -a   :   `mostra todos os container que existem no meu pc`;
* docker logs b35d1f81085e  :   `Para ver todos os logs do container especificado pelo id(b35d1f81085e)`;
* docker stop b35d1f81085e  :   `Para parar algum container epecificando o id`;
* docker start b35d1f81085e   :   `Startando o container especifivado pelo id`;


# -----------------------------INSTALANDO TYPEORM ----------------------------

* yarn add typeorm pg   :   `instalando o typeorm e o drive do postgres`;


# -------------------------- CRIANDO MIGRATIONS TABELA DE AGENDAMENTOS ------------------------

* no ormconfig.json adicione as linhas de migrations e cli;

* no package.json adicione  :   "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"

* yarn typeorm migration:create -n CreateAppointments   :   `Criando a migrations de agendamentos(appointments)`;

* criando o codigo da migrations que sera para criar a tabela appointments (lembrando que nome de tabelas são sempre minusculas, no plural e se preciso dividido por underline);

* yarn typeorm migration:run    :   `executar todas as migrations`;

* OBS: caso escrevemos nossa migrations errada, so podemos altera-la se ainda não tivemos enviada ao git;

* yarn typeorm migration:revert   :   `reverter a ultima migrations executada`;

* yarn typeorm migration:show   :   `mostra as migrations já executada`;

# -------------------------- CRIANDO MODEL TABELA DE AGENDAMENTOS ------------------------

* Entity    :   `entity é uma entidade, algo que vai ser salvo no banco de dados`;

* habilitar (experimentalDecorators , emitDecoratorMetadata ) no tsconfig.json para podemos usar decorators no model;

* @ Decorators    :   ` EX: @Entity('appointments') funciona como se fosse uma função, passa a classe em questão como paramentro na entidade, define que a classe em questão é uma entidade banco de dados, podemos usar decorators para definir as var da classe como colunas do banco`;

* no tsconfig.json desabilitar o ("strictPropertyInitialization": false);


# ----------------------------- REPOSITORIO TYPEORM ----------------------------------------

* Criando e configurando arquivos 'repositories/appointmentsRepositories', 'services/CreateAppointmentsService', 'routes/appointments.routes';

* yarn add reflect-metadata   :   `arquivo necessario para o funcionamento do typeorm`;
- ocorreu um error com esse "reflect-metadata", onde precisamos importa ele no inicio do arquivo "server.ts";

* no ormconfig.json passamos a chave entities com o diretorio das nossas entidades;

* OBS: Ocorreu bastante error em chamadas find ao banco de dados por estar sem o 'await';

* OBS: o service serve para criar oq vai ser salvo com um metodo 'create', apos isso usamos o metodo save para realmente salvar no bd;


# ------------------------------ ESTRUTURA DA APLICAÇÃO ----------------------------------

* src/routes/*.ts   :   `onde iremos receber a resquest e os dados no body, com isso enviamos os dados do body para service`;

* src/services/*.ts   :   `onde iremos executar nossas regras de negocios, como criptografar senhas, enviar emails, e interações simples como create, insert, update... `;

* src/repositories/*.ts   :   `ira conter metodos adicionais para criar consultas mais complexas no banco`;


# ---------------------------- AUTENTICAÇÃO ------------------------------------------

* refresh token   :   `para o token ser gerado novamente a partir do token antigo e ñ precisar ficar logando sempre`;

* src/@types/express.d.ts   :   `arquivo utilizado para sobreescrever uma tipagem dentro do express, criar uma nova var dentro do express para guarda os valores passados no middlewares para as rotas, override de typagem`;

* src/middleware/ensureAuthenticated.ts   :   `arquivo para validar o token e caso seja valido, colocar o id do user na request e passar para a rota seguinte`;

# ---------------------------TRATAR ERRORS -----------------------------------------

* src/errors/AppError   :   `arquivo para tratamento e padronização dos erros, onde contem uma "message" e "statusCode", normalmente setamos os errors no nosso service e enviamos ao cliente nas nossas routes`;

* no serve(arquivo principal), vamos fazer uma trativa global de errors nas rotas;

* yarn add express-async-errors   :   `pacote para o express pode capturar erros mesmo que seja async, pois quando as rotas são async e temos erros o express fica esperando que algo volte e paralisa a aplicação`;


# ----------------------- CORS -----------------------------------------

* yarn add cors   :   instalação do cors, utilizado para que sites não confiaveis acessem nossa api;


# ----------------------- ARQUITETURA E DDD -----------------------------------------

* Para uma arquitetura bacana devemos dividir a aplicação por cada area de dominio daqeuele modulo/arquivo(cada funcionalidade tipo de usuarios, agendamentos), colocando as abstrações de banco de dados e regras de negocios em uma pasta especifica;

* DDD   :   Domain Driven Design;     `É uma metodologia(tipo scrum)  onde usamos para definir a estrutura de pasta comm base nas regras de negocios. è aplicado apenas ao  backend `;

* o ddd é dividido em camada de dominio e camada de infra, onde na camada de dominio colocamos as regras de negocio da aplicação e na infra as tecnologias utilizadas. sempre que conversamos com clientes não tecnicos, nos falamos sobre a camada de dominio para saber mais sobre as funcionalidades, ja na camada de infra é um papo mais tecnico para definir as tecnologias que serão ou estão sendo utilizadas;

* TDD   :   Test Driven Development;    `É uma forma(Metodologia) de programar orientado a testes que é mais produtiva, onde criamos os testes primeiros para dpois criamos as funcionalidades. è aplicado tanto no back quanto no frontend`;

* Pasta modules   :   `ira conter cada area de atuação, cada modulo de funcionalidades, cada setor da aplicação`;

* Pasta shared    :   `pasta onde ira conter arquivos que serão compartilhados por toda a aplicação, como a conexão com o banco de dados`;

* devido aos error de importação cofiguramos o arquivo tsconfig.json com as informações que facilitará nas importações (@modules, @shared);

* yarn add tsconfig-paths -D   :   `devidos as alterações nas importações devemos instalar essa dependencia para que o nodejs consiga compreender as importações e alteramos o package.json adicionando "-r tsconfig-paths/register" a chave dev:server para que encontre as importações`;

* yarn add tsyringe   :   `dependencia/lib para injeção de dependencia (Para não precisar passar sempre como paramentro o nosso repositorio no contructor dos services)`;

* ---------------- Estrutura das pastas -----------------
```javascript

  const src: {
    @types: `contem arquivos de tipagem do typescript`,
    config: `pasta ondefica algumas configurações padrão`,
    modules: {
      appointments: {
        dtos: `ficará interfaces com os tipos de dados dos appointments, para ser utilizado sempre que precisar de tipagem `,
        infra: {  `ficará os conteudos relacionamos a parte mais tecnica, como tecnologias utilizadas`
          http: {`pasta onde irá conter tecnologias relacionadas ao express`
            routes: `arquivos de rotas`,
            middlewares: `arquivos de autenticação das rotas, normalmente usado para auth com JWT`,
            controllers: `são responsaveis por receber as requisições das rotas, enviar para os arquivos fazerem todas as funcionalidades, e retorna o resultado`,
          },
          typeorm: {  `ficara conteudo relacionado a tecnologia typeorm`
            entities: `pasta onde contem os arquivos de models do bd`,
            repositories: `pasta que contem arquivos de consultas mais complexas(SQL) ao BD`,
          },
        },
        providers: { `contem arquivos provedores de funcionalidades para o modulo de users`;
          HashProvider: { `pasta com as funcionalidades de criptografia(hash no caso)`
            fakes: `fica arquivos de testes, onde simulam uma criptografia, não utilizar tecnlogia de criptografia`,
            implementations: `fica a biblioteca, a forma que usamos para fazer criptografia`,
            models: `ficará as interfaces com os parametros e metodos que um provedor de hash precisa ter (caso mude a tec de cript, nos ja sabemos os metodos)`,
          },
        },
        repositories: {`pasta p sabemos as interface que serão implementadas independente da tacnologia(ORM), principio SOLID, Liskov Substitution Principle`
          fakes: `ficara arquivos fakes onde simula interações com o banco de dados e serviçoes externos`
        },
        services: `pasta onde ficara os arquivos com funcionalidades das regras de negocios, sem vinculo com nenhuma tecnologia diretamente`,
      }
    },
    shared: { `pasta onde ira conter arquivos que serão compartilhados por toda a aplicação`
      conteiner: {`Arquivos para injeção de dependencia, conteiners que serão usados pelos arquivos do services (o service busca pelo id a injeção desejada)`;
        StorageProvider: { `ficara os arquivos de configuração para upload de documentos (imagens, pdf, csv)`
          fakes: `fica arquivos de testes, onde simulam upload de arquivos`,
          implementations: `fica a biblioteca, a forma que usamos para fazer upload de arquivos`,
          models: `ficará as interfaces e os metodos que um Storage de arquivos precisa ter (caso mude a tec, nos ja sabemos os metodos)`,
        },
        MailProvider: { `ficara arquivos de configuração para envio de emails`
          fakes: `fica arquivos de testes, onde simulam envio de emails`,
          implementations: `fica a biblioteca, a forma que usamos para fazer envio de emails`,
          models: `ficará as interfaces e os metodos que um envio de emails precisa (caso mude a tec, nos ja sabemos os metodos)`,
        }
      },
      errors: `pasta com arquivo para definir tipos de errors`,
      infra: { `ficará os conteudos relacionamos a parte mais tecnica, como tecnologias utilizadas`
        http: { `pasta onde irá conter tecnologias relacionadas ao express`
          middlewares: `arquivos middlewares`,
          routes: `arquivos de rotas`,
          server: `arquivo principal da aplicação`
        },
        typeorm: { `ficara conteudo relacionado a tecnologia typeorm`
          migrations: `pasta com arquivos para estruturar o bd`,
          index:  `arquivo de conexão com o bd`;
        },
      }
    }
  }

```
* --------------------------------

* exemplo de fluxo de funcionalidade :    `Route -> Controller -> Servico -> Repositorio -> Servico -> Controller`;


# ------------------------------------- TESTES E TDD ----------------------------------------

* Testes automatizados servem para que nossa aplicação continue funcionando independente do numero de novas funcionalidades e do numero de devs o time.

* Testes unitarios:   `Testam funcionalidades especificas da nossa aplicação (precisam ser funcões puras (que ñ depende de outras partes da aplicação), que jamais irão fazer chamadas a api, ñ pode depender de serviços externos) (utilizar tdd)`;

* Testes de integração:   `Testam uma funcionalidade completa passando por varias camadas da aplicação (como por exemplo todo o fluxo de cadastro de usuario).`;

* Testes E2E:   `Testes que simulam a ação do usuario dentro da nossa aplicação. (Relacionado ao front end, por isso ñ conseguimos no nodejs)`;

* TDD :   `Test Driven Development (desenvolvimento orientado a testes)`

* yarn add jest -D  :   `dependencia para fazer testes`;
  - yarn jest -- init : `para iniciar as configurações do jest  Passo: Y, N, node, N, babel?, Y `;
  - yarn add ts-jest -D : `Para conseguir ler os testes em typescript`;

* arquivo jest.config.js  :   `arquivo com as configurações padrões do jest, estão comentadas com o valor padrão`;
  - Informações abaixo sobre configurações do arquivo jest.config.ts ↓
  - chave'ts-jest'  :   `para que o jest entenda ts;
  - chave "testMatch": `informa sobre os caminhos padrões onde irá procurar os testes, no caso ira buscar por todo arquivo que termina com spec.ts`;
  - chave "moduleNameMapper" : `devido a estarmos usando @modules para definir caminhos/rotas, vamo importar o "pathsToModuleNameMapper de ts-jest/utils" e ""compilerOptions de ./tsconfig.json", para que o jest possa entender; (para que funcione corretamente o arquivo ./tsconfig.json ñ pode ter comentarios)`;
  - chave "collectCoverage" : `para saber quais arquivos ja foram testados`;
  - chave "collectCoverageFrom" : `caminho para os arquivos que estamos testando`;
  - chave "coverageDirectory" : `nome da pasta onde ficara as informações sobre os coverage/arquivosTestados`;
  - chave "coverageReporters" : `o que ira conter dentro dos arquivos de informação de coverages`;

* em testes "unitarios" criamos um repository fake, para que não tenha interação com o bd;

* coverage : `para saber quais arquivos ja foram testados e informações sobre os testes`;

* um teste nunca pode depender de outro, nada pode ser reaproveitado de outro teste na execução;

* comandos JEST :
  - expect()   :   `significa "o que espero", onde colocamos o codigo ou a função que desejamos executar/testar`;
  - toBe()   :   `significa "que seja", onde colocamos o resultado esperado do teste`;
  - toHaveProperty() :  `espera que tenha a propriedade passada por paramentro no elemento esperado`;
  - describe() : `utilizado para dividir os testes, para não serem todos iguais, com um paramentro de identificador`;
  - it()   :   `tipo uma descrição de cada teste`;
  - rejects :  `espera que retorne algum error`;
  - toBeInstanceOf : `espera que seja uma instancia de determinado elemento`;
  - spyOn  : `serve para espionar se alguma função da nossa aplicação foi executada, saber se um metodo de alguma classe foi chamado`;
  - toHaveBeenCalled : `serve para verificar se a função passada como parametro foi chamada/executada`;
  - toHaveBeenCalledWith : `serve para verificar se a função passada como parametro foi chamada/executada, com um parametro especifico`;
  * beforeEach() :   `função que é disparada sempre antes do teste`;

  * yarn test src/modules/...     :   `passando um caminho/rota p executar apenas um teste especifico`;

  * REGRA: ao criar teste faça da forma mais simples possivel e primeiro deve dar Error/RED, segundo faça dar certo/GREEN e dpois faça a refatoração onde colocamos todas funcionalidades e vamos testando;

  * sempre que um expect tenha "rejects.toBeInstanceOf()" colocaremos um await antes do expect;

  * o jest algumas vezes guarda em cache os testes ja feito, ai caso vctenha corrigido um test e continue o error execute o comando no terminal `yarn jest --clearCache`;


# ----------------------------------MAPEANDO AS FEATURES---------------------------------------------

* informar todas as funcionalidades do sistema;
* OBS: a regra de negocio sempre deve esta se referenciando a algum requisito funcional, pq se ñ tiver tem alguma coisa errada;

* -----RECUPERAÇÃO DE SENHA:-----
  **Requisitos Funcionais**
    - O Usuario deve poder recuperar sua senha informando seu e-mail;
    - O usuario deve receber um email com instruções de recuperação de senha;
    - O usuario deve poder resetar sua senha;
  **Requisitos Ñ Funcionais** `são requisitos que ñ são ligados diretamente com a regra de negocio (parte mais tecnica, informa as tec)`;
    - Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
    - Utilizar amazon SES para envios em produção;
    - O envio de e-mails deve acontecer em segundo plano (Background job); `utiliza conceito de fila onde colocamos todos esses serviços mais demorados em 2º plano`
  **Regras de Negocio**
    - O link enviado por email deve expirar em duas horas;
    - O usuario precisa confirma a nova senha ao resetar sua senha;

* -----ATUALIZAÇÃO DO PERFIL:-----
  **Requisitos Funcionais**
    - O usuario deve poder atualizar seu nome, email e senha;
  **Regras de Negocio**
    - O usuario não pode alterar seu email para um já utilizado;
    - Para atualizar sua senha o usuario deve informa a senha antiga;
    - Para atualizar sua senha, o usuario precisa confirma a nova senha;

* -----PAINEL DO PRESTADOR:-----
  **Requisitos Funcionais**
    - O prestador deve poder listar seus agendamentos de um dia especifico;
    - O prestador deve receber uma notificação sempre que houver um novo agendamento;
    - O prestador deve poder visualizar as notificações não lidas;
  **Requisitos Ñ Funcionais**
    - Os agendamentos do prestador do dia devem ser armazenados em cache;
    - As notificações devem ser armazenadas no MongoDB;
    - As notificações do prestador devem ser enviadas em tempo-real com Socket.io;
  **Regras de Negocio**
    - A notificação deve ter um statusde lida ou não-lida para que o prestador possa controlar;

* -----AGENDAMENTO DE SERVIÇOS:-----
  **Requisitos Funcionais**
    - O usuario deve poder listar todos os prestadores de serviços cadastrados;
    - O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador;
    - o usuario deve poder listar horarios disponiveis em um dia especifico de um prestador;
    - O usuario deve poder realizar um novo agendamentocom um prestador;
  **Requisitos Ñ Funcionais**
    - A listagem de prestadores deve ficar armazenada em cache; `Para que não fique carregando sempre e gaste muito processamento`;
  **Regras de Negocio**
    - Cada agendamento deve durar uma hora exatamente;
    - Os agendamentos devem estar disponiveis entre as 8h e 18h (Primeiro as 8h, ultimo as 17h);
    - O usuario não pode agendar em um horario ja ocupado;
    - O usuario não pode agendar em um horario que ja passou;
    - O usuario não pode agendar um serviço consigo mesmo;



# --------------RECUPERAÇÃO DE SENHA -------------------------

* http//localhost:3000/password/forgot : `endpoint/rota para recuperação de senha, onde enviamos nosso email e é gerado um token para fazer a recuperação`;

* http//localhost:3000/password/reset : `endpoint/rota para alterar a senha, onde enviamos a nova senha e o token que foi enviado ao nosso email na recuperação/forgot`;


# ------------------------MONGODB---------------------------------------

* é utilizado o mongo quando tem uma grande quantia de dados entrando ou sendo alterados;
* é indicado para dados que não precisam de relacionamentos, um bom exemplo é para notificações;

* criando o container do mongo no Docker:  `docker run --name mongodb -p 27017:27017 -d -t mongo`
    - -d: para ficar rodando em detachedmod, backgorund (segundo plano);
    - -t: para não bloquear meu terminal;
    - hash gerado ao criar: 1c62a46a5dd113224630c503bdfcceba9dc972db44418ce753d0f7cb4ab6f4b3

* no mongo chamamos as entidades (tabelas) de schemas;

**Configurar o mongo no ormconfig.json**
{
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "gobarber",
    "useUnifiedTopology": true,          `para remover um erro que da quando inicia a conexão com o mongo`;
    "entities": [
        "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
}

* para a conexão ocorrer certinho devemos ir no shared/infra/typeorm/index.ts e colocar a importação como `createConnections`;

* precisa instalar essa lib para poder funcionar ao rodar o servidor    :   `yarn add mongodb`;

* no mongo não é armazenado id no formato uuid, mas no formato "ObjectID" que é importado do typeorm;

**sempre que for usar uma conexão que não for a default (no ormconfig.json) devemos passar o nome da conexão como parametro, example em: notification/infra/typeorm/NotificationRepository**

# ---------------------------------------------------------------

* video com atraso, deixar o sincronismo em 5.9

* arquivo tsconfig.json seria o arquivo de configuração do ts, onde passamos o lugar onde ira ficar o codigo compilado do ts, pq o node não lê codigo ts ai temos que compilar p js;

* para saber todos os comandos do vscode aperte crtl+shift+p e digite open keyboard shortcuts;

* KISS    :   programar de forma simples (tipo metodologia) (sempre que for começar uma feature comecar fazendo de uma forma estupidamente simples);

* aula "3 - Criação de Registros" foi um divisor de aguas para entender a estrutura da aplicação;

* no .eslintrc.json o que esta dentro das chaves de env são arquivos expostos globalmente

* nos services nunca importamos as tecnologias diretamente, apenas as interfaces delas, pq as tecnologias são colocadas por injeção de dependencia;

* readonly: não podemos reatribuir valor a propriedade, deixa meio que private;

* MVP : `Minimo Produto Viavel (é fazer as funcionalidades essenciais para que o sistema funcione, e com o tempo vai aperfeiçoando)`;

* assistir video 'jornada do usuario' p saber planejar/criar aplicações do zero;

* SHIFT + END : `selecionar toda linha`;

* Cronograma:
  1. rotas e controllers;
  2. Repositorio de tokens (Typeorm)
  3. Criar migration de tokens
  4. Provider de envio de email (dev)
  5. Registrar providers no container
  6. Testar tudo!!

* constructor : `são iniciados junto com a aplicação, apenas uma vez`;

* para entendimento do flow correto
    - routes -> controllers -> services
    - aula "5 - salvando tokens no banco" é boa para entender o fluxo da aplicação;

* podemos importar de outro modulo tranquilo, so não podemos na camada de dominio (modulo) importar uma dependencia da camada de infra;

* comandos para startar a docker no linux do trampo é "dk" e apos "docker start 41d0affdd50e", apos isso podemos startar o o nosso servidor com 'yarn dev:server';

* mudar os icones do vscode aperta (CTRL + P) dpois digita (>json) e escolhe a segunda opção, ai vai na chave "material-icon-theme.folders.associations" para alterar os icones;