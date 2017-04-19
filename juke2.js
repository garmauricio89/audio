


function Jukebox() {
  
  this.service = SC;
 
  this.service.initialize({
    client_id: 'fd4e76fc67798bfa742089ed619084a6'
  });

  
  var that = this;  

  this.tracks = [{
      id: 189318867,
      title: "Think by Kaleida(2014,Electronic)",
      artwork_url: "https://i1.sndcdn.com/artworks-000107977054-oby04s-large.jpg"
    },{
      id: 102162015,
      title: "Look At Where We Are by Major Lazer(2013,Electronic)",
      artwork_url: "https://i1.sndcdn.com/artworks-000026918365-04n41p-large.jpg"
    },{
      id: 279685910,
      title: "Chill Bill by Rob Stone(2015,Hip-Hop)",
      artwork_url: "https://i1.sndcdn.com/artworks-000182194665-3b1vbf-large.jpg"
    }
  ];
  
  this.currentTrack = 0;

  
  this.play = function(){
  
    if( !that.tracks[that.currentTrack].player ) {
      that.service.stream("/tracks/"+that.tracks[that.currentTrack].id).then(function(player){
        that.tracks[that.currentTrack].player = player;
        that.tracks[that.currentTrack].player.play();
          that.updateHTML();
      });
    } else {
      that.tracks[that.currentTrack].player.play();
        that.updateHTML();
    }
  };
  this.pause = function(){
    
    var player = that.tracks[that.currentTrack].player;
    if( player ) player.pause();
  };
  this.next = function(){
    
    that.tracks[that.currentTrack].player.pause();
    that.currentTrack += 1;
    if( that.currentTrack >= that.tracks.length ) {
      that.currentTrack = 0;
    } 
    that.play();  
  };
  this.prev = function(){
    that.tracks[that.currentTrack].player.pause();
    that.currentTrack -= 1;
    if( that.currentTrack < 0 ) {
      that.currentTrack = that.tracks.length-1;
    } 
    that.play();
  };
  this.updateHTML = function(){
    
    var elResult = document.getElementById("result");
    elResult.querySelector("h2").innerText = that.tracks[that.currentTrack].title;
    elResult.querySelector("img").src = that.tracks[that.currentTrack].artwork_url;
  }
}

var playlist = new Jukebox();
playlist.play();

document.addEventListener("DOMContentLoaded",function(){
  document.getElementById("play").addEventListener("click",playlist.play);
  document.getElementById("pause").addEventListener("click",playlist.pause);
  document.getElementById("next").addEventListener("click",playlist.next);
  document.getElementById("prev").addEventListener("click",playlist.prev);
});
SC.get("/tracks",{ 
    q: "think kaleida" 
      }).then(function(response) { 
            console.log( response );   });


     
