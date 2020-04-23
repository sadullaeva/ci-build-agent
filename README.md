# CI build agent

Проект использует Node.js v12.16.1.

Создайте файл `agent-conf.json`, скопировав его с файла `agent-conf.template.json`.
В созданном файле можно сконфигурировать поле `port`, если вы хотите запустить 2 и более билд-агентов.

Команда для установки зависимостей:
```
npm ci
```

Команда для запуска билд-агента локально:
```
npm run start
```

Урл для просмотра swagger документации: http://localhost:8082/swagger/

**Для запуска билд-агента с помощью docker:**

Выполнить сборку docker-образа (это действие нужно выполнить только один раз):
```
npm run build-docker-image
```

Запустить контейнер, заполнив `<host>` и `<port>`:
```
docker run -p <port>:<port> --env HOST=<host> PORT=<port> build-agent
```

Например:
```
docker run -p 8082:8082 --env HOST=localhost PORT=8082 build-agent
```
