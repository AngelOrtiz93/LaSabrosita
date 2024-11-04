# Usa la imagen oficial de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo de definición de paquetes y el archivo .env
COPY package*.json ./
COPY .env ./

# Instala las dependencias
RUN npm install

# Copia el resto de tu código fuente
COPY . .

# Expone el puerto de tu aplicación
EXPOSE 3001

# Comando para ejecutar tus scripts y luego iniciar la aplicación
CMD ["sh", "-c", "npm run create-permissions && npm run seed:admin && npm start"]
