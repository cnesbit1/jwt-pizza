# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      | home.jsx           | none              | none         |
| Register new user<br/>(t@jwt.com, pw: test)         | register.jsx       | [PUT] /api/auth   | INSERT INTO user (name, email, password) VALUES (?, ?, ?) <br> INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?) |
| Login new user<br/>(t@jwt.com, pw: test)            | login.jsx          | [PUT] /api/auth   | SELECT * FROM user WHERE email=? <br> SELECT * FROM userRole WHERE userId=? <br> INSERT INTO auth (token, userId) VALUES (?, ?) |
| Order pizza                                         | menu.jsx           | [POST] /api/order | INSERT INTO dinerOrder (dinerId, franchiseId, storeId, date) VALUES (?, ?, ?, now()) <br> INSERT INTO orderItem (orderId, menuId, description, price) VALUES (?, ?, ?, ?) |
| Verify pizza                                        | delivery.jsx       | [POST] /api/order/verify | none  |
| View profile page                                   | dinerDashboard.jsx | none              | none         |
| View franchise<br/>(as diner)                       | franchiseDashboard.jsx | none          | none         |
| Logout                                              | logout.jsx         | [DELETE] /api/auth| DELETE FROM auth WHERE token=? |
| View About page                                     | about.jsx          | none              | none         |
| View History page                                   | history.jsx        | none              | none         |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) | login.jsx          | [PUT] /api/auth   | SELECT * FROM user WHERE email=? <br> SELECT * FROM userRole WHERE userId=? <br> INSERT INTO auth (token, userId) VALUES (?, ?) |
| View franchise<br/>(as franchisee)                  | franchiseDashboard.jsx | none          | none         |
| Create a store                                      | createStore.tsx    | [POST] /api/franchise/:franchiseId/store | INSERT INTO store (franchiseId, name) VALUES (?, ?) |
| Close a store                                       | closeStore.tsx     | [DELETE] /api/franchise/:franchiseId/store/:storeIdm | DELETE FROM store WHERE franchiseId=? AND id=? |
| Login as admin<br/>(a@jwt.com, pw: admin)           | login.jsx          | [PUT] /api/auth   | SELECT * FROM user WHERE email=? <br> SELECT * FROM userRole WHERE userId=? <br> INSERT INTO auth (token, userId) VALUES (?, ?) |
| View Admin page                                     | adminDashboard.tsx | none              | SELECT id, name FROM franchise <br>         |
| Create a franchise for t@jwt.com                    | createFranchise.tsx | [POST] /api/franchise | SELECT id, name FROM user WHERE email=? <br> INSERT INTO franchise (name) VALUES (?) <br> INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?) |
| Close the franchise for t@jwt.com                   | closeFranchise.tsx  | [DELETE] /api/franchise/:franchiseId | DELETE FROM store WHERE franchiseId=? <br> DELETE FROM userRole WHERE objectId=? <br> DELETE FROM franchise WHERE id=? |
