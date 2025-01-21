# Full Stack Pokemon

Este proyecto es una aplicación completa de backend y frontend para gestionar entrenadores y Pokémon. El backend está desarrollado con *Node.js, mientras que el frontend está desarrollado con **React*.

## Estructura del Proyecto

El proyecto se encuentra dividido en dos carpetas principales:

•⁠  ⁠*⁠ backend/ ⁠*: Contiene el código del servidor y la API de Node.js.
•⁠  ⁠*⁠ react-trainers-pokemons/ ⁠*: Contiene el código del frontend desarrollado en React.

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

•⁠  ⁠*Node.js* (recomendado: v16 o superior)
•⁠  ⁠*MongoDB* (si es necesario, instala MongoDB en tu máquina o usa una base de datos en la nube)

## Instalación y Configuración

### 1. Backend (⁠ backend/ ⁠)

#### Paso 1: Clonar el repositorio

Si aún no has clonado el repositorio:

⁠ bash
git clone <URL_DEL_REPOSITORIO>
 ⁠
Ve al directorio 

cd nombre_del_repositorio

Instala las dependencias necesarias
⁠ bash
npm install
o
yarn install
 ⁠

Genera un archivo .env donde se guardaran las variables del proyecto

MONGO_URI es la dirección de la base de datos
MONGO_DB_NAME es el nombre de la base de datos
⁠ bash
MONGO_URI
MONGO_DB_NAME
EXTERNAL_API_URL_POKEMON=https://pokeapi.co/api/v2
 ⁠

Iniciar MongoDB o instalarlo y levantar el servicio

ejecutar el proyecto

npm start


Verificar que Todo Funcione Correctamente




### 2. Frontend (⁠ frontend/ ⁠)

#### Paso 1: Clonar el repositorio

Si aún no has clonado el repositorio:
 ⁠
Ve al directorio 

cd nombre_del_repositorio

Instala las dependencias necesarias
⁠ bash
npm install
o
yarn install
 ⁠

Genera un archivo .env donde se guardaran las variables del proyecto

REACT_APP_API_URL es la url del backend
por default el backend corre en en http://localhost:5001/api

⁠ bash

REACT_APP_API_URL=
 
ejecutar el proyecto

npm start

Verificar que Todo Funcione Correctamente
