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
        }
        repositories: `pasta p sabemos as interface que serão implementadas independente da tacnologia(ORM), principio SOLID, Liskov Substitution Principle`,
        services: `pasta onde ficara os arquivos com funcionalidades das regras de negocios, sem vinculo com nenhuma tecnologia diretamente`,
      }
    },
    shared: { `pasta onde ira conter arquivos que serão compartilhados por toda a aplicação`
      conteiner: `Arquivos para injeção de dependencia, conteiners que serão usados pelos arquivos do services (o service busca pelo id a injeção desejada)`,
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


# ---------------------------------------------------------------

* video com atraso, deixar o sincronismo em 5.9

* arquivo tsconfig.json seria o arquivo de configuração do ts, onde passamos o lugar onde ira ficar o codigo compilado do ts, pq o node não lê codigo ts ai temos que compilar p js;

* para saber todos os comandos do vscode aperte crtl+shift+p e digite open keyboard shortcuts;

* KISS    :   programar de forma simples (tipo metodologia);

* aula "3 - Criação de Registros" foi um divisor de aguas para entender a estrutura da aplicação;
