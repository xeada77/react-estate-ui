import Filter from "../../components/filter/filter";
import "./listPage.scss";
import Card from "../../components/card/card";
import Map from "../../components/map/map";
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

const ListPage = () => {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => {
                //console.log(postResponse.data.data);
                const myPosts = postResponse.data.data;

                return myPosts.map((item) => (
                  <Card
                    key={item.id}
                    item={item}
                  />
                ));
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
