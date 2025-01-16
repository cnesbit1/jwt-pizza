# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      | home.jsx           | none              | none         |
| Register new user<br/>(t@jwt.com, pw: test)         | register.jsx       | [PUT] /api/auth   | INSERT INTO user (name, email, password) VALUES (?, ?, ?) /n INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?) |
| Login new user<br/>(t@jwt.com, pw: test)            | login.jsx          | [PUT] /api/auth   | SELECT * FROM user WHERE email=? \n SELECT * FROM userRole WHERE userId=? \n INSERT INTO auth (token, userId) VALUES (?, ?) |
| Order pizza                                         | menu.jsx           |                   |              |
| Verify pizza                                        |                    |                   |              |
| View profile page                                   |                    | none              | none         |
| View franchise<br/>(as diner)                       |                    |                   |              |
| Logout                                              | logout.jsx         | [DELETE] /api/auth| none         |
| View About page                                     | about.jsx          | none              | none         |
| View History page                                   | history.jsx        | none              | none         |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) |                    |                   |              |
| View franchise<br/>(as franchisee)                  | franchiseDashboard.jsx |               |              |
| Create a store                                      |                    |                   | INSERT INTO store (franchiseId, name) VALUES (?, ?)             |
| Close a store                                       |                    |                   | DELETE FROM store WHERE franchiseId=? AND id=?             |
| Login as admin<br/>(a@jwt.com, pw: admin)           |                    |                   |              |
| View Admin page                                     |                    |                   |              |
| Create a franchise for t@jwt.com                    |                    |                   | SELECT id, name FROM user WHERE email=? \n INSERT INTO franchise (name) VALUES (?) \n INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)             |
| Close the franchise for t@jwt.com                   |                    |                   | DELETE FROM store WHERE franchiseId=? \n DELETE FROM userRole WHERE objectId=? \n DELETE FROM franchise WHERE id=?             |
