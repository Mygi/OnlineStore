Nicole Jay [10:13 AM]
i think we discussed putting the bank deets over with the shop settings, is that in your current local version or still tbd?

AG [10:14 AM]
Aah. I still have banking details there. I wasn’t sure if the Buyer provides banking details.

Nicole Jay [10:14 AM]
i also think updating passwords should be a separate functionality outside of saving other general data, maybe i can discuss with @Luke a good way to segment the data so only relevant data gets posted on save/update
yeah theres no need for a buyer to provide banking deets

AG [10:15 AM]
Cool. I have the banking as a specialisation of user data - but I’ll shift it over to shop. The component for update password and banking are separate so moving them isn’t a hassle.

Nicole Jay [10:16 AM]
yeah the bank details in the db are associated to a shop id, which is then associated to a user id, so there is no direct user -> bank details relationship, but not a massive drama

AG [10:16 AM]
Should the user have to enter their password again before updating banking details?

Nicole Jay [10:17 AM]
it would be a nice added layer of security for sure.. like github make you re-authenticate before managing who has access to your repos

AG [10:18 AM]
Yeah. I can lock the data and send a login (password only) modal before the form becomes editable.

Nicole Jay [10:18 AM]
perfect
lets also chuck a birthday field in there so we can use that to offer birthday coupons later down the track
in the user settings that is

AG [10:20 AM]
Ok cool.

Nicole Jay [10:20 AM]
could probably just go on the same line as "phone" @Luke what do you think?
and "my address" can be changed to "personal details"
or something similar

AG [10:21 AM]
Also maybe let me know the work flow for password update. Like email an update link/ two phase authentication/or otherwise.

Nicole Jay [10:22 AM]
yeah so the outside of authentication password update currently has the confirmation email

Luke [10:22 AM]
yeah for sure, we could do a datepicker field, probably would need to sit under "my details" though
sorry i didnt read all of that

Nicole Jay [10:23 AM]
but if you're authenticated you just have to confirm your password, not sure if we need to get a confirmation email, but maybe its necessary for this platform

AG [10:24 AM]
Ok. So should I be created a “forgot password” link on the public login page (with a link to a forgot password form)?

Nicole Jay [10:26 AM]
yeah, and that form will ask you for your email address, and then you'd send that to the api, and if that email address exists, the confirmation link will get sent to that email address, the link will actually be a link to the api domain and will redirect to the frontend "update password" form with a confirmation key.. i have an environment variable that can be used to define the front end url for the last step of the process (edited)

AG [10:28 AM]
OK cool. So I’m assuming some encrypted string is attached to the URL, checked by the API and if valid - redirects to the front-end. Does it also redirect “On Fail”?

Nicole Jay [10:29 AM]
yeah thats right, it will redirect on fail to so there would just be a front end page that handles bad requests?
it could be generic, or could be a specific password update fail page
which ever

AG [10:30 AM]
A  page for any http failure may be easier and I can change the error message based on the http error code.

Nicole Jay [10:30 AM]
yeah thats what i was thinking

AG [10:31 AM]
When you send the user to the update password page - do you pass me some sort of token to send with the password update request?
I could add a slug to that url and pass it via the service.

Nicole Jay [10:32 AM]
yeah thats right, the token i send to the front end has to be returned to the api with the updated password

AG [10:33 AM]
Is that available in the Referring URL or in the header?

Nicole Jay [10:35 AM]
so on redirect, lets say its www.thefinderskeepersmarketplace.com/password-reset/email/test@test.com/token/bbd8e5a89d514a7276feb8aa9407e925dba298833db2de664ca88c458f9706af/.. i am expecting the value for email, and the value for token as post values in the password update endpoint, along with the updated password, and a password confirm that matches password (validation check)

AG [10:36 AM]
Ok cool.

Nicole Jay [10:36 AM]
it'll probably be password-reset-confirm, password-reset will be the initial page to trigger th