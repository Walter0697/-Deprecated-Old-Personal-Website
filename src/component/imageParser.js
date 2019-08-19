import BallGame from '../sprite/projects/ballgame.png';
import Dinder from '../sprite/projects/dinder.png';
import DinderX from '../sprite/projects/dinder_xmas.png';
import Fly from '../sprite/projects/fly.png';
import Imitator from '../sprite/projects/imitator.png';
import MusicShooter from '../sprite/projects/musicshooter.png';
import Pizzarena from '../sprite/projects/pizzarena.png';
import VideoJuice from '../sprite/projects/videojuice.png';
import ConnectFour from '../sprite/projects/connectfour.png';
import BunnySenet from '../sprite/projects/bunnysenet.png';
import WalterCheng from '../sprite/projects/waltercheng.png';
import ScienceFiction from '../sprite/projects/sciencefiction.png';

import BG003 from '../sprite/screenshot/bg003.gif';
import BG002 from '../sprite/screenshot/bg002.png';
import BG001 from '../sprite/screenshot/bg001.png';
import MS001 from '../sprite/screenshot/ms001.png';
import MS002 from '../sprite/screenshot/ms002.png';
import MS003 from '../sprite/screenshot/ms003.gif';
import IT001 from '../sprite/screenshot/it001.gif';
import IT002 from '../sprite/screenshot/it002.png';
import IT003 from '../sprite/screenshot/it003.gif';
import VJ001 from '../sprite/screenshot/vj001.png';
import VJ002 from '../sprite/screenshot/vj002.gif';
import DD001 from '../sprite/screenshot/dd001.png';
import DD002 from '../sprite/screenshot/dd002.png';
import DD003 from '../sprite/screenshot/dd003.gif';
import PR001 from '../sprite/screenshot/pr001.png';
import PR002 from '../sprite/screenshot/pr002.png';
import PR003 from '../sprite/screenshot/pr003.gif';
import FG001 from '../sprite/screenshot/fg001.png';
import CF001 from '../sprite/screenshot/cf001.png';
import CF002 from '../sprite/screenshot/cf002.png';
import CF003 from '../sprite/screenshot/cf003.gif';
import BS001 from '../sprite/screenshot/bs001.png';
import BS002 from '../sprite/screenshot/bs002.png';
import BS003 from '../sprite/screenshot/bs003.gif';
import WC001 from '../sprite/screenshot/wc001.gif';
import SF001 from '../sprite/screenshot/sf001.jpg';
import SF002 from '../sprite/screenshot/sf002.jpg';
import SF003 from '../sprite/screenshot/sf003.jpg';

const ProjectImage = {	'ballgame.png'		: BallGame,
						'dinder.png'		: Dinder,
						'dinder_xmas.png'	: DinderX,
						'fly.png'			: Fly,
						'imitator.png'		: Imitator,
						'musicshooter.png'	: MusicShooter,
						'pizzarena.png'		: Pizzarena,
						'videojuice.png'	: VideoJuice,
						'connectfour.png'	: ConnectFour,
						'bunnysenet.png'	: BunnySenet,
						'waltercheng.png'	: WalterCheng, 
						'sciencefiction.png': ScienceFiction,};


const ScreenShotImage = {	'bg003.gif'		: BG003,
							'bg002.png'		: BG002,
							'bg001.png'		: BG001,	
							'ms001.png'		: MS001,	
							'ms002.png'		: MS002,	
							'ms003.gif'		: MS003,	
							'it001.gif'		: IT001,	
							'it002.png'		: IT002,	
							'it003.gif'		: IT003,	
							'vj001.png'		: VJ001,
							'vj002.gif'		: VJ002,
							'dd001.png'		: DD001,
							'dd002.png'		: DD002,
							'dd003.gif'		: DD003,
							'pr001.png'		: PR001,
							'pr002.png'		: PR002,
							'pr003.gif'		: PR003,
							'fg001.png'		: FG001,
							'cf001.png'		: CF001,
							'cf002.png' 	: CF002,
							'cf003.gif'		: CF003,
							'bs001.png'		: BS001,
							'bs002.png'		: BS002,
							'bs003.gif'		: BS003,
							'wc001.gif'		: WC001,
							'sf001.jpg'		: SF001,
							'sf002.jpg'		: SF002,
							'sf003.jpg'		: SF003,
							};
			
var date = new Date();
			
export function getProjectImage(name, variation)
{
	if (variation)
	{
		for (var i = 0; i < variation.length; i++)
		{
			if (variation[i].target === "image")
			{
				if (variation[i].condition === "month")
				{
					if (date.getMonth() + 1 === variation[i].value)
					{
					
						return ProjectImage[variation[i].modify];
					}
				}
				else if (variation[i].condition === "date")
				{
					if (date.getDate() == variation[i].value2 && date.getMonth() + 1 === variation[i].value)
					{
						return ProjectImage[variation[i].modify];
					}
				}
			}
		}
	}
	return ProjectImage[name];
}

export function getScreenShot(name)
{
	return ScreenShotImage[name];
}