class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    if (config != undefined) {

      this.config = config;
      this._state = config.initial;
      this._undo = false;
      this._redo = false;

    } else {
      // show error
      throw new Error();
    }
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this._state;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {

    // check new state in this.config.states
    if (!this.config.states.hasOwnProperty(state)) {
      // show error
      throw new Error();
    } else {
      return this._state = state;
    }
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {

    console.info('trigger', event);

    // get current transitions from config
    let currentTransitions = this.config.states[this._state].transitions;

    if(currentTransitions.hasOwnProperty(event)) {
      // change _state
      this._state = currentTransitions[event];
    } else {
      // show error
      throw new Error();
    }
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    return this._state = this.config.initial;
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {

    let states = this.config.states,
        resultArr = new Array();

    if (event == undefined || event == '') {

      // not correct event
      return Object.keys(states);

    } else {

      // check event in this.config.states
      for (let state in states) {
        if (states[state].transitions.hasOwnProperty(event)) {
          resultArr.push(state);
        }
      }

      return resultArr;
    }
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {

    let statesArr = this.getStates(),
        count = 0;

    if (this._state == this.config.initial) {
      this._undo = false;
    }

    return this._undo;
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    return this._redo;
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this._undo = false;
    this._redo = false;
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
