function HijriDate() {
	function intPart(floatNum){
		if (floatNum< -0.0000001){
			 return Math.ceil(floatNum-0.0000001)
			}
		return Math.floor(floatNum+0.0000001)	
	}

	function chrToIsl(y,m,d) {		
		if ((y>1582)||((y==1582)&&(m>10))||((y==1582)&&(m==10)&&(d>14))){
			jd=intPart((1461*(y+4800+intPart((m-14)/12)))/4)+intPart((367*(m-2-12*(intPart((m-14)/12))))/12)-
			intPart( (3* (intPart(  (y+4900+    intPart( (m-14)/12)     )/100)    )   ) /4)+d-32075
		}else{
			jd = 367*y-intPart((7*(y+5001+intPart((m-9)/7)))/4)+intPart((275*m)/9)+d+1729777
		}
							
		l=jd-1948440+10632
		n=intPart((l-1)/10631)
		l=l-10631*n+354
		j=(intPart((10985-l)/5316))*(intPart((50*l)/17719))+(intPart(l/5670))*(intPart((43*l)/15238))
		l=l-(intPart((30-j)/15))*(intPart((17719*j)/50))-(intPart(j/16))*(intPart((15238*j)/43))+29
		m=intPart((24*l)/709)
		d=l-intPart((709*m)/24)
		y=30*n+j-30

		return [y,m,d];
	}
	
	function islToChr(y,m,d) {		
		jd=intPart((11*y+3)/30)+354*y+30*m-intPart((m-1)/2)+d+1948440-385
		
		if (jd > 2299160){
			l=jd+68569
			n=intPart((4*l)/146097)
			l=l-intPart((146097*n+3)/4)
			i=intPart((4000*(l+1))/1461001)
			l=l-intPart((1461*i)/4)+31
			j=intPart((80*l)/2447)
			d=l-intPart((2447*j)/80)
			l=intPart(j/11)
			m=j+2-12*l
			y=100*(n-49)+i+l
		}else{
			j=jd+1402
			k=intPart((j-1)/1461)
			l=j-1461*k
			n=intPart((l-1)/365)-intPart(l/1461)
			i=l-365*n+30
			j=intPart((80*i)/2447)
			d=i-intPart((2447*j)/80)
			i=intPart(j/11)
			m=j+2-12*i
			y=4*k+n+i-4716
		}

		return [y,m,d];
	}	
	
    this.hijriToGregorian = function (h_y, h_m, h_d) {
        return islToChr(h_y, h_m, h_d);
    }
	
    this.gregorianToHijri = function (g_y, g_m, g_d) {		
        return chrToIsl(g_y, g_m, g_d);
    }

    this.checkDate = function (j_y, j_m, j_d) {
        return !(j_y < 0 || j_m < 1 || j_m > 12 || j_d < 1 || j_d > 31);
    }

    this.setHijri = function () {
        this.hijridate = this.gregorianToHijri(this.gregoriandate.getFullYear(), this.gregoriandate.getMonth() + 1, this.gregoriandate.getDate());
        this.hijridate[1]--;
    }

    this.getDate = function () {
        return this.hijridate[2];
    }

    this.getDay = function () {
        return this.gregoriandate.getDay();
    }

    this.getFullYear = function () {
        return this.hijridate[0];
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
        return this.hijridate[1];
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
        var diff = -1 * (this.hijridate[2] - day);
        var g = this.gregoriandate.setDate(this.gregoriandate.getDate() + diff);
        this.gregoriandate.setHours(0, 0, 0, 0);
        this.setHijri();
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

        var j = this.hijriToGregorian(y, m + 1, d);
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
            this.setHijri();
        }
        else
            this.hijridate = [y, m, d];

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

        this.setHijri();
        return retval;
    }

    this.setMilliseconds = function (m) {
        var retval = this.gregoriandate.setMilliseconds(m);
        this.setHijri();
        return retval;
    }

    this.setMinutes = function (m) {
        var retval = this.gregoriandate.setMinutes(m);
        this.setHijri();
        return retval;
    }

    this.setMonth = function (month, day) {
        var y = this.hijridate[0];
        var m = parseInt(month);
        var d = this.hijridate[2];

        if (isNaN(day) == false)
            d = parseInt(day);

        return this.setFullYear(y, m, d);
    }

    this.setSeconds = function (s, m) {
        var retval = this.gregoriandate.setSeconds(s, m);
        this.setHijri();
        return retval;
    }

    this.setTime = function (m) {
        var retval = this.gregoriandate.setTime(m);
        //this.gregoriandate.setHours(1, 0, 0, 0);
        this.setHijri();
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
        return this.hijridate[0] + "/" + this.hijridate[1] + "/" + this.hijridate[2];
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
    else if (arguments.length == 1 && typeof (arguments[0]) === "HijriDate") {
        this.gregoriandate = arguments[0].gregoriandate;
    }
    else {
        debugger;
    }

    this.setHijri();

}
/*
HijriDate.parse = function (datestring) {
    var y = parseInt(datestring.substring(0, 4));
    var m = parseInt(datestring.substring(5, 7));
    var d = parseInt(datestring.substring(8, 10));

    return new HijriDate(y, m-1, d);
}
*/

HijriDate.parse = function (datestring) {
    try {
        if ("string" != typeof datestring)
        {
            datestring = datestring.toString();
        }

        if (datestring.indexOf("Date(") > -1)
        {
            var date = new Date(parseInt(datestring.replace(/^\/Date\((.*?)\)\/$/, "$1"), 10));

            var y = new HijriDate(date).getFullYear(),
                m = new HijriDate(date).getMonth(),
                d = new HijriDate(date).getDate();

            return new HijriDate(y, m , d);
        }
        else{
            var y = parseInt(datestring.substring(0, 4)),
            m = parseInt(datestring.substring(5, 7)),
            d = parseInt(datestring.substring(8, 10));
			
            return new HijriDate(y, m - 1 , d);
        }
    } catch (e) {
        return new HijriDate(1400, 1, 1)
    }

}