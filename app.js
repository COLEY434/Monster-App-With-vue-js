new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    random: 0,
    turns: []
  },

  methods: {
    StartGame: function() {
      (this.gameIsRunning = true),
        (this.playerHealth = 100),
        (this.monsterHealth = 100);
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(10, 3);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits the monster for " + damage
      });
      if (this.checkWin()) {
        return;
      }

      this.monsterattack();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);

      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits the monster hard for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterattack();
    },
    monsterattack: function() {
      var damage = this.calculateDamage(12, 5);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits the player for " + damage
      });
      this.checkWin();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals by 10"
      });
      this.monsterattack();
    },
    giveUp: function() {
      this.gameIsRunning = false;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    calculateDamage: function(max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.StartGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.StartGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
    }
  }
});
