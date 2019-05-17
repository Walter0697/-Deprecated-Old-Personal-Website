var updateTime = "none";
var repos = "none";

document.addEventListener("DOMContentLoaded", function(event) { 
	//fetching information from github
	//just for a few data, why not
	fetch("https://api.github.com/repos/Walter0697/PersonalWebsite")
	.then(response => response.json())
	.then(data => {
		updateTime = data.updated_at;
	})
	.catch(error => console.error(error))

	fetch("https://api.github.com/users/Walter0697")
	.then(response => response.json())
	.then(data => {
		repos = data.public_repos;
	})
	.catch(error => console.error(error))
});


export function getNumbers(index)
{
	var output = {};
	
	if (index === 0 || index === "Ages")
	{
		let curtime = new Date();
		let bday = new Date(1997, 5, 21);
		
		let days =  daysBetween(bday, curtime) / 365; 
		
		output["name"] = "Ages";
		output["nums"] = Math.round(days * 10000000000) / 10000000000;
	}
	else if (index === 1 || index === "Days since last update")
	{
		let curtime = new Date();
		output["name"] = "Days since last update";
		output["nums"] = "...loading";
		if (updateTime !== "none")
		{
			let days = daysBetween(new Date(updateTime), curtime) ;
			output["nums"] = Math.round(days * 10000000000) / 10000000000;
		}
	}
else if (index === 2 || index === "Numbers of public repos")
	{
		output["name"] = "Numbers of public repos";
		output["nums"] = "...loading";
		if (repos !== "none")
		{
			output["nums"] = repos;
		}
	}
	
	return output;
}

export function getLengthOfStat()
{
	return 3;
}

export function daysBetween(date1, date2)
{	
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();
	
	var difference_ms = date2_ms - date1_ms;
	difference_ms = difference_ms / 1000;
	var seconds = Math.floor(difference_ms % 60);
	difference_ms = difference_ms / 60;
	var minutes = Math.floor(difference_ms % 60);
	difference_ms = difference_ms / 60;
	var hours = Math.floor(difference_ms % 24);
	var days = Math.floor(difference_ms / 24);
	return days + hours / 24 + minutes / (24 * 60) + seconds / (24 * 60 * 60);
}
