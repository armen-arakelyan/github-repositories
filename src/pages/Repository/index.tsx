import "./styles.scss";

const Repository = () => (
  <div className="repository-card">
    <h1>Repository</h1>
    <p className="title">stars</p>
    <p>last commit date</p>
    <img src="images/image.png" alt="Pic" style={{ width: "100%" }} />
    <p>Nickname</p>
    <p>languages</p>
    <p>description</p>
  </div>
);

export default Repository;
