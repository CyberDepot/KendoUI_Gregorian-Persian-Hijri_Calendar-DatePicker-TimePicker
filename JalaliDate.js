function JalaliDate() {
    this.g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    this.j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]

    this.jalaliToGregorian = function (j_y, j_m, j_d) {
        j_y = parseInt(j_y);
        j_m = parseInt(j_m);
        j_d = parseInt(j_d);
        var jy = j_y - 979;
        var jm = j_m - 1;
        var jd = j_d - 1;

        var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
        for (var i = 0; i < jm; ++i) j_day_no += this.j_days_in_month[i];

        j_day_no += jd;

        var g_day_no = j_day_no + 79;

        var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
        g_day_no = g_day_no % 146097;

        var leap = true;
        if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
            g_day_no--;
            gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
            g_day_no = g_day_no % 36524;

            if (g_day_no >= 365)
                g_day_no++;
            else
                leap = false;
        }

        gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
        g_day_no %= 1461;

        if (g_day_no >= 366) {
            leap = false;

            g_day_no--;
            gy += parseInt(g_day_no / 365);
            g_day_no = g_day_no % 365;
        }

        for (var i = 0; g_day_no >= this.g_days_in_month[i] + (i == 1 && leap) ; i++)
            g_day_no -= this.g_days_in_month[i] + (i == 1 && leap);
        var gm = i + 1;
        var gd = g_day_no + 1;

        return [gy, gm, gd];
    }

    this.checkDate = function (j_y, j_m, j_d) {
        return !(j_y < 0 || j_y > 32767 || j_m < 1 || j_m > 12 || j_d < 1 || j_d >
            (this.j_days_in_month[j_m - 1] + (j_m == 12 && !((j_y - 979) % 33 % 4))));
    }

    this.gregorianToJalali = function (g_y, g_m, g_d) {
        g_y = parseInt(g_y);
        g_m = parseInt(g_m);
        g_d = parseInt(g_d);
        var gy = g_y - 1600;
        var gm = g_m - 1;
        var gd = g_d - 1;

        var g_day_no = 365 * gy + parseInt((gy + 3) / 4) - parseInt((gy + 99) / 100) + parseInt((gy + 399) / 400);

        for (var i = 0; i < gm; ++i)
            g_day_no += this.g_days_in_month[i];
        if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)))
            /* leap and after Feb */
            ++g_day_no;
        g_day_no += gd;

        var j_day_no = g_day_no - 79;

        var j_np = parseInt(j_day_no / 12053);
        j_day_no %= 12053;

        var jy = 979 + 33 * j_np + 4 * parseInt(j_day_no / 1461);

        j_day_no %= 1461;

        if (j_day_no >= 366) {
            jy += parseInt((j_day_no - 1) / 365);
            j_day_no = (j_day_no - 1) % 365;
        }

        for (var i = 0; i < 11 && j_day_no >= this.j_days_in_month[i]; ++i) {
            j_day_no -= this.j_days_in_month[i];
        }
        var jm = i + 1;
        var jd = j_day_no + 1;


        return [jy, jm, jd];
    }

    this.setJalali = function () {
        this.jalalidate = this.gregorianToJalali(this.gregoriandate.getFullYear(), this.gregoriandate.getMonth() + 1, this.gregoriandate.getDate());
        this.jalalidate[1]--;
    }

    this.getDate = function () {
        return this.jalalidate[2];
    }

    this.getDay = function () {
        return this.gregoriandate.getDay();
    }

    this.getFullYear = function () {
        return this.jalalidate[0];
    }

    this.getHours = function () {
        return this.gregoriandate.getHours();
    }

    this.getMilliseconds = function () {
        return this.gregoriandate.getMilliseconds();
    }

    this.getMinutes = function () {
        return this.gregoriandate.getMinutes();
    }

    this.getMonth = function () {
        return this.jalalidate[1];
    }

    this.getSeconds = function () {
        return this.gregoriandate.getSeconds();
    }

    this.getTime = function () {
        return this.gregoriandate.getTime();
    }

    this.getTimezoneOffset = function () {
        return this.gregoriandate.getTimezoneOffset();
    }

    this.getUTCDate = function () {
        return this.gregoriandate.getUTCDate();
    }

    this.getUTCDay = function () {
        return this.gregoriandate.getUTCDay();
    }

    this.getUTCFullYear = function () {
        return this.gregoriandate.getUTCFullYear();
    }

    this.getUTCHours = function () {
        return this.gregoriandate.getUTCHours();
    }

    this.getUTCMilliseconds = function () {
        return this.gregoriandate.getUTCMilliseconds();
    }

    this.getUTCMinutes = function () {
        return this.gregoriandate.getUTCMinutes();
    }

    this.getUTCMonth = function () {
        return this.gregoriandate.getUTCMonth();
    }

    this.getUTCSeconds = function () {
        return this.gregoriandate.getUTCSeconds();
    }

    this.getYear = function () {
        return this.gregoriandate.getYear();
    }

    this.setDate = function (day) {
        var diff = -1 * (this.jalalidate[2] - day);
        var g = this.gregoriandate.setDate(this.gregoriandate.getDate() + diff);
        this.gregoriandate.setHours(0, 0, 0, 0);
        this.setJalali();
        return g;
    }

    this.setFullYear = function (year, month, day) {
        var y = parseInt(year);
        var m = parseInt(month);
        var d = parseInt(day);

        if (isNaN(month))
            m = 0;

        if (isNaN(day))
            d = 1;

        if (m < 0)
            m = 0;

        if (m == 12) {
            y++;
            m = 0;
        }

        if (d < 1)
            d = 1;

        var j = this.jalaliToGregorian(y, m + 1, d);
        var retval = this.gregoriandate.setFullYear(j[0], j[1] - 1, j[2]);
        this.gregoriandate.setHours(0, 0, 0, 0);
        if (month < 0 || day < 1) {
            if (month < 0) {
                retval = this.gregoriandate.setMonth(this.gregoriandate.getMonth() + month);
            }

            if (day < 1) {
                retval = this.gregoriandate.setDate(this.gregoriandate.getDate() + day - 1);
            }
            this.setHours(1, 0, 0, 0);
            this.setJalali();
        }
        else 
            this.jalalidate = [y, m, d];

        return retval;
    }

    this.setHours = function (hour, min, sec, millisec) {
        if (min == undefined)
            var retval = this.gregoriandate.setHours(hour);
        else if (sec == undefined)
            var retval = this.gregoriandate.setHours(hour, min);
        else if (millisec == undefined)
            var retval = this.gregoriandate.setHours(hour, min, sec);
        else 
            var retval = this.gregoriandate.setHours(hour, min, sec, millisec);

        this.setJalali();
        return retval;
    }

    this.setMilliseconds = function (m) {
        var retval = this.gregoriandate.setMilliseconds(m);
        this.setJalali();
        return retval;
    }

    this.setMinutes = function (m) {
        var retval = this.gregoriandate.setMinutes(m);
        this.setJalali();
        return retval;
    }

    this.setMonth = function (month, day) {
        var y = this.jalalidate[0];
        var m = parseInt(month);
        var d = this.jalalidate[2];

        if (isNaN(day) == false)
            d = parseInt(day);

        return this.setFullYear(y, m, d);
    }

    this.setSeconds = function (s, m) {
        var retval = this.gregoriandate.setSeconds(s, m);
        this.setJalali();
        return retval;
    }

    this.setTime = function (m) {
        var retval = this.gregoriandate.setTime(m);
        //this.gregoriandate.setHours(1, 0, 0, 0);
        this.setJalali();
        return retval;
    }

    this.setUTCDate = function (d) {
        return this.gregoriandate.setUTCDate(d);
    }

    this.setUTCFullYear = function (y, m, d) {
        return this.gregoriandate.setUTCFullYear(y, m, d);
    }

    this.setUTCHours = function (h, m, s, mi) {
        return this.gregoriandate.setUTCHours(h, m, s, mi);
    }

    this.setUTCMilliseconds = function (m) {
        return this.gregoriandate.setUTCMilliseconds(m);
    }

    this.setUTCMinutes = function (m, s, mi) {
        return this.gregoriandate.setUTCMinutes(m, s, mi);
    }

    this.setUTCMonth = function (m, d) {
        return this.gregoriandate.setUTCMonth(m, d);
    }

    this.setUTCSeconds = function (s, m) {
        return this.gregoriandate.setUTCSeconds(s, m);
    }

    this.toDateString = function () {
        return this.jalalidate[0] + "/" + this.jalalidate[1] + "/" + this.jalalidate[2];
    }

    this.toISOString = function () {
        return this.toDateString();
    }

    this.toJSON = function () {
        return this.toDateString();
    }

    this.toLocaleDateString = function () {
        return this.toDateString();
    }

    this.toLocaleTimeString = function () {
        return this.gregoriandate.toLocaleTimeString();
    }

    this.toLocaleString = function () {
        return this.toDateString() + " " + this.toLocaleTimeString();
    }

    this.toString = function () {
        return this.toLocaleString();
    }

    this.toTimeString = function () {
        return this.toLocaleTimeString();
    }

    this.toUTCString = function () {
        return this.gregoriandate.toUTCString();
    }

    this.UTC = function (y, m, d, h, mi, s, ml) {
        return Date.UTC(y, m, d, h, mi, s, ml);
    }

    this.valueOf = function () {
        return this.gregoriandate.valueOf();
    }

    this.gregoriandate = new Date();
    this.gregoriandate.setHours(0, 0, 0, 0);

    if (arguments.length == 0) {
    }
    else if (arguments.length == 3) {
        if (arguments[0] == 1900 || arguments[0] == 2099)
            this.gregoriandate.setFullYear(arguments[0], arguments[1], arguments[2]);
        else
            this.setFullYear(arguments[0], arguments[1], arguments[2]);
    }
    else if (arguments.length == 6) {
        this.setFullYear(arguments[0], arguments[1], arguments[2]);
        this.setHours(arguments[3], arguments[4], arguments[5]);
    }
    else if (arguments.length == 7) {
        this.setFullYear(arguments[0], arguments[1], arguments[2]);
        this.setHours(arguments[3], arguments[4], arguments[5], arguments[6]);
    }
    else if (arguments.length == 1 && typeof (arguments[0]) === "number") {
        this.gregoriandate.setTime(arguments[0]);
    }
    else if (arguments.length == 1 && typeof (arguments[0]) === "JalaliDate") {
        this.gregoriandate = arguments[0].gregoriandate;
    }
    else {
        debugger;
    }

    this.setJalali();

}
/*
JalaliDate.parse = function (datestring) {
    var y = parseInt(datestring.substring(0, 4));
    var m = parseInt(datestring.substring(5, 7));
    var d = parseInt(datestring.substring(8, 10));
    
    return new JalaliDate(y, m-1, d);
}
*/

JalaliDate.parse = function (datestring) {
    try {
        if ("string" != typeof datestring)
        {
            datestring = datestring.toString();
        }
        if (datestring.indexOf("Date(") > -1)
        {
            var date = new Date(parseInt(datestring.replace(/^\/Date\((.*?)\)\/$/, "$1"), 10));
            var y = new JalaliDate(date).getFullYear(),
                m = new JalaliDate(date).getMonth(),
                d = new JalaliDate(date).getDate();
            return new JalaliDate(y, m , d);
        }
        else{
            var y = parseInt(datestring.substring(0, 4)),
            m = parseInt(datestring.substring(5, 7)),
            d = parseInt(datestring.substring(8, 10));
            return new JalaliDate(y, m - 1 , d);
        }

    } catch (e) {
        return new JalaliDate(1300, 1, 1)
    }

}