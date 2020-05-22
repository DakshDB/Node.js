var Job = require('./job.js')
var job = new Job()

job.on('done',function(details){
  console.log('Weekly email job was complete at',
    details.completeOn)
})

job.emit('start')
