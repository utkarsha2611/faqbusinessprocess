// JavaScript source code
//fdsffsfds
var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
// Listen for any activity on port 3978 of our local server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
// If a Post request is made to /api/messages on port 3978 of our local server, then we pass it to the bot connector to handle
server.post('/api/messages', connector.listen());
//session.sendTyping();
//=========================================================
// Bots Dialogs
//=========================================================

// This is called the root dialog. It is the first point of entry for any message the bot receives
/*bot.dialog('/', function (session) {
    // Send 'hello world' to the user
    session.send("Hello World");
});*/

// connecting with LUIS
var luisRecognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/b51de4d2-2a91-49f1-8436-8a1de6d469d7?subscription-key=7c029b229e924655a57eb8afe6dc990a&staging=true&timezoneOffset=0&verbose=true&q=');
var intentDialog = new builder.IntentDialog({ recognizers: [luisRecognizer] });
bot.dialog('/', intentDialog);

intentDialog.matches(/\b(hi|hello|hey|howdy|what's up|anyone there|wassup|yo)\b/i, '/sayHi') //Check for greetings using regex
    .matches('Print', '/print') //Check for LUIS intent to get definition
    .matches('DefineMyPayslip', '/define') //Check for LUIS intent to get definition
    .matches('WhyIntroduced', '/reason') //Check for LUIS intent to answer why it was introduced
    .matches('LoginCredentials', '/login') //Check for LUIS intent to answer why it was introduced
    .matches('Access', '/access') //Check for LUIS intent to answer how to access it
    .matches('Difference', '/differ') //Check for LUIS intent to answer how is it different from SAP 
    .matches('Look', '/look') //Check for LUIS intent to answer what it looks like
    .matches('Effect', '/effect') //Check for LUIS intent to answer how it affects pay
    .matches('Duration', '/long') //Check for LUIS intent to answer how it affects pay
    .matches('Security', '/secure') //Check for LUIS intent to answer how it affects pay
    .matches('HomeAccess', '/home') //Check for LUIS intent to answer how it affects pay
    .matches('IncorrectDetails', '/incorrect') //Check for LUIS intent to answer how it affects pay
    .matches('NewSoftware', '/software') //Check for LUIS intent to answer how it affects pay
    .matches('MonthlyView', '/month') //Check for LUIS intent to answer how it affects pay
    .matches('PCPhoneView', '/otherDevice') //Check for LUIS intent to answer how it affects pay
    .matches('Often', '/often') //Check for LUIS intent to answer how it affects pay
    .matches('Faults', '/fault') //Check for LUIS intent to answer how it affects pay
    .matches('Backup', '/backup') //Check for LUIS intent to answer how it affects pay
    .matches('Viewing', '/view') //Check for LUIS intent to answer how it affects pay
    .matches('lock', '/lock') //Check for LUIS intent to answer how it affects 
    .matches('ExpiredSession', '/inactive') //Check for LUIS intent to answer how it affects 
    .matches('CannotAccess', '/cannot') //Check for LUIS intent to answer how it affects
    .matches('SupportedDevices', '/support') //Check for LUIS intent to answer how it affects 
    .onDefault(builder.DialogAction.send("Sorry, I didn't understand what you said.")); //Default message if all checks fail

bot.dialog('/print', function (session) {
    session.send('Yes, MyPayslips can be printed in the same way that you would print any other document when using a pdf viewer. Simply select the print icon in the pdf viewer, which will appear above ');
    session.endDialog();
});

bot.dialog('/sayHi', function (session) {
    session.send('Hi there! Try saying things like "What is MyPayslip?"');
    session.endDialog();
});

bot.dialog('/support', function (session) {
    session.send('Mobile devices on Apple OS iOS version 8 and above; Android OS version 4.4 and above.');
    session.endDialog();
});

bot.dialog('/inactive', function (session) {
    session.send('Your session has expired due to inactivity for 15 minutes, please re-login to access your payslip. ');
    session.endDialog();
});

bot.dialog('/lock', function (session) {
    session.send('Your ID will be lock after 3 tries. Please request a fellow colleague to help assist with Self Service Unlock of Windows ID via http://pru-sats.satsnet.com.sg/Home.aspx.  Reset of windows password can only be done via SATS Intranet. ');
    session.endDialog();
});

bot.dialog('/cannot', function (session) {
    session.send('You can either access MyPayslip via https://sap.sats.com.sg or if you are still unable to access, please contact SMITH SATS Helpdesk @ SMITH@sats.com.sg or 1800 2255773 ');
    session.endDialog();
});

bot.dialog('/view', function (session) {
    session.send('No. You will still be paid regardless of whether or not you have viewed your payslip. However, it is recommended that all staff view their payslips on a regular basis, to check that payments and deductions are correct.');
    session.endDialog();
});

bot.dialog('/backup', function (session) {
    session.send('Yes. All MyPayslips, will be backed-up on a regular basis.');
    session.endDialog();
});
bot.dialog('/otherDevice', function (session) {
    session.send('Yes, MyPayslips can be accessed via iOS or Android mobile phone that is connected to the internet.');
    session.endDialog();
});
bot.dialog('/fault', function (session) {
    session.send('Yes. You will still get paid even if, due to technical problems, you can�t access your MyPayslip.');
    session.endDialog();
});

bot.dialog('/often', function (session) {
    session.send('As often as you like.');
    session.endDialog();
});

bot.dialog('/home', function (session) {
    session.send('Yes, you can access your MyPayslip link from any mobile device by logging via SATS HC mobile: https://www.sats.com.sg/documents/sats_mob/sats-Mobile.html. As with any confidential information, it is recommended that caution is exercised when using shared computers, or computers in shared offices or public areas.');
    session.endDialog();
});


bot.dialog('/incorrect', function (session) {
    session.send('If you wish to query any part of your Payslip please contact your line admin or payroll to check on the details.');
    session.endDialog();
});

bot.dialog('/look',
    function (session) {
        session.send("The layout of the MyPayslip is the same as your current SAP Employee Self Service(ESS) payslip.");
        session.endDialog();
    }
);

bot.dialog('/define', 
  function (session) {
      session.send("MyPayslip is for staff to view their payslip online on their computer screen, mobile phones and other internet enabled devices.");
      session.endDialog();
  }
);

bot.dialog('/reason',
    function (session) {
        session.send("MyPayslips have been introduced to foster easy, faster and improved access to pay information.MyPayslips provide several advantages to staff including: - They can be accessed quickly and easily from any computer or mobile devices with internet access. MyPayslips helps SATS to meet its commitment to making Staff's payslips readily available, effectively serve SATSs' staff, and correct some of the logistics challenges faced with delivery of payslip as not all staff have access to a desktop or laptop in SATS.");
     session.endDialog();
    }
);

bot.dialog('/login',
    function (session) {
        session.send("You will be using your Windows user ID and password to login to MyPayslip. This is the same Windows ID which you use for logging in SATS PC.");
        session.endDialog();
    }
);

bot.dialog('/access',
    function (session) {
        session.send("MyPayslip link can be accessed via SATS HC mobile:www.bit.ly/satsmobile. Enter your Windows User ID and Password to login to view your payslips.");
        session.endDialog();
    }
);

bot.dialog('/differ',
    function (session) {
        session.send("The content of the MyPayslip is the same as SAP Employee Self Service(ESS) payslip.");
        session.endDialog();
    }
);



bot.dialog('/effect',
    function (session) {
        session.send("No, the MyPayslip is simply an alternative way that you receive notification of your pay. Your pay will still be transferred directly into your bank account or your existing method of payment. It does not in anyway affect the amount you receive as your pay.");
        session.endDialog();
    }
);

bot.dialog('/long',
    function (session) {
        session.send("You will be able to access your most recent 6 months of payslip via MyPayslip. All payslips can still be found in SAP Employee Self Service(ESS).");
        session.endDialog();
    }
);

bot.dialog('/secure',
    function (session) {
        session.send("MyPayslips link will be accessed via SATS HC mobile:www.bit.ly / satsmobile, which is extremely secure.However, as with any confidential information, it is recommended that caution is exercised when accessing or printing MyPayslips using mobile device and printers; or computers and printers in shared offices or public areas.MyPayslip will perform an automatic log off if the system has been idle for more than 15 minutes.However, you are advised to take the following security precautions: (1) Don't leave your office with your computer still logged on to MyPayslip, either log off, or lock the computer (2) Don't share your password with anyone   (3) Change your password if you think your security is in danger of being breached.");
        session.endDialog();
    }
);


bot.dialog('/software',
    function (session) {
        session.send("No. However, if you want to save your payslip on your mobile device, then you will need to export out as PDF.");
        session.endDialog();
    }
);

bot.dialog('/month',
    function (session) {
        session.send("Payslips will normally be available as soon as Salary reports are processed and loaded, this remains the same as current SAP Employee Self Service(ESS) payslip.");
        session.endDialog();
    }
);