const request = require('request');
var url = require('url');
var moment = require('moment');
var schedule = require('node-schedule');
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
  rule.minute = 30;
  getRequest();
});

function presentHour() {
  var currentHour = moment.utc('00:00', 'hh:mm').format('YYYY-MM-DD-hh-00');
}

function previousHour() {
  var lastHour = moment.utc('00:00', 'hh:mm').subtract(1, 'hour').format('YYYY-MM-DD-hh-00');
}

function getRequest() {
  let link = "https://21sgrosbv7.execute-api.ap-southeast-1.amazonaws.com/cookie1?token_value=Chdhhd3Fsh5887ShjhA200Rr&amp;amp;start_date=" + previousHour() + "&amp;amp;end_date=" + presentHour() + "&amp;amp";
  request(link, function(err, response, body) {
    if (err) {
      console.log(err);
    } else {
      let data = JSON.parse(body);
      FormationOfPayload(data);
    }

  });
}

function FormationOfPayload(data) {
  data.forEach(function(object) {
    payLoadObject.set('cid', object.cookie_id);
    payLoadObject.set('cd1', object.b1_AccountId);
    payLoadObject.set('cd2', object.last_event_ts);
    payLoadObject.set('cd3', object.visit_count);
    payLoadObject.set('cd4', object.page_count);
    payLoadObject.set('cd5', object.exit_page_url);
    payLoadObject.set('cd6', object.active_time);
    payLoadObject.set('cd7', object.passive_time);
    payLoadObject.set('cd8', object.click_count);
    payLoadObject.set('cd9', object.click_engagement);
    payLoadObject.set('cd10', object.scroll_time);
    payLoadObject.set('cd11', object.scroll_attention_time);
    payLoadObject.set('cd12', object.hover_attention_time);
    payLoadObject.set('cd13', object.hover_time);
    payLoadObject.set('cd14', object.hover_engagement_time);
    payLoadObject.set('cd15', object.eng_score);
    payLoadObject.set('cd16', object.eng_score_norm);
    payLoadObject.set('cd17', object.key_exposure_content);
    payLoadObject.set('cd18', object.key_engagement_content);
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
