class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    this._initial = config.initial || {};
    this._states = config.states || {};
    this._state = this._initial;
    this._undo = [];
    this._redo = [];
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
    if (this._states.hasOwnProperty(state)) {
      this._undo.push(this._state);
      if (this._redo.length > 0) {this._redo = []}
      this._state = state;
    } else {
      throw new Error(`state isn\'t exist`);
    }
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    let currentTransitions = this._states[this._state].transitions;

    if (currentTransitions.hasOwnProperty(event)) {
      this.changeState(currentTransitions[event]);
    } else {
      throw new Error(`event in current state isn\'t exist`);
    }
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this._undo.push(this.state);
    this._state = this._initial;
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {

    if (event == undefined || event == '') {
      return Object.keys(this._states);
    } else {

      let statesArr = [];

      for (let state in this._states) {
        if (this._states[state].transitions.hasOwnProperty(event)) {
          statesArr.push(state);
        }
      }
      return statesArr;
    }
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    if (this._undo.length) {
      let last = this._undo.pop();
      this._redo.push(this._state);
      this._state = last;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    if (this._redo.length) {
      let last = this._redo.pop();
      this._undo.push(last);
      this._state = last;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this._undo = [];
    this._redo = [];
    this._state = this._initial;
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
