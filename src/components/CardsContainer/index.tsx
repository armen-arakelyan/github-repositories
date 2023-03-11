import { memo, Suspense } from "react";
import { Repository } from "../../types";
import { Card } from "..";
import "./styles.scss";

interface IProps {
  repositories: Repository[];
}

const CardsContainer = ({ repositories }: IProps) => (
  <div className="cards-container">
    <Suspense fallback={<div>Loading...</div>}>
      {repositories && repositories.length ? (
        repositories.map((itm: Repository) => (
          <Card
            key={itm.id}
            name={itm.owner.login}
            title={itm.name}
            stars={itm.stargazerCount}
            lastCommit={itm.pushedAt}
            url={itm.url}
          />
        ))
      ) : (
        <div>No repositories found.</div>
      )}
    </Suspense>
  </div>
);

export default memo(CardsContainer);
