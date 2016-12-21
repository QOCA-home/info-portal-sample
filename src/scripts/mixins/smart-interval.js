export default {
  setSmartInterval(callback, intervals=1000, delay=0, immediatelyRun=false) {
    console.log(`setSmartInterval interval: ${intervals} delay: ${delay}`);
    this._smartIntervalIds = this._smartIntervalIds || [];

    if (immediatelyRun) {
      callback();
    }
    setTimeout(() => {
      const intervalId = setInterval(callback, intervals);
      console.log('setSmartInterval: '+intervalId);
      this._smartIntervalIds.push(intervalId);
    }, delay);
  },

  getSmartIntervalIds() {
    return this._smartIntervalIds;
  },

  clearSmartInterval(intervalIds) {
    intervalIds.forEach((intervalId) => {
      console.log('clearSmartInterVal');
      console.log(`intervalId: ${intervalId}`);
      clearInterval(intervalId);
    });
  },

  componentWillUnmount() {
    console.log(`smart-intervaj.js componentWillUnmount`);

    this._smartIntervalIds.forEach((intervalId) => {
      console.log(`intervalId: ${intervalId}`);
      clearInterval(intervalId);
    });
    this._smartIntervalIds = [];
  }
};
