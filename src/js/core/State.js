class State{

  constructor() {
    this.controllerState = "";
  }

  setState(state) {
    this.controllerState = state;
  }

  getState() {
    return this.controllerState;
  }
}

let state = new State();
state.HAND = Symbol("HAND");
state.PEN = Symbol("PEN");

export default state;
