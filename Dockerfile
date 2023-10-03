FROM node
WORKDIR /app
COPY . /app
RUN npm install --force
EXPOSE 3000
CMD ["npm","start"]
