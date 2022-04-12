import dayjs from "dayjs";
Vue.prototype.$dayjs = dayjs;

// 转换日期格式
export function formatTimeRange(type, val) {
    /*
     * type 1、自定义  2、周  3、月  4、年
     * val  值
     */
    if (!val) {
        return false;
    }
    let start = "";
    let end = "";
    if (type === 1) {
        start = val[0];
        end = val[1];
    } else if (type === 2) {
        let week = dayjs(val).day();
        if (week === 1) {
            end = dayjs(val)
                .add(5, "day")
                .format("YYYY-MM-DD");
            start = dayjs(val)
                .subtract(1, "day")
                .format("YYYY-MM-DD");
        } else {
            end = dayjs(val)
                .add(2, "day")
                .format("YYYY-MM-DD");
            start = dayjs(val)
                .subtract(4, "day")
                .format("YYYY-MM-DD");
        }
    } else if (type === 3) {
        start = val;
        let day = dayjs(val).daysInMonth();
        end = dayjs(val)
            .add(day - 1, "day")
            .format("YYYY-MM-DD");
    } else if (type === 4) {
        let year = dayjs(val)
            .add(1, "year")
            .format("YYYY-MM-DD");
        start = val;
        end = dayjs(year)
            .subtract(1, "day")
            .format("YYYY-MM-DD");
    }
    return [start, end];
}

export function initTime(type) {
    if (type === 2) {
        let x = dayjs().day();
        return dayjs(dayjs().format("YYYY-MM-DD"))
            .subtract(x - 1, "day")
            .format("YYYY-MM-DD");
    } else if (type === 3) {
        let month =
            dayjs().month() > 8 ? dayjs().month() + 1 : "0" + (dayjs().month() + 1);
        return dayjs().year() + "-" + month + "-01";
    } else if (type === 4) {
        return dayjs().year() + "-01-01";
    }
}

data() {
  dateValue: [
    this.$dayjs().format("YYYY-MM-DD"),
    this.$dayjs().format("YYYY-MM-DD")
  ],
}

mounted() {
  this.dateValue2 = initTime(2);
  this.dateValue3 = initTime(3);
  this.dateValue4 = initTime(4);
},
  
let value = "";
if (this.selectTime === 1) {
  value = this.dateValue;
} else if (this.selectTime === 2) {
  value = this.dateValue2;
} else if (this.selectTime === 3) {
  value = this.dateValue3;
} else if (this.selectTime === 4) {
  value = this.dateValue4;
}

let date = formatTimeRange(this.selectTime, value);
