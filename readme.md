# Phonebook server

Address:

`https://afternoon-hollows-46741.herokuapp.com/`

## Example requests:
```
GET https://afternoon-hollows-46741.herokuapp.com/api/persons

GET https://afternoon-hollows-46741.herokuapp.com/api/persons/1

DELETE https://afternoon-hollows-46741.herokuapp.com/api/persons/1

POST https://afternoon-hollows-46741.herokuapp.com/api/persons HTTP/1.1
content-type: application/json

{
    "name": "name",
    "number": "12344"
}
```