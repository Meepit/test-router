class Template {
  constructor(html, engine = new TemplateEngine) {
    this.html = html
    this.engine = engine
  }

  changeHTML(newhtml){
    this.html = newhtml
  }

  evaluateHTML(newhtml, context){
    this.changeHTML(newhtml)
    this.engine.modifyHTML(this, context)
  }

}

class TemplateEngine {
  constructor() {
    this.re = /{{([^}}]+)?}}/g
  }

  modifyHTML(template, context) {
    var match;
    while((match = this.re.exec(template.html)) !== null){
      template.html = template.html.replace(match[0], context[match[1]]);
    }
  }

}
