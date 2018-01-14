class State{

  constructor(){
    this.controllerState = "";
    this.selectColor = "#000000";
  }

  setState(state){
    this.controllerState = state;
  }

  getState(){
    return this.controllerState;
  }

  /* color */
  setColor(color){
    this.selectColor = color;
  }

  getColor(){
    return this.selectColor;
  }
}

let state = new State();
state.HAND = Symbol("HAND");
state.PEN = Symbol("PEN");

export default state;
