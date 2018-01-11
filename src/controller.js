class Controller{
  constructor(router){
    router = (router || new Router)
    this.router = router;
    window.onhashchange = this.hashChanged.bind(this);
    this.hashChanged();
  }
  hashChanged(ev){
    console.log(window.location.hash);
    if(window.location.hash.length > 0){
      var pageName = window.location.hash.substr(1);
      this.loadPageController(pageName, 'get');
    }
  }

  loadPageController(pageName, reqType){
    pageName = reqType + "_" + pageName
    console.log(pageName);
    // Execute if a method matching pageName exists else pagenotfound
    try{
      this[pageName]();
    } catch(err){
      console.log(err);
      this.get_PageNotFound();
    };
  }

  async get_notes(){
    console.log("On the notes page");
    await this.router.render('notes')
  }

  async get_counter(){
    console.log("On the counter page");
    await this.router.render('counter');
    document.getElementById("count").innerHTML = counter.number
  }

  get_PageNotFound(){
    console.log("page not found");
    this.router.render('not_found');
  }

  async get_counterIncrease() {
    counter.increment()
    // await this.router.render('notes')
    await this.get_counter()
    window.location.hash = "counter"
  }
}

window.onload = function(){
  var controller = new Controller(new Router('counterapp'));
  console.log(controller);
}
