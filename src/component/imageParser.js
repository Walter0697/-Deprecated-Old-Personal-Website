import BallGame from '../sprite/projects/ballgame.png';
import Dinder from '../sprite/projects/dinder.png';
import Fly from '../sprite/projects/fly.png';
import Imitator from '../sprite/projects/imitator.png';
import MusicShooter from '../sprite/projects/musicshooter.png';
import Pizzarena from '../sprite/projects/pizzarena.png';
import VideoJuice from '../sprite/projects/videojuice.png';
import ConnectFour from '../sprite/projects/connectfour.png';
import BunnySenet from '../sprite/projects/bunnysenet.png';
import WalterCheng from '../sprite/projects/waltercheng.png';

const ProjectImage = {	'ballgame.png'		: BallGame,
						'dinder.png'		: Dinder,
						'fly.png'			: Fly,
						'imitator.png'		: Imitator,
						'musicshooter.png'	: MusicShooter,
						'pizzarena.png'		: Pizzarena,
						'videojuice.png'	: VideoJuice,
						'connectfour.png'	: ConnectFour,
						'bunnysenet.png'	: BunnySenet,
						'waltercheng.png'	: WalterCheng, };


export function getProjectImage(name)
{
	return ProjectImage[name];
}
