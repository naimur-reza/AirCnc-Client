import { useEffect, useState } from "react";
import useAuth from "../../api/useAuth";
import { getBookings } from "../../api/bookings";
import TableRow from "./TableRow";
import Loader from "../Shared/Loader";
import EmptyState from "../Shared/EmptyState";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const fetchBookings = () => {
    setLoading(true);
    getBookings(user?.email).then((data) => {
      setBookings(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchBookings();
  }, [user]);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {bookings && Array.isArray(bookings) && bookings.length > 0 ? (
        <>
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
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings &&
                        bookings.map((booking) => (
                          <TableRow
                            fetchBookings={fetchBookings}
                            booking={booking}
                            key={booking._id}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyState
          message={"You have not book any room yet!"}
          address={"/"}
          label={"Back to Home"}
        />
      )}
    </>
  );
};

export default MyBookings;
