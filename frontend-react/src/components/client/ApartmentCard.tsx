import { Heart, Star } from "lucide-react";
import type { Apartment } from "@/types/apartments";
import { Link } from "react-router";
import { formatEnumLabel } from "@/utils/helper";
import { SkeletonCard } from "./SkeletonCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useWishlist } from "@/hooks/useWishlist";

interface ApartmentCardProps {
  apartments: Apartment[];
  isLoading: boolean;
}

export default function ApartmentCard({ apartments = [], isLoading }: ApartmentCardProps) {
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const { isInWishlist, toggleApartment, loading } = useWishlist(userId);

  if (isLoading) {
    return (
      <>
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <SkeletonCard key={i} />
          ))}
      </>
    );
  }

  return (
    <>
      {apartments.map((apartment) => {
        const wishlisted = isInWishlist(apartment.id);

        return (
          <div
            key={apartment.id}
            className="w-full dark:bg-muted bg-white rounded-lg shadow-md overflow-hidden mb-6"
          >
            <div className="relative bg-gray-200 h-48 flex items-center justify-center">
              {apartment.coverImage ? (
                <img
                  src={apartment.coverImage}
                  alt={apartment.title || "Apartment Image"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-3xl">🖼</span>
              )}

              <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full font-semibold">
                {formatEnumLabel(apartment.type)}
              </div>

              <button
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggleApartment(apartment.id)}
                disabled={!userId || loading}
                className={`absolute top-2 right-2 rounded-full p-2 shadow 
        bg-white
                  hover:bg-gray-100 
                  ${!userId || loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-black dark:text-black"}`} />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 h-[50px]">{apartment.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                {apartment.location}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium mr-1">{apartment.avgRating}</span>
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  ({apartment.reviews?.length} reviews)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  ${apartment.pricePerNight}{" "}
                  <span className="text-base font-normal text-gray-600 dark:text-gray-300">
                    / night
                  </span>
                </span>
                <Link
                  to={`/apartments/${apartment.id}`}
                  className="text-sm text-gray-700 dark:text-gray-300 border border-gray-300 px-4 py-1 rounded hover:bg-gray-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
