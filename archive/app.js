var gallery = [
	{alt:'', modal:'1', thumb_imgUrl:'/img/gallery/thumb/tmb_img1.jpg', full_imgUrl:'/img/gallery/full/full_img1.jpg'},
	{alt:'', modal:'2', thumb_imgUrl:'/img/gallery/thumb/tmb_img2.jpg', full_imgUrl:'/img/gallery/full/full_img2.jpg'},
	{alt:'', modal:'3', thumb_imgUrl:'/img/gallery/thumb/tmb_img3.jpg', full_imgUrl:'/img/gallery/full/full_img3.jpg'},
	{alt:'', modal:'4', thumb_imgUrl:'/img/gallery/thumb/tmb_img4.jpg', full_imgUrl:'/img/gallery/full/full_img4.jpg'},
	{alt:'', modal:'5', thumb_imgUrl:'/img/gallery/thumb/tmb_img5.jpg', full_imgUrl:'/img/gallery/full/full_img5.jpg'},
	{alt:'', modal:'6', thumb_imgUrl:'/img/gallery/thumb/tmb_img6.jpg', full_imgUrl:'/img/gallery/full/full_img6.jpg'},
	{alt:'', modal:'7', thumb_imgUrl:'/img/gallery/thumb/tmb_img7.jpg', full_imgUrl:'/img/gallery/full/full_img7.jpg'},
	{alt:'', modal:'8', thumb_imgUrl:'/img/gallery/thumb/tmb_img8.jpg', full_imgUrl:'/img/gallery/full/full_img8.jpg'},
	{alt:'', modal:'9', thumb_imgUrl:'/img/gallery/thumb/tmb_img9.jpg', full_imgUrl:'/img/gallery/full/full_img9.jpg'},
	{alt:'', modal:'10', thumb_imgUrl:'/img/gallery/thumb/tmb_img10.jpg', full_imgUrl:'/img/gallery/full/full_img10.jpg'},
	{alt:'', modal:'11', thumb_imgUrl:'/img/gallery/thumb/tmb_img11.jpg', full_imgUrl:'/img/gallery/full/full_img11.jpg'},
	{alt:'', modal:'12', thumb_imgUrl:'/img/gallery/thumb/tmb_img12.jpg', full_imgUrl:'/img/gallery/full/full_img12.jpg'}

];

var team = [
	{name: 'Daniel Pollock', imgUrl: '/img/team/daniel.png', twitter: 'dpollock', linkedin: 'dpollock68', github: 'dpollock', title: 'Developer', company: 'DataPath'},
	{name: 'Abby Sims', imgUrl: '/img/team/abby.png', twitter: 'abby_sims', linkedin: 'abbysims', github: 'asims', title: 'Owner/Developer', company: 'Idestini Dev Studio'},
	{name: 'Paul Gower', imgUrl: '/img/team/paul.png', twitter: 'paulmgower', linkedin: 'pmgower', github: 'pmgower', title: 'CTO, Kanban Coach', company: 'Aristotle, Inc.'},
	{name: 'Kyle Neumeier', imgUrl: '/img/team/kyle.png', twitter: 'kneumei', linkedin: 'kyle-neumeier-1270728', github: 'kneumei', title: 'Software Developer', company: 'CareEvolution'},
	{name: 'Schell Gower', imgUrl: '/img/team/schell.png', twitter: 'schellg', linkedin: 'schell-gower-8771769', title: 'Marketing Consultant', company: 'LunaMarketing'},
	{name: 'Michael Collins', imgUrl: '/img/team/michael.png', title: 'Developer', linkedin: 'michael-collins-37553570', github: 'michaeljeffreycollins', company: 'Arkansas Children\'s Hospital'},
	{name: 'Chris Steven', imgUrl: '/img/team/chris.png', twitter: 'chrissteven81', linkedin: 'chrissteven81', github: 'chrissteven81', title: 'Software Developer', company: 'Dassault Falcon Jet'},
	{name: 'Kate Wills', imgUrl: '/img/team/kate.jpg', twitter: 'KateWills501', linkedin: 'katewills501', github: 'KateWills501', title: 'Software Developer', company: 'Ingen Software'}
];


var speakers = JSON.parse(fs.readFileSync('speakers.json', 'utf8'));
var sponsors = JSON.parse(fs.readFileSync('sponsors.json', 'utf8'));
var times = {'1-1': '9:00 AM', '1-2': '10:00 AM', '1-3': '11:00 AM', '1-4':"1:30 PM", '1-5':"2:30 PM", '1-6':"3:30 PM",
			 '2-1': '8:30 AM', '2-2': '9:30 AM', '2-3': '10:30 AM', '2-4':"1:00 PM", '2-5':"2:00 PM", '2-6':"3:00 PM" };
var presentations = [];

speakers.forEach(function(speaker){
	speaker.slug = slugs(speaker.FirstName+'-'+speaker.LastName);
	var stats = fs.stat('public/'+speaker.Photo, function(err, stats){
		if(err){
			console.log(err);
			speaker.Photo = "/img/speakers/missing.png";
			presentations.Photo = speaker.Photo;
		}
	});
	speaker.Presentations.forEach(function (presentation) {
		presentation.SpeakerId = speaker.Id;
		presentation.SpeakerName = speaker.FirstName + " " + speaker.LastName;
		presentation.Photo = speaker.Photo;
		if (presentation.Day) {
			var timeId =  presentation.Day.toString() + "-" + presentation.SessionNumber;
			presentation.Time = times[timeId];
		}
		presentation.ElementId = "schedule_day"+presentation.Day+"_room"+_.kebabCase(presentation.Room,' ','_')+"_time"+presentation.SessionNumber;
		presentation.SpeakerSlug = speaker.slug;
		presentations.push(presentation);
	});
});

presentations = _.uniq(presentations, 'Topic');

[1,2].forEach(function(day){
	["1"].forEach(function(room){
		presentations.push({
			Day: day,
			Room: day === 1 ? "Ballroom D" : "Ballroom D",
			Topic:"Lunch",
			Description:day === 1 ? "Lunch will be catered by Tacos 4 Life and served at the Convention Center, in Ballroom D. A vegeterian option will be available. Feel free to find a cozy spot to eat and enjoy the weather in the H.U. Lee International Gate and Garden." : "Lunch will be catered by Eat My Catfish and served at the Convention Center, in Ballroom D. A vegeterian option will be available. Feel free to find a cozy spot to eat and enjoy the weather in the H.U. Lee International Gate and Garden.",
			SessionNumber:3.5,
			ElementId:day === 1 ? "schedule_day1_room1_timeLunch":"schedule_day2_room1_timeLunch",
			Time: day === 1? "12:00 PM" : "11:30 AM",
			IconClass : "fa fa-cutlery",
		});
	});
});

presentations.push({
	Day: 1,
	Room: "Ballroom A",
	Topic:"Opening Remarks",
	Description:"Opening Remarks",
	SessionNumber:0,
	ElementId:"schedule_day1_room1_timeopening",
	Time: "8:30 AM",
	IconClass : "fa fa-microphone",
});

presentations.push({
	Day: 1,
	Room: "Rivermarket Pavilion",
	Topic:"Attendee Party",
	Description:"Join us at River Market Pavilion for food, music, and fun. Shuttles are available to and from the Convention Center, starting at 5:30 PM.",
	SessionNumber:100,
	ElementId:"schedule_day1_room1_timeclosing",
	Time: "6:00 PM",
	IconClass : "fa fa-smile-o",
});

presentations.push({
	Day: 2,
	Room: "Ballroom D",
	Topic:"Closing Remarks and Prize Giveaway",
	Description:"Closing Remarks and Prize Giveaway",
	SessionNumber:7,
	ElementId:"schedule_day2_room1_timeclosing",
	Time: "4:00 PM",
	IconClass : "fa fa-gift",
});


var presenationsDay1 = _(presentations).filter({'Day': 1}).sortBy("SessionNumber", "Room").value();
var presenationsDay2 = _(presentations).filter({'Day': 2}).sortBy("SessionNumber", "Room").value();

var presenationsDay1Room1 = _(presentations).filter({'Day': 1, 'Room': "1"}).sortBy("SessionNumber").value();
var presenationsDay1Room2 = _(presentations).filter({'Day': 1, 'Room': "2"}).sortBy("SessionNumber").value();
var presenationsDay1Room3 = _(presentations).filter({'Day': 1, 'Room': "3"}).sortBy("SessionNumber").value();
var presenationsDay2Room1 = _(presentations).filter({'Day': 2, 'Room': "1"}).sortBy("SessionNumber").value();
var presenationsDay2Room2 = _(presentations).filter({'Day': 2, 'Room': "2"}).sortBy("SessionNumber").value();
var presenationsDay2Room3 = _(presentations).filter({'Day': 2, 'Room': "3"}).sortBy("SessionNumber").value();