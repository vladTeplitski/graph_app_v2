//GLOBALS
var env = 'dev' //log progress in console

var _api_domain = 'http://irwebsites.co.il'
var _api_endpoint = '/Stocks/api/getHistorical'

if (env == 'dev'){
  var _api_stock_number = '257014'
  var _api_key = 'e3e39a6ba77ad26ac31b'
}

var dataBuffer = 'null';

//END GLOBALS

function chartSetup(){
  _debugLogger("[!] into chartSetup() - Starting chart setup");
  var options = {
    chart: {
      type: 'area',
      height: 350
    },
    series: [{
      name: 'sales',
      data: [30,40,45,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
  chart.render();
}

//START General functions block

function _constructAPIURL(from_date, to_date){
  _debugLogger("[i] into _constructAPIURL()");
  var _api_url = _api_domain + _api_endpoint + _constructAPIQUERY(from_date, to_date);
  return _api_url;
}

function _constructAPIQUERY(from_date, to_date){
  _debugLogger("[i] into _constructAPIQUERY()");
  var _api_query = "?stock_number[0]=" + _api_stock_number  + "&api_key=" + _api_key + "&from_date=" + from_date + "&to_date=" + to_date;
  return _api_query;
}

function _debugLogger(str){
  //log debug data to console - using only in dev mode (set in globals)
  if(env == 'dev'){
    console.log(str);
  }
}

function pullData(url, chtype){
  _debugLogger("[!] into pullData()");
  fetch(url) // Call the fetch function passing the url of the API as a parameter
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    // Your code for handling the data you get from the API
    _debugLogger("[i] Reading data from API & Returning");
    //_debugLogger(data.History.Entry[0]);
    deploy_data_for_construction(data, chtype);
  })
  .catch(function(error) {
    _debugLogger("[ERR] ERROR: Failed pulling data from API: " + error);
  });
}

function deploy_data_for_construction(data, chtype){
  //Navigate to the data construction
  _debugLogger(data.History.Entry[0]);
  _debugLogger('[!] Constructing data for: ' + chtype);
}

//END General functions block


//START Construct weekly data

function build_week(){
  _debugLogger("[!] into build_week()");

  //START Weekly var setup
  //Weekly dates range - TODO: Global - from today, week back.
  var _api_date_from = '01032020'
  var _api_date_to = '05032020'
  chartType ='week'
  //END Weekly var setup

  //pull data
  pullData(_constructAPIURL(_api_date_from, _api_date_to), chartType);
}

function build_year(){
  _debugLogger("[!] into build_year()");

  //START Weekly var setup
  //Weekly dates range - TODO: Global - from today, week back.
  var _api_date_from = '01032019'
  var _api_date_to = '01032020'
  chartType ='year'
  //END Weekly var setup

  //pull data
  pullData(_constructAPIURL(_api_date_from, _api_date_to), chartType);
}

//END construct weekly data


function main() {

  //Build weekly chart
  build_week()
  build_year()

  //Chart setup
  chartSetup()
    
}