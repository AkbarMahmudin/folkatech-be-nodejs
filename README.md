# **User Service**

## **Set configuration**

* Copy file [.env.example](.env.example) & rename to .env
* Set config in file .env

## **Start App**
* Install package
  `npm install`
* Running app using command
  `npm run start`

## **Start with Docker**

* Running command in terminal
  `./start.sh`
* App running in PORT `3000`
* Stop app use command
  `./stop.sh`

## **API Spec**

* User
  * POST `/users`
  * GET `/users` (Header: AUTHORIZE)
  * GET `/users/:id` (Header: AUTHORIZE)
  * PATCH `/users/:id` (Header: AUTHORIZE)
  * DELETE `/users/:id` (Header: AUTHORIZE)
  * GET `/users/account-number/:accountNumber` (Header: AUTHORIZE)
  * GET `/users/identity-number/:identityNumber` (Header: AUTHORIZE)
  * Body:
    ```json
    {
      "userName": "string",
      "emailAddress": "string",
      "accountNumber": "string",
      "identityNumber": "string"
    }
    ```
* Vehicle
  * POST `/vehicles` (Header: AUTHORIZE)
  * GET `/vehicles` (Header: AUTHORIZE)
  * GET `/vehicles/:id` (Header: AUTHORIZE)
  * PATCH `/vehicles/:id` (Header: AUTHORIZE)
  * DELETE `/vehicles/:id` (Header: AUTHORIZE)
  * Body
    ```json
    {
      "make": "string",
      "model": "string",
      "year": number,
      "color": "string",
      "vin": "string"
    }
    ```
* Token (for authorize)
  * POST `/token`
  * Body:
    ```json
    {
      "id": "string"
    }
    ```
