import useGlobalContext from "context";

export default function Notasks() {
  const { search, filter, style } = useGlobalContext(),
    [styleValue] = style,
    [searchValue] = search,
    [filterValue] = filter;

  console.log(searchValue);
  console.log(filterValue);

  return (
    <div className="relative grid content-center h-full m-auto text-center text-gray-100 max-w-80vw">
      {styleValue.searching ? (
        <div>
          {searchValue && (
            <p>
              <span className="text-blue-1">{searchValue}</span> not found
            </p>
          )}
        </div>
      ) : filterValue === "All Lists" ? (
        <div>
          <img
            src="./images/hammock.png"
            alt="hammock"
            className="max-h-30vh"
          />
          <br />
          <p>Nothing to do</p>
        </div>
      ) : filterValue === "Finished" ? (
        <div>No finished tasks</div>
      ) : (
        <div>
          List <span className="text-blue-1">{filterValue}</span> is empty
        </div>
      )}
    </div>
  );
}
