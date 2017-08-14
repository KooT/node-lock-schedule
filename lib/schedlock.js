var Redlock = require('redlock'); 
var schedule = require('node-schedule'); 

class SchedLock {
    constructor(redis){
        this.redis = redis;
        this.redlock = new Redlock(

            [redis],
            {
                driftFactor: 0.01, // time in ms
                retryCount:  10,
                retryDelay:  200, // time in ms
                retryJitter:  200 // time in ms
            }
        );        
    }

    schedule(dateTimeOrCron, funToRun){
        schedule.scheduleJob(dateTimeOrCron, funToRun);
    }
}

exports.schedlock = SchedLock;
