class SchedLock {
    constructor(redis){
        this.redis = redis;
    }
    
    schedule(dateTimeOrCron, funToRun){
        schedule.scheduleJob(dateTimeOrCron, funToRun);
    }
}

exports.schedlock = SchedLock;
