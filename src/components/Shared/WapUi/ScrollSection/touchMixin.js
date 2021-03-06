export default {
  data () {
    return {
      touchInfo: {
        start: {x: 0, y: 0, timestamp: 0},
        moving: {x: 0, y: 0, timestamp: 0},
        offset: {x: 0, y: 0},
        // start moving end
        current: 'end'
      }
    }
  },
  methods: {
    // _onTouchStart: function (start, event) {
    //   console.log('touch start', start)
    // },
    onTouchStart (event) {
      const {pageX, pageY, timestamp} = this.handleEvent(event)
      this.touchInfo.start = {x: pageX, y: pageY, timestamp}
      this.touchInfo.current = 'start'
      this._onTouchStart && this._onTouchStart(this.touchInfo.start, event)
    },
    // _onTouchMove: function (moving, event) {
    //   console.log('touch moving', moving)
    // },
    onTouchMove (event) {
      const {pageX, pageY, timestamp} = this.handleEvent(event)
      const touchAngle = Math.atan2(Math.abs(pageY - this.touchInfo.start.y), Math.abs(pageX - this.touchInfo.start.x)) * 180 / Math.PI
      this.touchInfo.moving = {x: pageX, y: pageY, touchAngle: touchAngle, timestamp}
      this.touchInfo.offset = {x: pageX - this.touchInfo.start.x, y: pageY - this.touchInfo.start.y}
      this.touchInfo.current = 'moving'
      this._onTouchMove && this._onTouchMove(this.touchInfo.moving, event)
    },
    // _onTouchEnd: function (end, event) {
    //   console.log('touch end')
    // },
    onTouchEnd (event) {
      // 如果是下来刷新
      this.touchInfo.current = 'end'
      this._onTouchEnd && this._onTouchEnd(this.touchInfo.moving, event)
    },
    handleEvent (event) {
      let touches = event.touches
      let timeStamp = event.timeStamp
      if (touches.length == null) {
        throw new Error('Invalid touch list: ' + touches)
      }
      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf()
      }
      if (typeof timeStamp !== 'number') {
        throw new Error('Invalid timestamp value: ' + timeStamp)
      }
      let pageX = touches[0].pageX
      let pageY = touches[0].pageY
      // multiple touch
      if (touches.length > 1) {
        pageX = Math.abs(touches[0].pageX + touches[1].pageX) / 2
        pageY = Math.abs(touches[0].pageY + touches[1].pageY) / 2
      }
      return {pageX, pageY, timeStamp, touches}
    }
  }
}
