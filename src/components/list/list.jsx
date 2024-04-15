import "./list.scss";
import Card from "../card/card";

const List = ({ posts }) => {
  return (
    <div className="list">
      {posts?.map((item) => {
        return (
          <Card
            item={item}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export default List;
