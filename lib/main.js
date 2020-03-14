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
  console.log("Starting API Req function");
  url = "http://irwebsites.co.il/Stocks/api/getHistorical?stock_number[0]=257014&api_key=e3e39a6ba77ad26ac31b&from_date=24062018&to_date=24082018"
  fetch(url) // Call the fetch function passing the url of the API as a parameter
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
      // Your code for handling the data you get from the API
      console.log("Reading data from API:");
      console.log(data);
  })
  .catch(function(error) {
      // This is where you run code if the server returns any errors
  });

}
