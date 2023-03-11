import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Star from '../../images/star.png';
import "./styles.scss";

interface IProps {
  title: string;
  name: string;
  stars: number;
  lastCommit: Date;
  url: string;
}

const Card = ({ title, name, stars, lastCommit, url }: IProps) => {
  const navigate = useNavigate();

  const starsArr = useMemo(() => {
    return Array.from({ length: stars }, (_, i) => i + 1);
  }, [stars]);

  return (
    <div className="card" onClick={() => navigate(`/${name}/${title}`)}>
      <div>
        <h2>{title}</h2>
        {starsArr.length <=5 ? starsArr.map(itm => <img key={itm} src={Star} alt="Star" />) : <p>Stars: {stars}</p>}
        <p>Last commit date: {new Date(lastCommit).toLocaleString()}</p>
        <p>{url}</p>
      </div>
    </div>
  );
};

export default memo(Card);
