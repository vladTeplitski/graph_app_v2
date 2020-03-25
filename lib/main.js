//GLOBALS
env = 'dev' //log progress in console

_api_domain = 'http://irwebsites.co.il'
_api_endpoint = '/Stocks/api/getHistorical'

if (env == 'dev'){
  _api_stock_number = '257014'
  _api_key = 'e3e39a6ba77ad26ac31b'
  _api_date_from = '01032020'
  _api_date_to = '05032020'
}

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

function pullData(url){
  _debugLogger("[!] into pullData()");
  fetch(url) // Call the fetch function passing the url of the API as a parameter
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
      // Your code for handling the data you get from the API
      _debugLogger("[i] Reading data from API:");
      _debugLogger(data.History.Entry[0]);
  })
  .catch(function(error) {
    _debugLogger("[ERR] ERROR: Failed pulling data from API: " + error);
  });

}

function _constructAPIURL(){
  _debugLogger("[i] into _constructAPIURL()");
  _api_url = _api_domain + _api_endpoint + _constructAPIQUERY();
  return _api_url;
}

function _constructAPIQUERY(){
  _debugLogger("[i] into _constructAPIQUERY()");
  _api_query = "?stock_number[0]=" + _api_stock_number  + "&api_key=" + _api_key + "&from_date=" + _api_date_from + "&to_date=" + _api_date_to;
  return _api_query;
}

function _debugLogger(str){
  //log debug data to console - using only in dev mode (set in globals)
  if(env == 'dev'){
    console.log(str);
  }
}

function main() {

  //pull data
  pullData(_constructAPIURL());

  //Chart setup
  chartSetup()
    
}