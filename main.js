function youtubeResultsModel() {
  var self = this;
  var searchUrl;
  self.isLoading = ko.observable(false); //loading icon
  self.showResults = ko.observable(true); 
  self.theTemplate = ko.observable('results-list-view'); // load the default template (results-grid-view)
  self.youtubeResults = ko.observableArray([]); 
  
  self.listView = function(item) { // change the view to grid view when the grid-view button is clicked
    this.theTemplate('results-grid-view');
  };
  
  self.gridView = function(item) { //change the view to list-view when the list-view button is clicked
    this.theTemplate('results-list-view');
  };
  
  //check for the keypress on search input and if the keycode is 13 (enter button), get the value of user's input and pass it on 
  // to the loadPopularVideos function
  self.searchYoutube = function(data, event) { 
    if (event.keyCode == 13) {
          var searchText = $('#searcYt').val();          
          self.loadPopularVideos(searchText);          
        }
    return true;
  };

  self.loadPopularVideos = function(searchText) { //load videos on initial page load and also on user's request
    
    self.isLoading(true); //set isLoading to true so the loading icon shows
    self.showResults(false); //set showResults to false since we haven't made the api call yet and don't show any template yet
    var key = 'AIzaSyAcecFriKxOqzxqQVTybGtuSFY4y82lwEM'; // youtube api key
    var url;    
    
    if(searchText === undefined){ //check to handle if the user enetered anything in the search box before hitting enter 
      url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key='+key+'&maxResults=50';
    }else {
      url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&&q='+searchText+'type=video&key='+key+'&maxResults=50';
    }
    
    //asynchronous ajax call
    $.ajax({
      'async': true,
      'url': url,
      'dataType': "json",
      'success': function(data) {
          data.items.sort(function (left, right) { return left.snippet.title == right.snippet.title ? 0 : (left.snippet.title < right.snippet.title ? -1 : 1) });
          self.youtubeResults(data.items);
          console.log(data.items);       
       },
       'complete': function(data) {
          self.isLoading(false);
          self.showResults(true);
       }
    });
  };


  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  // var player;  

  self.playVideo = function(object) {
    var id = object.id.videoId;
     console.log(object);
    console.log('id is '+ id);
    
    $('#videoModal .modal-dialog').append('<div id="ytplayer"></div>');

    player = new YT.Player('ytplayer', {
      height: '390',
      width: '640',
      videoId: id
    });

    $('#videoModal').modal('show');
    $("#videoModal").css('display', 'block');
    
  };
  
  $('#videoModal').on('hidden.bs.modal', function () {
      player.destroy();
  });
 
}

$(document).ready(function(){
  var vm = new youtubeResultsModel();
  ko.applyBindings(vm);
  vm.loadPopularVideos();
  
});

var menu = (function() {

  function init() {
    
    [].slice.call( document.querySelectorAll( '.menu' ) ).forEach( function( el, i ) {

      var trigger = el.querySelector( 'div.trigger' ),
        icon = trigger.querySelector( 'span.glyphicon-menu-hamburger' ),
        open = false;
      

      trigger.addEventListener( 'click', function( event ) {
        if( !open ) {
          el.className += ' menu-open';
          $("header").css("transform", "translate3d(26em, 0, 0)");
          $(".right").css("transform", "translate3d(26em, 0, 0)");
          $("footer").css("transform", "translate3d(26em, 0, 0)");
          open = true;
        }
      }, false );

      icon.addEventListener( 'click', function( event ) {
        if( open ) {
          event.stopPropagation();
          open = false;
          el.className = el.className.replace(/\bmenu-open\b/,'');
          $("header").css("transform", "translate3d(0, 0, 0)");
          $(".right").css("transform", "translate3d(0, 0, 0)");
          $("footer").css("transform", "translate3d(0, 0, 0)");
          return false;
        }
      }, false );

    } );

  }

  init();

})();

