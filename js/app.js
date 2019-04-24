
function Horn(horn){
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.allHorns = [];

Horn.prototype.render = function(){

}

Horn.readJson = () => {
  $.get('./data/page-1.json')
    .then(data => {
      data.forEach(element => {
        Horn.allHorns.push(new Horn(element))
      });
    })(
    .then(Horn.loadHorns);
};

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => horn.render());
};

//Shorthand for single point of entry
$(() => Horn.readJson());

// DOM-ready function
$(document).ready(function(){
  $('#photo-template').hide();
});

