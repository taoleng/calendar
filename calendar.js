/**
* created by Lee on 2019/1/9 12:07
*/

!(function(){
	//必要的数据
  //今天的年 月 日 ；本月的总天数；本月第一天是周几？？？
  var year = 0;
  var month = 0;
  var today = 0;
  var hasFestival = ""; //当天是否有节日
  function run(n) {
    var oDate = new Date(); //定义时间
    oDate.setMonth(oDate.getMonth() + n); //设置月份
    year = oDate.getFullYear(); //年
    month = oDate.getMonth(); //月
    today = oDate.getDate(); //日

    //公历节日
    var gregorianFestivals = {
      '0101': '元旦',
      '0214': '情人节',
      '0308': '妇女节',
      '0312': '植树节',
      '0401': '愚人节',
      '0501': '劳动节',
      '0504': '青年节',
      '0512': '护士节',
      '0601': '儿童节',
      '0701': '建党节',
      '0801': '建军节',
      '0910': '教师节',
      '1001': '国庆节',
      '1224': '平安夜',
      '1225': '圣诞节',
    };

    var lunarFestivals = {
      '腊月三十': '除夕',
      '正月初一': '春节',
      '正月十五': '元宵节',
      '五月初五': '端午节',
      '七月初七': '七夕节',
      '八月十五': '中秋节',
      '九月初九': '重阳节',
    }



    //计算本月有多少天
    var allDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];

    //判断闰年
    if (month == 1) {
      if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        allDay = 29;
      }
    }

    //判断本月第一天是星期几
    oDate.setDate(1); //时间调整到本月第一天
    var week = oDate.getDay(); //读取本月第一天是星期几

    //插入空白
		var list =[]
    for (var b = 0; b < week; b++) {
    	list.push({
    		festival:"",
      	num:"",
      	calendar:"",
      	cls:"",
      	date:""
    	})
    }

    //日期插入到dateList
    for (var i = 1; i <= allDay; i++) {
      hasFestival = "";
      var cal = festivalView(getLunarCalendar(i),month + 1,i)
      var item = {
      	festival:hasFestival,
      	num:i,
      	calendar:cal,
      	cls:"",
      	date:year + "-" + (month + 1) + "-"+i
      }
      if (n == 0) {
        if (i < today) {
          item.cls = 'gray'
        } else if (i == today) {
          item.cls = "pink"
          item.today = '今天'
        } else if ((i+week-1) % 7 == 0 || (i+week-1) % 7 == 6) {
          item.cls = 'weekend'
        }
      } else if (n < 0) {
        item.cls = 'gray'
      } else if ((i+week-1) % 7 == 0 || (i+week-1) % 7 == 6) {
        item.cls = 'weekend'
      }
      list.push(item)
    }
    /**
     * 获取农历
     */
    function getLunarCalendar(date) {
      let detail = dateDetail({
        'timeStamp': new Date(year, month, date).getTime()
      }).aL.lunarCalendar;
      // return [detail.slice(0, 2),detail.slice(2, 4)]
      return detail
    }
    /**
     * 获取当日是否是农历假日
     */
    function festivalView(lunarCalendar,month,date) {
      if(Object.keys(lunarFestivals).indexOf(lunarCalendar) != -1) {
        hasFestival = lunarFestivals[lunarCalendar]
        return lunarFestivals[lunarCalendar]
      } else {
        let day = ( month > 9 ? month + '' : "0" + month) + ( date > 9 ? date + '' : "0" + date);
        if(Object.keys(gregorianFestivals).indexOf(day) != -1) {
          hasFestival = gregorianFestivals[day]
          return gregorianFestivals[day]
        }else {
          return lunarCalendar.slice(2, 4)
        }
      }
    }
    
    return {
	  	title:year + "年" + (month + 1) + "月",
	  	list:list
	  }
	}
  window.calendar = run
})();
  
    

  

