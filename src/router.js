function getHTML(path, callback){
  var getter = new XMLHttpRequest();
  getter.onreadystatechange = function(){
    if(getter.readyState === XMLHttpRequest.DONE){
      if(getter.status === 200){
        console.log(getter.responseText)
        callback(getter.responseText)
      } else {
        console.log("Page Not Found")
      }
    }
  }
  getter.open("GET", path, true);
  getter.send();
}

class Router{
  constructor(el){
    this.el = el;
  }

  render(pageName, context){
    return new Promise(resolve => {
      console.log("Trying to render " + pageName);
      this.clearPage();
      getHTML('views/' + pageName + '.html', (data) => {
        template.evaluateHTML(data, context)
        document.getElementById(this.el).innerHTML = template.html
        resolve('resolved');
      })
    })
  }

  clearPage(){
    var mainElem = document.getElementById(this.el);
    mainElem.innerHTML = "";
  }
}
