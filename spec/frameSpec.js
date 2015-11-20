describe("Frame:", function() {
  var frame;
  var player;
  var randomNumber;
  var game;

  beforeEach(function() {
    game = {
      storeScores: function() {},
      frameLength: function() {
        return 9;
      }
    };
    frame = new Frame(game);
    randomNumber = 5;
  });

  describe("initialized state", function() {
    it("starts with 10 pins", function() {
      expect(frame.getPins()).toEqual(10);
    });
    it("can store knocked down pins", function() {
      expect(frame.getKnockedDownPins()).toEqual([]);
    });
  });

  describe("during play", function() {
    it("stores knocked down pins", function() {
      frame.setKnockedDownPins(randomNumber);
      expect(frame.getKnockedDownPins()[0]).toEqual(5);
    });
    it("reduces the number of remaining pins", function(){
      frame.setKnockedDownPins(randomNumber);
      expect(frame.pins).toEqual(frame.MAX_PINS - randomNumber);
    });
    it("records a whole frame", function(){
      frame.setKnockedDownPins(randomNumber);
      frame.setKnockedDownPins(randomNumber);
      expect(frame.getKnockedDownPins()).toEqual([5,5]);
      expect(frame.pins).toEqual(0);
    });
    it("can reset", function(){
      frame._resetDefaults();
      expect(frame.pins).toEqual(frame.MAX_PINS);
      expect(frame.getKnockedDownPins()).toEqual([]);
    });
  });

  describe("end of frame", function() {
    beforeEach(function() {
      spyOn(game, "storeScores");
      for(var i = 0; i < 3; i++) {
        frame.setKnockedDownPins(randomNumber);
      }
    });

    it("finishes after a player has rolled twice, without achieving a strike", function() {
      expect(frame.getKnockedDownPins()).toEqual([5]);
    });
    it("sends scores to the Game object", function() {
      expect(game.storeScores).toHaveBeenCalled();
    });
  });
});
