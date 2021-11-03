const vm = new Vue({
    el:'#app',
    data: {
        sequence: [],
        tmp: [],
        hautGauche: false,
        hautDroite: false,
        basGauche: false,
        basDroite: false,
        sequence: [],
        squareMapping: ['hautGauche',
            'hautDroite',
            'basGauche',
            'basDroite']
    },
    computed: {
        score() {
            const value = this.sequence.length - 1
            return (value < 0) ? `score : 0` : `score : ${ value }`; 
        }
    },
    methods: {
        addNewElemToSequence() {
            this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
            this.tmp = this.sequence.slice();
          },
        allGray(){
            this.hautGauche= false;
            this.hautDroite= false;
            this.basGauche= false;
            this.basDroite= false;
        },
        newGame() {
            this.sequence = [];
            this.nextTurn();
          },
          nextTurn() {
            this.addNewElemToSequence();
            this.allGray();
            this.playSequence(vm.tmp[0]);
          },
        playSequence(carre) {
            setTimeout(function () {
              vm[carre] = true;
              setTimeout(function () {
                vm.allGray();
                vm.tmp.shift();
                if (vm.tmp[0]) {
                  vm.playSequence(vm.tmp[0]);
                } else {
                  vm.tmp = vm.sequence.slice();
                }
              }, 400);
            }, 400);
          },

         
          selectSquare(carre) {
            if (carre === this.tmp[0]) {
              vm[carre] = true;
              setTimeout(function() {
                vm.allGray();
                vm.tmp.shift();
                if (!vm.tmp[0]) {
                  vm.nextTurn();
                }
              }, 400)
            } else {
              alert('Perdu!');
            }
          },

    }
})