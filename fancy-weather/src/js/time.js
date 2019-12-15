class Time {
  constructor(time, layout) {
    this.layout = layout;
    (this.day = this.layout.dayShort[time.getDay()]),
      (this.date = time.getDate()),
      (this.month = this.layout.month[time.getMonth()]),
      (this.hour = time.getHours()),
      (this.minutes =
        time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`);
  }
  updateTime() {
    const curTime = new Date();
    (this.day = this.layout.dayShort[curTime.getDay()]),
      (this.date = curTime.getDate()),
      (this.month = this.layout.month[curTime.getMonth()]),
      (this.hour = curTime.getHours()),
      (this.minutes =
        curTime.getMinutes() > 9
          ? curTime.getMinutes()
          : `0${curTime.getMinutes()}`);
  }
  updateLayout(newLayout) {
    this.layout = newLayout;
    this.updateTime();
  }
}

export { Time };
