// @ts-nocheck
var url="https://docs.google.com/spreadsheets/d/1-JuyIQ7PCnSymOmiWipH1jfRZAo2bn8GmvAntuNQhyI/edit#gid=923444938";
var ss=SpreadsheetApp.openByUrl(url);
var loggedIn = 'false';

function doGet(e){
  if(!e.parameter.v){
    var htmlOutput = HtmlService.createTemplateFromFile('SignInOrRegister');
    return htmlOutput.evaluate();
  }
    if(e.parameter['v']=='backToLogin'){
    var htmlOutput = HtmlService.createTemplateFromFile('SignInOrRegister');
    return htmlOutput.evaluate();
  }
else if(e.parameter['v']=='dateConflict'){
  var htmlOutput = HtmlService.createTemplateFromFile('submitUnavailableDate');
return htmlOutput.evaluate();
}
else if(e.parameter['v']=='loggedIn'){
  var htmlOutput = HtmlService.createTemplateFromFile('welcomeLoggedIn');
return htmlOutput.evaluate();
}
else if(e.parameter['v']=='UnsuccessfulLogIn'){
  var htmlOutput = HtmlService.createTemplateFromFile('unsuccessfulLogIn');
return htmlOutput.evaluate();
}
else{
    var htmlOutput = HtmlService.createTemplateFromFile('submitUnavailableDate');
    return htmlOutput.evaluate();
}


}

//function doGet(e){
//  return HtmlService.createHtmlOutputFromFile("index");
//}

function userConflictClicked(userInfo){
 Logger.log(url);
  var ss=SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheetByName("TestPage");
  copyDownFormulasOnConflictAddRow();
  ws.appendRow([new Date(), userInfo.firstname, userInfo.lastname, userInfo.unavailableDate]); 
  //ws.sort(4);
}


function userSignInClicked(userInfo){
 Logger.log(url);
  var ss=SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheetByName("Sign In Data");
  workingCopyDownFormulasOnAddRow();
  ws.appendRow([new Date(), userInfo.firstName, userInfo.emailAddress, userInfo.password]); 
  document.getElementById("firstName").value="";
  document.getElementById("emailAddress").value="";
  document.getElementById("password").value="";
 

}

function signInResponse(){  // attempt to get "Hello firstName" if LoggedIn == TRUE
  var lastRow=ss.getSheetByName("Sign In Data").getLastRow();
  firstName = ss.getSheetByName("Sign In Data").getRange(lastRow,2,1,1).getValues();
  var isLoggedIn= ss.getSheetByName("Sign In Data").getRange(lastRow,6,1,1).getValues();
    if(isLoggedIn=='true'){
      console.log("you got there")
        // var page=HtmlService.createHTemplateFromFile("welcomeLoggedIn")

        //   return page;
  //return ("Welcome  "+firstName+"!    You are now logged in.")
}
else{
  console.log("you didn't get in")
  var htmlOutput = HtmlService.createTemplateFromFile('unsuccessfulLogIn');
return htmlOutput.evaluate();
// var page=HtmlService.createHTemplateFromFile("unsuccessfulLogIn");
//           return page;
}
}

function copyDownFormulasOnConflictAddRow(){  
  var ss=SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheetByName("TestPage");
  //const lines = ws.getRange("E2").getValue();
  const lines =1;
  let vToCopy = ws.getRange(2,5,1,1).getValues();
  let fToCopy = ws.getRange(2,5,1,1).getFormulasR1C1();
  let out = [[]];
  for (let i in fToCopy[0]){
    if(fToCopy[0][i] == "")
      out[0].push(vToCopy[0][i])
    else
      out[0].push(fToCopy[0][i])
  }
  for (let i = 0; i < lines; i++){
    //ws.getRange(ws.getLastRow()+1,4,1,1).setValues(out);
    ws.getRange(ws.getLastRow()+1,5,1,1).setValues(out);
  }
}

function workingCopyDownFormulasOnAddRow(){  
  var ss=SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheetByName("Sign In Data");
  //const lines = ws.getRange("E2").getValue();
  const lines =1;
  let vToCopy = ws.getRange(2,5,1,2).getValues();
  let fToCopy = ws.getRange(2,5,1,2).getFormulasR1C1();
  let out = [[]];
  for (let i in fToCopy[0]){
    if(fToCopy[0][i] == "")
      out[0].push(vToCopy[0][i])
    else
      out[0].push(fToCopy[0][i])
  }
  for (let i = 0; i < lines; i++){
    ws.getRange(ws.getLastRow()+1,5,1,2).setValues(out);
  }
}


function getUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}
