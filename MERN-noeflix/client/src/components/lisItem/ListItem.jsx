import { Add, FavoriteBorderOutlined, PlayArrow, ThumbDownAltOutlined } from '@material-ui/icons';
import { useState } from 'react';
import './listItem.scss';
import React from 'react';

export default function ListItem({ index }) {
	const [ isHovered, setIsHovered ] = useState(false);
	const trailer =
		'https://static.videezy.com/system/resources/previews/000/004/605/original/Clean_Lower_Third_-_M8.mp4';

	return (
		<div
			style={{ left: isHovered && index * 235 - 50 + index * 2.5 }}
			className="listItem"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<img
				src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
				alt=""
			/>
			{isHovered && (
				<React.Fragment>
					<video src={trailer} autoPlay={true} loop />
					<div className="itemInfo">
						<div className="itemIcon">
							<PlayArrow className="iconPlay" />
							<Add className="icon" />
							<FavoriteBorderOutlined className="icon" />
							<ThumbDownAltOutlined className="icon" />
						</div>
						<div className="itemInfoTop">
							<span>1 Jam 24 Menit</span>
							<span className="limit">+16</span>
							<span>1998</span>
						</div>
						<div className="desc">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus excepturi nesciunt
							eligendi incidunt perferendis aspernatur
						</div>
						<div className="genre">Action</div>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}
