## SF Финальный проект
### Описание

API для финального проекта курса Frontend-разработчик от Skillfactory

### Запросы с авторизацией

Большинство запросов доступны только авторизованным пользователям (необходимость авторизации всегда указана в описании запроса). Чтобы обработка запроса с авторизацией прошла успешно, нужно передать секретный ключ - токен - в заголовке Authorization. Пример:

Authorization: Bearer <Ваш токен>

Получить токен можно, отправив запрос на POST /api/auth/sign_in с данными созданной вами учетной записи

### Ответ от сервера

В случае успешного запроса в ответе от сервера приходит JSON объект со свойством "status" : "OK". Если ответ должен содержать какие-либо данные (например, список сотрудников), эти данные находятся в свойстве data.

Если запрос завершился с ошибкой, в ответе приходит JSON объект со свойством "status" : "ERR". В объекте также будут свойства errCode (краткий код ошибки) и message (развернутое описание ошибки).

## Авторизация

### POST Sign Up
https://sf-final-project-be.herokuapp.com/api/auth/sign_up

Запрос для создания новой учетной записи.

#### Вводные данные:

Обязательные параметры отмечены звездочкой

    email*
    password*
    clientId*
    firstName
    lastName
    approved: если не передан в запросе, первому созданному пользователю с конкретным clientId будет автоматически присвоено значение true, всем последующим пользователям - false.

Body raw (json)
{
    "email": "user@skillfactory.ru",
    "password": "12345",
    "clientId": "your-client-id"
}

### POST Sign In
https://sf-final-project-be.herokuapp.com/api/auth/sign_in

#### Вводные данные:

Обязательные параметры отмечены звездочкой

    email*
    password*

#### Результат запроса:

    token - токен, необходимый для выполнения запросов с авторизацией. Каждый токен действителен в течение 7 дней с момента запроса.
    user - данные авторизованного пользователя

Body raw (json)
{
    "email": "user@skillfactory.ru",
    "password": "12345"
}

### GET Auth
https://sf-final-project-be.herokuapp.com/api/auth/

Запрос для проверки валидности токена. Токен должен быть передан в заголовке Authorization.

#### Результат запроса:

    token - токен, необходимый для выполнения запросов с авторизацией. Каждый токен действителен в течение 7 дней с момента запроса.
    user - данные авторизованного пользователя

AUTHORIZATION Bearer Token
Token <token>


## Известные случаи

### POST Create Case
https://sf-final-project-be.herokuapp.com/api/cases/

Запрос для создания нового сообщения о краже

#### Вводные данные:
Обязательные параметры отмечены звездочкой

licenseNumber*
ownerFullName*
type*
color
date
officer (ID сотрудника)
description

#### Результат запроса:

case - объект с данными созданного кейса

Поля status, clientId, createdAt заполняются на бэкенде автоматически.

Данный запрос доступен только авторизованным пользователям.

AUTHORIZATIONBearer Token
Token <token>

Body raw (json)
{
    "ownerFullName": "John Doe",
    "licenseNumber": "56y34gwrtgrt",
    "type": "sport"
}

### POST Create Case (public)
https://sf-final-project-be.herokuapp.com/api/public/report

Запрос для создания нового сообщения о краже (доступен без авторизации)

#### Вводные данные:
Обязательные параметры отмечены звездочкой

licenseNumber*
ownerFullName*
type*
clientId*
color
date
description

#### Результат запроса:

case - объект с данными созданного кейса

Поля status и createdAt заполняются на бэкенде автоматически.

Body raw (json)
{
    "ownerFullName": "John Doe",
    "licenseNumber": "56y34gwrtgrt",
    "type": "sport",
    "clientId": "your-client-id"
}

### PUTE dit Case
https://sf-final-project-be.herokuapp.com/api/cases/:id

Запрос для редактирования сообщения о краже

#### Вводные данные:
Одно или несколько из следующий полей:

status
licenseNumber
ownerFullName
type
color
date
officer
description
resolution

Переданные поля будут изменены, остальные сохранят предыдущие значения.

#### Результат запроса:

case - объект с данными обновленного кейса

Поле updatedAt заполняется на бэкенде автоматически.

Данный запрос доступен только авторизованным пользователям.

AUTHORIZATIONBearer Token
Token <token>

PATH VARIABLES
id

Body raw (json)
{
    "status":"in_progress"
}

### DELETEDelete Case
https://sf-final-project-be.herokuapp.com/api/cases/:id

Запрос для удаления сообщения о краже

Данный запрос доступен только авторизованным пользователям.


AUTHORIZATIONBearer Token
Token <token>

PATH VARIABLES
id

### GET Get All Cases
https://sf-final-project-be.herokuapp.com/api/cases/

Запрос для получения всех сообщений о краже

Данный запрос доступен только авторизованным пользователям.

AUTHORIZATION Bearer Token
Token <token>

### GET Get One Case
https://sf-final-project-be.herokuapp.com/api/cases/:id

Запрос для получения данных одного сообщения о краже

Данный запрос доступен только авторизованным пользователям.

AUTHORIZATIONBearer Token
Token <token>

PATH VARIABLES
id

## Сотрудники

### POST Create Officer
https://sf-final-project-be.herokuapp.com/api/officers

Запрос для создания нового сотрудника

#### Вводные данные:
Обязательные параметры отмечены звездочкой

email*
password*
firstName
lastName
approved

#### Результат запроса:

officer - объект с данными созданного сотрудника

Данный запрос доступен только авторизованным пользователям.
AUTHORIZATIONBearer Token
Token <token>

Body raw (json)
{
    "email": "officer@skillfactory.ru",
    "password": "12345"
}

### PUT Update Officer
https://sf-final-project-be.herokuapp.com/api/officers/:id

Запрос для редактирования данных о сотруднике

#### Вводные данные:
Одно или несколько из следующий полей:

password
firstName
lastName
approved

Переданные поля будут изменены, остальные сохранят предыдущие значения.

#### Результат запроса:

officer - объект с данными отредактированного сотрудника

Данный запрос доступен только авторизованным пользователям.
AUTHORIZATION Bearer Token
Token <token>

PATH VARIABLES
id

Body raw (json)
{
    "firstName": "John",
    "lastName": "Smith"
}

### DELETE Delete Officer
https://sf-final-project-be.herokuapp.com/api/officers/:id

Запрос для удаления данных сотрудника

Данный запрос доступен только авторизованным пользователям.

AUTHORIZATION Bearer Token
Token <token>

PATH VARIABLES
id

### GETGet All Officers
https://sf-final-project-be.herokuapp.com/api/officers/

Запрос для получения списка всех сотрудников.

Данный запрос доступен только авторизованным пользователям.

AUTHORIZATION Bearer Token
Token <token>

### GET Get Officer
https://sf-final-project-be.herokuapp.com/api/officers/:id

Запрос для получения данных об одном сотруднике.

Данный запрос доступен только авторизованным пользователям.

AUTHORIZATION Bearer Token
Token <token>

PATH VARIABLES
id