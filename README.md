Clonar repositorio

```sh
git clone https://github.com/ivanhuanca/DAW-continental-IDL3-angular-api.git
cd DAW-continental-IDL3-angular-api
copy bd.example.json bd.json
```

Instalar dependencias e iniciar servidor

```sh
npm install
npm run dev
```

En una terminal diferente iniciar json-server

```sh
json-server --watch bd.json
```

## License

The Angular framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).