import ProjectsData from '../json/projects.json';

const projects = ProjectsData.projects;
const color = ['red', 'orange', 'green', 'blue', 'purple'];

export function getWeights(sorting_method)
{
	var output = [];
	var data = getOutput(sorting_method);
	var i = 0;
	
	for (var key in data)
	{
		var current = {};
		current['name'] = key;
		if (sorting_method === "time")
			current['color'] = color[0];
		else
			current['color'] = color[i];
		current['weight'] = Math.round(data[key] * 100 / projects.length);
		i += 1;
		output.push(current);
	}
	return output;
}

export function getData(sorting_method)
{
	var i, j;
	var output = [];
	if (sorting_method === "time")
	{
		//O(n^2) wow, it is so bad
		for (i = projects.length; i > 0; i--)
		{
			for (j = 0; j < projects.length; j++)
			{
				if (projects[j].index === i + "")
				{
					output.push(projects[j]);
					break;
				}
			}
		}
		return output;
	}
	
	var process = {};
	if (sorting_method === "language")
	{
		for (i = 0; i < projects.length; i++)
		{
			if (projects[i].technology[0] in process)
			{
				process[projects[i].technology[0]].push(projects[i])
			}
			else
			{
				process[projects[i].technology[0]] = [projects[i]];
			}
		}
	}
	else if (sorting_method === "group")
	{
		process["Group Projects"] = [];
		process["Personal Projects"] = [];
		for (i = 0; i < projects.length; i++)
		{
			if (projects[i].group)
			{
				process["Group Projects"].push(projects[i]);
			}
			else
			{
				process["Personal Projects"].push(projects[i]);
			}
		}
	}
	else if (sorting_method === "type")
	{
		for (i = 0; i < projects.length; i++)
		{
			if (projects[i].type in process)
			{
				process[projects[i].type].push(projects[i]);
			}
			else
			{
				process[projects[i].type] = [projects[i]];
			}
		}
	}
	
	for (var key in process)
	{
		for (i = 0; i < process[key].length; i++)
		{
			output.push(process[key][i]);
		}
	}
	
	return output;
}

export function getOutput(sorting_method)
{
	var output = {};
	var i;
	if (sorting_method === "language")
	{
		for (i = 0; i < projects.length; i++)
		{
			if (projects[i].technology[0] in output)
			{
				output[projects[i].technology[0]] += 1;
			}
			else
			{
				output[projects[i].technology[0]] = 1;
			}
		}
	}
	else if (sorting_method === "time")
	{
		output["latest"] = projects.length - 1;
		output["oldest"] = 1;
	}
	else if (sorting_method === "group")
	{
		output["Group Projects"] = 0;
		output["Personal Projects"] = 0;
		for (i = 0; i < projects.length; i++)
		{
			if (projects[i].group)
			{
				output["Group Projects"] += 1;
			}
			else
			{
				output["Personal Projects"] += 1;
			}
		}
	}
	else if (sorting_method === "type")
	{
		for (i = 0; i < projects.length; i++)
		{
			if (projects[i].type in output)
			{
				output[projects[i].type] += 1;
			}
			else
			{
				output[projects[i].type] = 1;
			}
		}
	}
	return output;
}