import { listData } from "../../lib/dummydata";
import "./list.scss";
import Card from "../card/card";

const List = () => {
  return (
    <div className="list">
      {listData.map((item) => (
        <Card
          item={item}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default List;
