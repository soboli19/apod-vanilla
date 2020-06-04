var apod = {
    //Create a random date
    randomDate: function(start, end) {
      //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
      let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

      //Format the date
      let d = date.getDate();
      let m = date.getMonth() + 1; //In JS months start at 0
      let y = date.getFullYear();

      //Change the month and day strings so that they match the documented format.
      if(m < 10){
        m = '0'+m
      }

      if(d < 10){
        d = '0'+d
      }

      return `${y}-${m}-${d}`;
    },

    //Injects the results of the API call into the DOM
    buildDOM: function(result) {
    document.getElementById('apodTitle').innerHTML=result.title;
    //console.log(result.url);
    //console.log(result.media_type);
  
    if(result.media_type === 'video') {
      document.getElementById('apodImg').style.visibility = "hidden";
      document.getElementById('apodVideo > iframe').src= result.url;
    }
    else{
      //document.getElementById('apodVideo').style.visibility = "hidden";
      document.getElementById('apodVideo').style.display = "none";
      document.getElementById('apodImg').src = result.url;
      console.log(result.media_type);
    }
  
    //$("#apodCopyright").text("Copyright: " + result.copyright);
    document.getElementById('apodCopyright').innerHTML=result.copyright;
    document.getElementById('apodDate').innerHTML=result.date;
    document.getElementById('apodDesc').innerHTML=result.explanation;

  },
  
  //Executes an AJAX call to an API.
  getRequest: function() {
    let _this = this;
    let date = this.randomDate(new Date(1995, 5, 16), new Date());
    let url = "https://api.nasa.gov/planetary/apod?api_key=BXhedIXLZAtpimXW4995CMj8dKGBhftBmplSMkDj&date=" + date;
    
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload  = function() {
       var result = req.response;
       console.log(result)
       _this.buildDOM(result);
    };
    req.send(null);

  },
  
  // Initialization method.
  init: function() {
    this.getRequest();
  },
};

apod.init();

/* https://learn.jquery.com/using-jquery-core/document-ready/ */
//$(function() {
      //document.getElementById('btnRandApod').on('click',function(){
      document.getElementById('btnRandApod').addEventListener('click', function(){
      //document.getElementById('btnRandApod').onclick= function(){
      apod.getRequest();
    });
