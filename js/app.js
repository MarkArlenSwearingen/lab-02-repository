
function Horn(horn){
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.allHorns = [];

Horn.prototype.render = function(){
  let hornClone = $('#photo-template').clone();
  let $hornClone = $(hornClone[0].content);

  $hornClone.find('h2').text(this.title);
  $hornClone.find('img').attr('src', this.image_url);
  $hornClone.find('figcaption').text(`${this.description} Number of horns ${this.horns}`);
  $hornClone.find('p').text(this.keyword);

  $hornClone.appendTo('main');
}

Horn.readJson = () => {
  $.get('./data/page-1.json')
    .then(data => {
      data.forEach(element => {
        Horn.allHorns.push(new Horn(element))
      });
    })
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

