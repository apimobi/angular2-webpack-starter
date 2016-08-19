import { Component } from '@angular/core';

declare const FB:any;


console.log('`Account`');

@Component({
  selector: 'account',
  styles: [
  `

  `],
  template:  require ('./account.html')
})
export class Account {

  
  constructor() {
      console.log("constructor FB init");  
      FB.init({
            appId      : '1058892964177610',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
      });

  }

  ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
  }

  onFacebookLoginClick() {
        console.log("onFacebookLoginClick");
        FB.login(this.callBackLogin,
                {scope: 'public_profile,email,user_likes,user_friends,user_events,user_location,rsvp_event,user_groups'});
    }

  statusChangeCallback(resp) {
        console.log("statusChangeCallback"+resp.status);    
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
        }else if (resp.status === 'not_authorized') {
            
        }else {
            
        }
  };

 callBackLogin(resp){
    console.log("callBackLogin"+resp);
 } 
    


}
