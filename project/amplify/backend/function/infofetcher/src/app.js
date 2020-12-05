/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});
const mysql = require('mysql');
const con = mysql.createConnection({
  host: process.env.DATABASE_ENDPOINT,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

/**********************
 * Example get method *
 **********************/

app.get('/items', function (req, res) {
  // Add your code here
  var emp_no = req.apiGateway.event.requestContext.authorizer.claims.name;

  if (emp_no === null || emp_no === undefined) {
    emp_no = '10001'
  }
  let query1 = `Select  current_dept_emp.emp_no,  current_dept_emp.dept_no,  departments.dept_name from current_dept_emp inner join departments on current_dept_emp.dept_no = departments.dept_no where emp_no='${emp_no}';`
  let query2 = `Select first_name,last_name, hire_date from employees where emp_no='${emp_no}';`
  let query3 = `select   salaries.salary  from salaries  inner join employees on employees.emp_no=salaries.emp_no where employees.emp_no='${emp_no}' order by to_date desc limit 1;`
  let query4 = `select titles.title  from titles  inner join employees on employees.emp_no=titles.emp_no where employees.emp_no='${emp_no}' order by to_date desc limit 1 ; `
  let query5 = `Select if(to_date ='9999-01-01',concat(timestampdiff(year,from_date,curdate()),"years ",timestampdiff(month,from_date,curdate())%12,"months ") , concat(timestampdiff(year,from_date, to_date),"years ",timestampdiff(month,from_date,to_date)%12,"months "))as tenure  from current_dept_emp  where emp_no='${emp_no}';`
  let query6 = `Select first_name as manager_firstname, last_name as manager_lastname from employees where emp_no in ( Select emp_no from dept_manager where dept_no in( select dept_no from current_dept_emp where emp_no='${emp_no}' ));`
  let query7 = `select titles.title, titles.from_date,if( titles.to_date='9999-01-01',curdate(), titles.to_date) as to_date from titles   where emp_no='${emp_no}';`
  //let query8 = `Select first_name , last_name  from employees where emp_no in ( Select emp_no from titles where title ='Assistant Engineer' and emp_no in (Select emp_no from current_dept_emp where dept_no in( select dept_no from current_dept_emp where emp_no='${emp_no}')));`
  con.query(query1, function (err, result1) {
    if (err)
      console.log(err)
    else {
      console.log(result1)
      con.query(query2, function (err, result2) {
        if (err)
          console.log(err)
        else
          console.log(result2)
        result1 = JSON.parse(JSON.stringify(result1));
        result2 = JSON.parse(JSON.stringify(result2));
        for (const [key, value] of Object.entries(result2[0])) {
          result1[0][key] = value;
        }
        con.query(query3, function (err, result3) {
          if (err)
            console.log(err)
          else
            result3 = JSON.parse(JSON.stringify(result3));
          for (const [key, value] of Object.entries(result3[0])) {
            result1[0][key] = value;
          }
          con.query(query4, function (err, result4) {
            if (err)
              console.log(err)
            else
              result4 = JSON.parse(JSON.stringify(result4));
            for (const [key, value] of Object.entries(result4[0])) {
              result1[0][key] = value;
            }
            con.query(query5, function (err, result5) {
              if (err)
                console.log(err)
              else
                result5 = JSON.parse(JSON.stringify(result5));
              for (const [key, value] of Object.entries(result5[0])) {
                result1[0][key] = value;
              }
              con.query(query7, function (err, result7) {
                if (err)
                  console.log(err)
                else
                  result7 = JSON.parse(JSON.stringify(result7));

                result1[0]["Job History"] = [];

                result1[0]["Job History"] = result7;

                con.query(query6, function (err, result6) {
                  if (err)
                    console.log(err)
                  else
                    result6 = JSON.parse(JSON.stringify(result6));

                  result1[0]["Managers"] = [];
                  for (x in result6) {
                    console.log(x);
                    result1[0]["Managers"].push(result6[x].manager_firstname + ", " + result6[x].manager_lastname);
                  }


                  res.json(result1[0]);

                })
              })
            })
          })
        })
      })

    }
  })
  //res.json({success: 'get call succeed!', url: req.url});

});

app.get('/items/retrieve', function (req, res) {
  // Add your code here

  res.json({ success: 'get call succeed with items/getdetails!', url: req.url });
});

/****************************
* Example post method *
****************************/

app.post('/items', function (req, res) {
  // Add your code here
  var emp_no = req.apiGateway.event.requestContext.authorizer.claims.name;
  if (req.body.emp_no !== "XXXX") {
    emp_no = req.body.emp_no
  }

  if (emp_no === null || emp_no === undefined) {
    emp_no = '10001'
  }
  let query6 = `Select emp_no  ,first_name , last_name  from employees where emp_no in ( Select emp_no from dept_manager where dept_no in( select dept_no from current_dept_emp where emp_no='${emp_no}' ));`
  let query8 = `Select first_name , last_name ,emp_no   from employees where emp_no in ( Select emp_no from titles where title ='${req.body.type}' and emp_no in (Select emp_no from current_dept_emp where dept_no in( select dept_no from current_dept_emp where emp_no='${emp_no}')));`
  var result1;
  if (req.body.type === 'Manager') {
    con.query(query6, function (err, result6) {
      if (err)
        console.log(err)
      else {
        result6 = JSON.parse(JSON.stringify(result6));

        result1 = [];
        for (x in result6) {
          //console.log(x);
          result1.push(result6[x]);

        }
        console.log(result1)
        res.json(result1)
      }
    })
  } else {
    con.query(query8, function (err, result8) {
      if (err)
        console.log(err)
      else {
        result8 = JSON.parse(JSON.stringify(result8));

        result2 = [];
        for (x in result8) {
          //console.log(x);
          result2.push(result8[x]);

        }
        console.log(result2)
        res.json(result2)
      }
    })

  }
  //res.json(result1)
});

app.post('/items/*', function (req, res) {
  // Add your code here

  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/items', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/items/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/items', function (req, res) {
  // Add your code here
  var emp_no = req.body.emp_no;
  let query1 = `Select  current_dept_emp.emp_no,  current_dept_emp.dept_no,  departments.dept_name from current_dept_emp inner join departments on current_dept_emp.dept_no = departments.dept_no where emp_no='${emp_no}';`
  let query2 = `Select first_name,last_name, hire_date from employees where emp_no='${emp_no}';`
  let query4 = `select titles.title  from titles  inner join employees on employees.emp_no=titles.emp_no where employees.emp_no='${emp_no}' order by to_date desc limit 1 ; `
  let query5 = `Select if(to_date ='9999-01-01',concat(timestampdiff(year,from_date,curdate()),"years ",timestampdiff(month,from_date,curdate())%12,"months ") , concat(timestampdiff(year,from_date, to_date),"years ",timestampdiff(month,from_date,to_date)%12,"months "))as tenure  from current_dept_emp  where emp_no='${emp_no}';`
  let query7 = `select titles.title, titles.from_date,if( titles.to_date='9999-01-01',curdate(), titles.to_date) as to_date from titles   where emp_no='${emp_no}';`

  //let query8 = `Select first_name , last_name  from employees where emp_no in ( Select emp_no from titles where title ='Assistant Engineer' and emp_no in (Select emp_no from current_dept_emp where dept_no in( select dept_no from current_dept_emp where emp_no='${emp_no}')));`
  con.query(query1, function (err, result1) {
    if (err)
      console.log(err)
    else {
      console.log(result1)
      con.query(query2, function (err, result2) {
        if (err)
          console.log(err)
        else
          console.log(result2)
        result1 = JSON.parse(JSON.stringify(result1));
        result2 = JSON.parse(JSON.stringify(result2));
        for (const [key, value] of Object.entries(result2[0])) {
          result1[0][key] = value;
        }

        con.query(query4, function (err, result4) {
          if (err)
            console.log(err)
          else
            result4 = JSON.parse(JSON.stringify(result4));
          for (const [key, value] of Object.entries(result4[0])) {
            result1[0][key] = value;
          }
          con.query(query5, function (err, result5) {
            if (err)
              console.log(err)
            else
              result5 = JSON.parse(JSON.stringify(result5));
            for (const [key, value] of Object.entries(result5[0])) {
              result1[0][key] = value;
            }
            con.query(query7, function (err, result7) {
              if (err)
                console.log(err)
              else
                result7 = JSON.parse(JSON.stringify(result7));

              result1[0]["Job History"] = [];

              result1[0]["Job History"] = result7;




              res.json(result1[0]);


            })
          })
        })
      })


    }
  })
  //res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/items/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
