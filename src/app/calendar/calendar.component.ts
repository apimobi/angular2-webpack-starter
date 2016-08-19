import { Component } from '@angular/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Calendar`');

@Component({
  selector: 'calendar',
  styles: [
  `

  `],
  template:  require ('./calendar.html')
  // `
  //   <h1>Calendar</h1>
  //   <div>
  //     For hot module reloading run
  //     <pre>npm run start:hmr</pre>
  //   </div>
  //   <div>
  //     <h3>
  //       patrick@AngularClass.com
  //     </h3>
  //   </div>
  // `
})
export class Calendar {

  today:Date;
  days:Array<Object> = [];
  month:String;
  year:Number;
  lastDayMonth:Number;
  tab_month:Array<String> = ['January', 'February',  'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {

  }

  ngOnInit() {
    console.log('hello `Calendar` component');

    this.initCalendar('2016/07/12');

  }

  initCalendar(updateDate)
  {
      this.days = [];

      this.today = new Date(updateDate);
      this.month = this.tab_month[this.today.getMonth()];
      this.year = this.today.getFullYear();

      var lastd;
      var firstd;

      firstd = new Date(this.year.valueOf(), this.today.getMonth(), 1);

      console.log(firstd.getDay());
      console.log(firstd.getDate());
      console.log(this.tab_month[firstd.getMonth()]);

      var diff = firstd.getDay();
      var d : any = {};
      var i = 0;
      console.log(diff);
      if(diff>0)
      {
        lastd = new Date(this.year.valueOf(), this.today.getMonth()-1, 0);
        this.lastDayMonth = lastd.getDate();
        for(i=this.lastDayMonth-diff+1; i<this.lastDayMonth; i++)
        {
          console.log(i);
          d = {};
          var date =  new Date(this.year.valueOf(), this.today.getMonth()-1, i);
          d.day = date.getDay();
          d.date = date.getDate();
          d.month = this.tab_month[date.getMonth()];
          d.year = date.getFullYear();
          this.days.push(d);
        }
      }

      i = 1;
      lastd = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
      this.lastDayMonth = lastd.getDate();
      console.log(">>> lastDay month "+this.lastDayMonth);
      console.log(">>> lastDay month "+lastd.getMonth());
      for(i=1; i<=this.lastDayMonth; i++)
      {
        d = {};
        // product.destinations = [];
        var date =  new Date(this.year.valueOf(), this.today.getMonth(), i);
        d.day = date.getDay();
        d.date = date.getDate();
        d.month = this.tab_month[date.getMonth()];
        d.year = date.getFullYear();
        this.days.push(d);
      }

    console.log(this.days);
  }

  updateCalendar(id)
  {
     console.log('ouiiiiiiiiii '+id);
     this.initCalendar('2016/'+(id+1)+'/1');
  }

  getClassRow(value, id)
  {

      console.log('modulo'+(id%6));
      if(id%7 == 0 && id != 0) return true;
      else return false;


  }


}
