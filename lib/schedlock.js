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

        this.lockKey = lockKey || this.puid.generate();

        this.lockConfig = lockConfig || {
            driftFactor: 0.01, // time in ms
            retryCount:  2,
            retryDelay:  200, // time in ms
            retryJitter:  200 // time in ms
        };

        this.redlock = new Redlock(
            this.redis,
            this.lockConfig
        );        
    }

    schedule(dateTimeOrCron, funToRun){
        schedule.scheduleJob(dateTimeOrCron, function(){
            var ttl = 1000;

            this.redlock.lock(this.lockKey, ttl, function(err, lock) {
                if(err) {
                    console.error(err);
                } else {
                    funToRun();
                    lock.unlock(function(err) {
                        // we weren't able to reach redis; your lock will eventually
                        // expire, but you probably want to log this error
                        console.error(err);
                    });
                }
            });
        });
    }
}

module.exports = SchedLock;
