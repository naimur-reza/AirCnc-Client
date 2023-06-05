import { useEffect, useState } from "react";
import useAuth from "../../api/useAuth";
import RoomDataRow from "./RoomDataRow";
import EmptyState from "../../components/Shared/EmptyState";
import Loader from "../../components/Shared/Loader";
import { getHostRoom } from "../../api/rooms";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyListings = () => {
  const [axiosSecure] = useAxiosSecure();

  const { user, loading } = useAuth();
  // const [rooms, setRooms] = useState([]);
  // const fetchRooms = () => {
  //   setLoading(true);
  //   axiosSecure(`/rooms/host/${user.email}`)
  //     .then((data) => {
  //       setRooms(data.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  // useEffect(() => {
  //   fetchRooms();
  // }, [user]);
  // console.log(rooms);

  const { data: rooms = [], refetch } = useQuery({
    queryKey: ["rooms", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/rooms/host/${user?.email}`);
      console.log("res from axios", res.data);

      return res.data;
    },
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {rooms && Array.isArray(rooms) && rooms.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        To
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Delete
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms &&
                      rooms.map((room) => (
                        <RoomDataRow
                          refetch={refetch}
                          key={room._id}
                          room={room}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          message={"You have not add any room yet!"}
          address={"/dashboard/add-room"}
          label={"Add Room"}
        />
      )}
    </>
  );
};

export default MyListings;
