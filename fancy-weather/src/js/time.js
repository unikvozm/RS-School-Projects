class Time {
  constructor(time, layout) {
    this.layout = layout;
    (this.day = this.layout.dayShort[time.getDay()]),
      (this.nextDay = this.layout.day[(time.getDay() + 1) % 12]),
      (this.next2Day = this.layout.day[(time.getDay() + 2) % 12]),
      (this.next3Day = this.layout.day[(time.getDay() + 3) % 12]),
      (this.date = time.getDate()),
      (this.month = this.layout.month[time.getMonth()]),
      (this.hour = time.getHours()),
      (this.minutes =
        time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`),
      (this.seconds =
        time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`);
  }
  updateTime(curTime = new Date()) {
    (this.day = this.layout.dayShort[curTime.getDay()]),
      (this.date = curTime.getDate()),
      (this.nextDay = this.layout.day[(curTime.getDay() + 1) % 12]),
      (this.next2Day = this.layout.day[(curTime.getDay() + 2) % 12]),
      (this.next3Day = this.layout.day[(curTime.getDay() + 3) % 12]),
      (this.month = this.layout.month[curTime.getMonth()]),
      (this.hour = curTime.getHours()),
      (this.minutes =
        curTime.getMinutes() > 9
          ? curTime.getMinutes()
          : `0${curTime.getMinutes()}`),
      (this.seconds =
        curTime.getSeconds() > 9
          ? curTime.getSeconds()
          : `0${curTime.getSeconds()}`);
  }
  updateLayout(newLayout) {
    this.layout = newLayout;
    this.updateTime();
  }
}

export { Time };
