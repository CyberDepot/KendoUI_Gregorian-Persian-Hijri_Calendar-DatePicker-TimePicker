# KendoUI Gregorian,Persian,Hijri(Islamic) Calendar, DatePicker, TimePicker
تقویم شمسی، قمری و میلادی به همراه انتخاب گر تاریخ و زمان


![screenshot](https://user-images.githubusercontent.com/11265147/42736280-5053ee9a-8879-11e8-86d1-e4bf5bde46f7.png)

- #### this Project is a Fork From: https://github.com/MahdiNosratian/KendoUI-Persian-Calendar
- This Poject Need jQuery And kendo UI

### How Can Use This?

### Head:
```
<head>
  <title></title>	
  <link href="http://cdn.kendostatic.com/2018.1.221/styles/kendo.common.min.css" rel="stylesheet" />
  <link href="http://cdn.kendostatic.com/2018.1.221/styles/kendo.default.min.css" rel="stylesheet" />

  <script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>

  <script src="JalaliDate.js"></script>
  <script src="HijriDate.js"></script>

  <script src="kendo.web.js"></script>

  <script src="fa-IR.js"></script>
  <script src="kendo.calendar.fa.js"></script>
  <script src="kendo.datepicker.fa.js"></script>

  <script src="ar-SA.js"></script>
  <script src="kendo.calendar.ar.js"></script>
  <script src="kendo.datepicker.ar.js"></script>
</head>
```

### Body Code:

```
<body>
  <div style="display: inline-block;">
    <div id="calendar"></div>
    <div id="calendarShamsi"></div>
    <div id="calendarHijri"></div>
  </div>

  <div style="vertical-align: top; display: inline-block;">
    <input id="datepicker" value="2018/07/15" style="width:150px;" /><br/><br/>
    <input id="datepickerShamsi" value="1397/04/24" style="width:150px;" /><br/><br/>
    <input id="datepickerHijri" value="1439/11/02" style="width:150px;" /><br/><br/>
  </div>

  <div style="vertical-align: top; display: inline-block;">
    <input id="timepicker" value="16:00" style="width:150px;" /><br/><br/>
    <input id="timepickerShamsi" value="16:00" style="width:150px;" /><br/><br/>
    <input id="timepickerHijri" value="16:00" style="width:150px;" /><br/><br/>
  </div>
<body>
```

### And Finally Script!
```
<script>
    $(document).ready(function () {
      $("#datepicker").kendoDatePicker({culture: "en-US"});
      $("#datepickerShamsi").kendoDatePickerShamsi({culture: "fa-IR"});
      $("#datepickerHijri").kendoDatePickerHijri({culture: "ar-SA"});

      $("#calendar").kendoCalendar({culture: "en-US"});
      $("#calendarShamsi").kendoCalendarShamsi({culture: "fa-IR"});
      $("#calendarHijri").kendoCalendarHijri({culture: "ar-SA"});

      $("#timepicker").kendoTimePicker({culture: "en-US"});
      $("#timepickerShamsi").kendoTimePicker({culture: "fa-IR"});
      $("#timepickerHijri").kendoTimePicker({culture: "ar-SA"});
    });
</script>
```

### For more information please check ```sample.html```

با برنامه نویسان مهربان باشیم

[![pay](https://user-images.githubusercontent.com/11265147/42736629-132c13d0-887e-11e8-98be-b2cb96228e57.png)
](https://www.payping.ir/kitcat)
