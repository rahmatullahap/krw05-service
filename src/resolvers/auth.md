# Login

Used to collect a Token for a registered User.

**URL** : `/login/`
**Method** : `POST`
**Auth required** : NO
**Data constraints**

```json
{
  "username": "[valid username]",
  "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "username": "myusername",
  "password": "abcd1234"
}
```

## Success Response

**Code** : `200 OK`
**Content example**

```json
{
  "message": "success",
  "data": {
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
  }
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.
**Code** : `400 BAD REQUEST`
**Content** :

```json
{
  "status": 400,
  "message": "Wrong username or password."
}
```
