import { ArrowBackOutlined } from '@material-ui/icons';
import './watch.scss';

export default function Watch() {
    return (
        <div className="watch">
            <div className="back">
                <ArrowBackOutlined />
                Home
            </div>
            <video 
            className="video" 
            autoPlay 
            progress 
            controls 
            src="https://static.videezy.com/system/resources/previews/000/004/605/original/Clean_Lower_Third_-_M8.mp4" 
            />
        </div>
    )
}
