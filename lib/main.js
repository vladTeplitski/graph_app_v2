function initApp() {
    document.getElementById("debug1").innerHTML = "[!] Starting App";
    req();
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

function req(){
// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('POST', 'https://irwebsites.co.il/Stocks/api/getHistorical?stock_number=199018&token=33b56862a87637a205ea', true);

request.onload = function() {
  // Begin accessing JSON data here
	var data = this.response;
if (request.status >= 200 && request.status < 400) {
    console.log(data)
} else {
  console.log('error')
  console.log(request.status)
}	
}

// Send request
request.send();

}
