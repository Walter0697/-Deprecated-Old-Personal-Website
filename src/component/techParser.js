import technologyData from '../json/technology.json';

//hackathon related icon
import DevPost from '../sprite/technology/devpost.png';
import ConuHack from '../sprite/technology/conuhackiii.jpeg';
import McGameJam from '../sprite/technology/mcgamejam.png';
//technology icon
import OpenGL from '../sprite/technology/opengl.png';
import Processing from '../sprite/technology/processing.png';
import SFML from '../sprite/technology/sfml.png';
import Shell from '../sprite/technology/shellscript.png';
import Spring from '../sprite/technology/spring.png';
import Airtable from '../sprite/technology/airtable.png';
import Anime from '../sprite/technology/animejs.png';
import Nginx from '../sprite/technology/nginx.png';

const TechImage = { 'devpost'		: DevPost, 
					'McGame Jam'	: McGameJam,
					'ConUHackIII'	: ConuHack,
					'OpenGL'		: OpenGL,
					'Processing'	: Processing,
					'SFML'			: SFML,
					'Shell Script'	: Shell,
					'React-Spring'	: Spring, 
					'Airtable'		: Airtable,
					'Animejs'		: Anime,
					'Nginx'			: Nginx,};
					
const technologies = technologyData.technology;

export function getTechnology(source)
{
	var output = {};
	technologies.forEach(function(data)
	{
		if (data.name === source)
		{
			output = data;
		}
	});
	
	if (Object.keys(output).length === 0)
	{
		output.src = "none";
	}

	if (output.src === "none")
	{
		output.image = TechImage[source];
	}
	return output;
}
