<template>
    <span class="timer">
        	{{displayHours}}:{{dispayMinutes}}:{{displaySeconds}}
    </span>
</template>

<script>
export default {
    data: function () {
        return {
            displayHours : 0,
            dispayMinutes : 0,
            displaySeconds : 0
        }
    },
    computed: {
    _seconds: () => 1000,
    _minutes ()  {
        return this._seconds * 60;
    },
    _hours ()  {
        return this._minutes * 60;
    },
    _days ()  {
        return this._hours * 24;
    }
    },
    mounted () {
        this.showRemaining()
    },
    methods: {
        showRemaining ()  {
            const timer = setInterval(() => {
                const now = new Date();
                const end = new Date();
                end.setUTCHours (-3,0,0,0);
                end.setDate(end.getDate()+1);
                const distance = end.getTime() - now.getTime();

                if (distance <0) {
                    clearInterval(timer);
                    return;
                }

                 const days = Math.floor ( distance / this._days);
                const hours = Math.floor ((distance % this._days)/this._hours);
                const minutes = Math.floor ((distance % this._hours)/this._minutes);
                const seconds = Math.floor ((distance % this._minutes)/this._seconds);
                this.dispayMinutes = minutes <10 ? "0" + minutes : minutes;
                this.displaySeconds = seconds <10 ? "0" + seconds : seconds;
                this.displayHours = hours <10 ? "0" + hours : hours;
            },1000);
        }
    }
}
</script>