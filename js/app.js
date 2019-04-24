
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

Horn.prototype.populateDropDownMenu = function() {
  let list = $('#dropDown').clone();
  let $list = $(list[0].content);

  $list.find('option').text(this.keyword);
  $list.find('option').attr('data-keyword', this.keyword);
  $list.find('option').val(this.keyword);
  // var a = $list;
  // console.log(a);
  $list.appendTo('select');
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
  Horn.allHorns.forEach(horn => horn.populateDropDownMenu());
};




//Shorthand for single point of entry
$(() => Horn.readJson());

// DOM-ready function
$(document).ready(function(){
  $('#photo-template').hide();
});

//select dropdown for filtering
$('select').on('click',function(){
  let $selection = $(this).val();
  $(`img`).hide().not($selection);
  console.log($selection);
  $(`img[data-keyword="${$selection}"]`).show();
  console.log($selection);
});
