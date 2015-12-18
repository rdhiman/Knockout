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
    
    //asynchronous ajax call to get the results based on the url
    $.ajax({
      'async': true,
      'url': url,
      'dataType': "json",
      'success': function(data) {
          //sort the returned data alphabetically based on the title of the video
          data.items.sort(function (left, right) { return left.snippet.title == right.snippet.title ? 0 : (left.snippet.title < right.snippet.title ? -1 : 1) });
          self.youtubeResults(data.items);     
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
    var id = object.id.videoId; //get the youtube id of the clicked item     
    $('#videoModal .modal-dialog').append('<div id="ytplayer"></div>'); // append the youtube player div in the modal

    player = new YT.Player('ytplayer', { //create a new player by passing the id of the item user clicked on
      height: '390',
      width: '640',
      videoId: id
    });

    $('#videoModal').modal('show'); //show the modal
    $("#videoModal").css('display', 'block');
    
  };
  
  $('#videoModal').on('hidden.bs.modal', function () {
      player.destroy(); // destroy the youtube player once the modal is closed by the user input
      $('#ytplayer').remove();
  });
 
}

$(document).ready(function(){
  var vm = new youtubeResultsModel(); //create new model
  ko.applyBindings(vm); // apply bindings to the model 
  vm.loadPopularVideos(); //load the initial popular videos
  
});

var menu = (function() { //fly out menu

  function init() {
    
    //slice creates an empty array. Iterates through the nodelist it is running on and appends the elements of the nodelist to the empty array
    [].slice.call( document.querySelectorAll( '.menu' ) ).forEach( function( el, i ) {

      // select the elements from the dom to work on
      var trigger = el.querySelector( 'div.trigger' ),
        icon = trigger.querySelector( 'span.glyphicon-menu-hamburger' ),
        open = false;
      
      // add event listener on the trigger element
      trigger.addEventListener( 'click', function( event ) {
        if( !open ) {
          el.className += ' menu-open'; // add the class menu-open to the div with menu class
          $("header").css("transform", "translate3d(26em, 0, 0)"); //apply css transforms to the header element
          $(".right").css("transform", "translate3d(26em, 0, 0)"); //apply css transforms to the right element
          $("footer").css("transform", "translate3d(26em, 0, 0)"); //apply css transforms to the footer element
          open = true;
        }
      }, false );

      // add event listener on the icon element
      icon.addEventListener( 'click', function( event ) { //close the flyout menu and remove the css styles from the header, right, and footer elements
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
