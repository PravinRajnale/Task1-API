const axios = require('axios');
const fs = require('fs');
const XLSX = require('xlsx');

// Replace with your Instagram Business Account Access Token
// const ACCESS_TOKEN = 'EAANzx0HZACqIBO5LI74PGxL0h8E0rxWj5xixvsznrMXZAdX16JPb9tVtSVc2IXjZAk1UbUr015UirR2b0xIwyT57ADU5kZCavCZBOMpDgOe9Xd2A9m7h182SNd6L69Qn3e2xclM2leOZAa0wTA2tVwi7dXvyC5GIlLe5XzH6BKD3cSTCJH8fPjJ0Ulp5GZARit3iBykl7D7n15ASfkOMDg785pPAJSbkXi2zIGYdMmyqJWMF0KZCOIvr2UIQqtAxlDFfE7GdOQZDZD';

// // API endpoint to retrieve Instagram insights
// const apiEndpoint = `https://graph.instagram.com/v12.0/me?fields=insights.metric(impressions,reach)&access_token=${ACCESS_TOKEN}`;

axios.get("https://api.jikan.moe/v4/top/anime?limit=25")
  .then(response => {
    const data = response;
    return data;
  }).then( response => {
    const insightsData = response.data.data;
    // console.log(insightsData);

    var filename='reports.xlsx';
    const data = [];

    for(let index in insightsData){
      var obj = {};
      var item = insightsData[index];
      // console.log(item)
      obj["title"] = item.title
      obj["duration"] = item["duration"]
      obj["rating"] = item["rating"]
      obj["score"]  = item["score"]
      obj["scored_by"] = item["scored_by"]
      obj["rank"] = item["rank"]
      obj["popularity"] = item["popularity"]
      obj["members"]= item["members"]
      obj["favorites"] = item["favorites"]

      data.push(obj)
    }
    console.log(insightsData)
     var ws = XLSX.utils.json_to_sheet(data);
     var wb = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, "People");
     XLSX.writeFile(wb,filename);
    console.log('Instagram insights data saved as insights.xlsx');
  })
  .catch(error => {
    console.error('Error fetching Instagram insights:', error);
  });
