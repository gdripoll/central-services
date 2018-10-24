# central-services


## Generation
```bash
express --pug --git --force --view pug central-services
```

## Installation

```bash
#!/bin/bash
clear
echo -e "==========\nWORKING\n=========="
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
echo -e "==========\nREADY\n=========="
```

A veces pueden surgir problemas de corrida `generalmente en dev` por la cantidad de archivos que caen en el watch (durante la corrida del `forever --watch`). Esto se puede arreglar subiendo la cantidad de watches habilitados en el `system`.

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Proyecto

```bash
sudo npm install -g forever
sudo npm install -g forever-service

git clone http://github.com/gdripoll/central-services.git
cd central-services.git
npm install

npm start
```



#### Dependencias

*(las dependencias se instalan automáticamente con la aplicación)*

```json
"dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "forever": "^0.15.3",
    "http-errors": "~1.6.2",
    "morgan": "~1.9.0",
    "pug": "2.0.0-beta11"
}
```

Log4Js

[http://stritti.github.io/log4js/docu/index.html](http://stritti.github.io/log4js/docu/index.html)

NodeConfigManager

[https://www.npmjs.com/package/node-config-manager](https://www.npmjs.com/package/node-config-manager)

[https://github.com/Valko54/node-config-manager](https://github.com/Valko54/node-config-manager)



#### Instalación módulos de aplicación

```shell
# desarrollo
npm install 
# produccion
npm install --only=production
```



#### Instalar servicio

```shell
# instalar administrador
sudo npm install -g forever
sudo npm install -g forever-service

# instalar servicio
cd /root/path/of/project

# servidor deproduccion
forever-service install -e "NODE_ENV=PROD" cserv --script "./bin/www" --start 
# servidor de desarrollo
forever-service install -e "NODE_ENV=TEST" cserv --script "./bin/www" --start 

# quitar servicio
cd /root/path/of/project
forever-service delete cserv
```





## Corrida

### Servicio

Para correr o parar el servicio luego de haberlo instalado

```shell
# iniciar
service cserv start
# detener
service cserv stop
# status
service cserv status
```




### Worker

para correr el programa sin haber instalado el servicio

```json
"scripts": {
	"start": "NODE_ENV=production forever ./bin/www",
	"dev": "NODE_ENV=development forever --watch ./bin/www",
	"docs": "jsdoc --configure ./jsdoc.config.json",
	"test": "mocha ./tests --recursive --watch"
},
```



#### Correr como producción

```shell
npm start
```



#### Correr como desarrollo

```shell
npm run dev
```





## Test Units

para correr los test:

```shell
npm run test
```

<u>ATENCIÓN</u>: los test corren en modo `--watch`, por lo que se seguira corriendo una vez que terminen todos los asserts, a la espera de que cambie algun archivo y correr todos los tests una vez más.

Para terminar, usar `Ctrl+C`.





## Documentación

#### Actualizar documentación

```
npm run docs
```

#### Visualizar documentación

```shell
your-browser /root/path/of/project/docs/index.html
```


-----