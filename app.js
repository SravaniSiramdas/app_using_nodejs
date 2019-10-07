const request = require('request');
var url = require('url');
var moment = require('moment');
var schedule = require('node-schedule');
let link = "https://21sgrosbv7.execute-api.ap-southeast-1.amazonaws.com/cookie1?token_value=Chdhhd3Fsh5887ShjhA200Rr&amp;amp;start_date=" + previousHour() + "&amp;amp;end_date=" + presentHour() + "&amp;amp";


let payLoadObject = new URLSearchParams({
  "v": "1",
  "tid": "UA-147234783-1",
  "t": "event",
  "ec": "crm",
  "ea": "update",
  "el": "intent",
});

var rule = new schedule.RecurrenceRule();
var j = schedule.scheduleJob(rule, function() {
  rule.minute = 20;
  getRequest();
});

function presentHour() {
  var currentHour = moment.utc('00:00', 'hh:mm').format('YYYY-MM-DD-hh-00');
}

function previousHour() {
  var lastHour = moment.utc('00:00', 'hh:mm').subtract(1, 'hour').format('YYYY-MM-DD-hh-00');
}

function getRequest() {
  request(link, function(err, response, body) {
    if (err) {
      console.log(err);
    } else {
      let data = JSON.parse(body);
      if(data === NULL){
        payLoad = "NO DATA";
        sendPostRequest(payLoad);
      }
      else
      FormationOfPayload(data);
    }

  });
}

function FormationOfPayload(data) {
  data.forEach(function(object) {
    payLoadObject.append('cid', object.cookie_id);
    payLoadObject.append('cd1', object.b1_AccountId);
    payLoadObject.append('cd2', object.last_event_ts);
    payLoadObject.append('cd3', object.visit_count);
    payLoadObject.append('cd4', object.page_count);
    payLoadObject.append('cd5', object.exit_page_url);
    payLoadObject.append('cd6', object.active_time);
    payLoadObject.append('cd7', object.passive_time);
    payLoadObject.append('cd8', object.click_count);
    payLoadObject.append('cd9', object.click_engagement);
    payLoadObject.append('cd10', object.scroll_time);
    payLoadObject.append('cd11', object.scroll_attention_time);
    payLoadObject.append('cd12', object.hover_attention_time);
    payLoadObject.append('cd13', object.hover_time);
    payLoadObject.append('cd14', object.hover_engagement_time);
    payLoadObject.append('cd15', object.eng_score);
    payLoadObject.append('cd16', object.eng_score_norm);
    payLoadObject.append('cd17', object.key_exposure_content);
    payLoadObject.append('cd18', object.key_engagement_content);
    console.log(payLoadObject.toString());
    sendPostRequest(payLoadObject.toString());
  });
}


function sendPostRequest(payLoad) {
  request.post(postLink+payLoad, {

  }, (error, res, body) => {
    if (error) {
      console.error(error)
      return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body);
  });
}
