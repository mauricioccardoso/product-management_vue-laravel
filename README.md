# Sistema de Cadastro de Produtos

### Tecnologias Utilizadas

- [Laravel 11](https://laravel.com/docs/11.x)
- [VUE 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [PHP 8](https://www.php.net/)
- [Docker e Docker Compose](https://www.docker.com/)
- [AXIOS](https://axios-http.com/)
- [Tailwind](https://tailwindcss.com/)

### Features Desenvolvidas

- Login
- Cadastro de Produtos
- Listagem de Produtos
- Validação de rota

### Técnica e ferramentas

- API RESTFul
- Componetização
- Responsividade
- Docker
- SOLID
- Reaproveitamento de Código

## Configuração

1. Fazer a cópia do projeto para sua máquina

```bash
git clone git@github.com:mauricioccardoso/product-management_vue-laravel.git
```

1.1. Caso tenha o Docker e Docker compose configurado na sua máquina, siga para [Docker e Docker Compose](#configuração-com-docker-e-docker-compose).
Caso não tenha docker, continue para a coniguração do backend e frontend abaixo.

---

# BackEnd

2. Acessa a pasta do projeto a partir do terminal e acessa a pasta backend

```bash
cd backend
```

3. Fazer a instalação das dependências do laravel

```bash
composer install
```

4. Copiar o arquivo .env.example, renomear para .env e configurar as variáveis de acordo com seu banco de dados. Ex:

```bash
DB_CONNECTION=mysql
DB_HOST=app-database
DB_PORT=3306
DB_DATABASE=product-management
DB_USERNAME=root
DB_PASSWORD=devpassroot
```

5. Caso o laravel não gere um chave, usar o comando para gerar uma nova chave de criptografia

```bash
php artisan key:generate
```

6. Verificar e criar o banco de dados conforme sua ferramente de Banco de dados

7. Executar o comando para criar as tabelas no banco de dados e as seeds

```bash
php artisan migrate --seed
```

Obs.: Para subir o servido backend localmente utilize o comando dentro da pasta backend

```bash
php artisan serve --host=localhost --port=8080
```

---

# Frontend

8. Retorne a pasta raiz e entre na pasta do frontend

```bash
cd ../frontend
```

9. Faça a instalação das dependências

```bash
yarn
```

ou

```bash
npm install
```

10. Se necessário, verifique e altere a url da api na variável "baseURL" no arquivo index.ts da pasta http

```bash
const httpClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/'
})
```

11. Utilize o comando abaixo para inicia o projeto frontend

```bash
yarn dev
```

ou

```bash
npm run dev
```

---

# Configuração com Docker e Docker compose

1. Acessa a pasta raiz do projeto a partir do terminal ou com o editor de texto.

2. Na pasta "Backend", copiar o arquivo ".env.exemple" e renomear para ".env".
   Configurar as variáveis de ambiente do banco de dados seguindo as configurações feitas no arquivo docker-compose.yaml na opção "environment"
   Definindo uma senha nos dois arquivos.
   Ex:

```bash
## Docker Database Configuration
DB_CONNECTION=mysql
DB_HOST=app-database
DB_PORT=3306
DB_DATABASE=product-management
DB_USERNAME=root
DB_PASSWORD=devpassroot
##
```

3. Voltar para a raiz do projeto e usar o comando para subir os containers

```bash
docker compose up -d
```

4. Após os containers estiverem prontos, acessar no navegador:

Frontend - Aplicação
[http://localhost:5173/](http://localhost:5173/)

Backend - Server Status
[http://localhost:8080/](http://localhost:8080/)
