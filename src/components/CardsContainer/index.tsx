import { memo, Suspense } from "react";
import { Card } from "..";
import "./styles.scss";

interface IRepository {
  incomplete_results: boolean;
  items: any[];
  total_count: number;
}

interface IProps {
  repositories: IRepository[] | [];
}

const CardsContainer = ({ repositories }: IProps) => (
  <div className="cards-container">
    <Suspense fallback={<div>Loading...</div>}>
      {repositories && repositories.length ? (
        repositories.map((itm: any) => (
          <Card
            key={itm.id}
            title={itm.name}
            stars={itm.score}
            lastCommit={itm.updated_at}
            url={itm.url}
            id={itm.id}
          />
        ))
      ) : (
        <div>No repositories found.</div>
      )}
    </Suspense>
  </div>
);

export default memo(CardsContainer);
