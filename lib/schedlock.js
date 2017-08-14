const Redlock = require('redlock'); 
const schedule = require('node-schedule'); 
const Puid = require('puid'); 

class SchedLock {
    constructor(redis, lockConfig, lockKey){
        this.puid = new Puid();

        if(redis instanceof Array) {
            this.redis = redis; //redis clients
        } else {
            this.redis = [redis];
        }

        this.lockKey = lockKey || puid.generate();

        this.lockConfig = lockConfig || {
            driftFactor: 0.01, // time in ms
            retryCount:  2,
            retryDelay:  200, // time in ms
            retryJitter:  200 // time in ms
        };

        this.redlock = new Redlock(
            [redis],
            this.lockConfig
        );        
    }

    schedule(dateTimeOrCron, funToRun){
        schedule.scheduleJob(dateTimeOrCron, funToRun);
    }
}

exports.schedlock = SchedLock;
