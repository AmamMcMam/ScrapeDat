const axios = require('axios').default;
var HTMLParser = require('node-html-parser');

function scrape()
{
    axios.get('https://www.argos.co.uk/product/2078274')
    .then(function (response) {
        var root = HTMLParser.parse(response.data);
        var creditCard = root.querySelector('#credit-card-link');
        var price = creditCard.parentNode.firstChild.childNodes[1].childNodes[1].text;

        sendText('your product price is: ' + price);
    })
}

function sendText(textMessage)
{
    var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
    var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
    var fromNumber = process.env.FROM_NUMBER;
    var toNumber = process.env.TO_NUMBER;

    const client = require('twilio')(accountSid, authToken);

    client.messages
          .create({body: textMessage, from: fromNumber, to: toNumber})
          .then(message => console.log(message.sid));
}

scrape();
