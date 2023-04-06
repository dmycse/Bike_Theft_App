## SF Финальный проект

API для финального проекта курса Frontend-разработчик от Skillfactory

## Описание API
### I. Сущности

#### Сущность «Ответственный сотрудник»

email (string):	E-mail адрес сотрудника. Обязательное и уникальное поле

firstName (string):	Имя сотрудника

lastName (string):	Фамилия сотрудника

password 	(string):	Пароль. Обязательное поле

clientId 	(string):	clientId, уникальный для каждого студента. Обязательное поле

approved 	(boolean): Статус сотрудника: одобрен/не одобрен.
true для первого пользователя, созданного с конкретным clientId. 
Для всех последующих — false.

#### Сущность «Сообщение о краже»

status	(string):	Статус сообщения. Обязательное поле 
Возможные значения: new, in_progress, done
"new" при создании нового сообщения.

licenseNumber	(string):	Номер лицензии. Обязательное поле

type (string): Тип велосипеда. Обязательное поле
Возможные значения: general, sport

ownerFullName (string): ФИО пользователя (арендатора велосипеда). Обязательное поле

clientId (string): clientId, уникальный для каждого студента. Обязательное поле

createdAt (date): Дата создания сообщения. Обязательное поле
Текущая дата при создании сообщения

updatedAt (date): Дата последнего обновления сообщения
Текущая дата при обновлении сообщения

color (string):	Цвет велосипеда

date	(date):	Дата кражи

officer (string):	Ответственный сотрудник
Валидным значением может быть только действующий id ответственного сотрудника из базы

description (string):	Дополнительный комментарий

resolution (string):	Завершающий комментарий


### II. Запросы
Все запросы работают с форматом JSON, поэтому не забывайте указывать заголовок Content-type: application/json.

POST /api/auth/sign_up 	Запрос для создания новой учетной записи в системе.

POST /api/auth/sign_in 	Запрос для авторизации существующего пользователя.
В ответе на этот запрос в поле token вы получите токен, который вам нужно использовать для запросов, доступных только авторизованным пользователям. Токен будет действителен в течение 7 дней с даты отправки запроса.

Подсказка: рекомендуется сохранять этот токен в local storage, чтобы не проходить авторизацию постоянно. Токен необходимо передавать в каждом запросе, доступном только авторизованным пользователям в следующем заголовке: Authorization: Bearer <token>.

GET /api/auth/ 	Запрос для проверки действительности токена. 
В данном запросе не нужно указывать никакие данные, кроме токена в заголовке Authorization.

POST /api/public/report 	Запрос для создания нового сообщения о краже. 
Этот запрос доступен без авторизации. Его нужно отправлять, когда сообщение о краже создаёт неавторизованный пользователь.

Важно! Во всех следующих запросах clientId указывать НЕ НУЖНО. Они доступны только авторизованным пользователям. ClientId будет автоматически браться из токена.

POST /api/cases 	Запрос для создания нового сообщения о краже

PUT /api/cases/:id 	Запрос для редактирования сообщения о краже, 
где :id — идентификатор редактируемого сообщения

Примечание: запись вида :id означает, что запрос имеет динамическую часть, в данном случае id. Двоеточие при запросе опускается, оно нужно только для обозначения динамической части запроса.

DELETE /api/cases/:id 	Запрос на удаление сообщения о краже

GET /api/cases 					Запрос на получение всех сообщений о краже

GET /api/cases/:id 	Запрос на получение информации по конкретному сообщению о краже

POST /api/officers 	Запрос для создания нового сотрудника

PUT /api/officers/:id 	Запрос на редактирование сотрудника по id 
(можно использовать, например, для функции «одобрить»)

DELETE /api/officers/:id 	Запрос на удаление сотрудника

GET /api/officers 	Запрос для получения списка всех сотрудников

GET /api/officers/:id 	Запрос для получения информации по конкретному сотруднику

Полная документация к API бэкенд-части находится по [ссылке](https://documenter.getpostman.com/view/18055274/UVRAH6XZ) 
### Описание API бэкенд-части

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