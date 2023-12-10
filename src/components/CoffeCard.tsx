import { Coffee } from "../lib/definition";
import Skeleton from "react-loading-skeleton";

import star from "../assets/Star_fill.svg";
import emptyStar from "../assets/Star.svg";

function CoffeCard({
  coffee,
  display = true,
}: {
  coffee: Coffee;
  display?: boolean;
}) {
  const formatRating = (rating: number | string) => {
    const ratingString = rating.toString();

    if (!ratingString.includes(".")) return ratingString + ".0";
    return ratingString;
  };

  return (
    <div className={`relative w-[280px] ${display ? "block" : "hidden"}`}>
      <div className="relative">
        {coffee.popular && (
          <p className="absolute left-2 top-1 rounded-xl bg-[#F6C768] px-3 text-[#1B1D1F]">
            Popular
          </p>
        )}
        <img
          className="mb-2 h-[170px] w-full rounded-md"
          src={coffee.image}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="mb-2 flex items-center justify-between">
        <div className="">{coffee.name}</div>
        <div className="text-price rounded-md bg-[#BEE3CC] px-2 py-1 text-[#1B1D1F]">
          {coffee.price}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <img src={coffee.rating ? star : emptyStar} alt="" />
          {coffee.rating ? (
            <>
              <p>{formatRating(coffee.rating)}</p>
              <p className="text-[#6F757C]">({coffee.votes})</p>
            </>
          ) : (
            <p className="text-[#6F757C]">No ratings</p>
          )}
        </div>

        {!coffee.available && <p className="pt-1 text-[#ED735D]">Sold out</p>}
      </div>
    </div>
  );
}
export default CoffeCard;

export const CoffeCardSkeleton = () => {
  return (
    <div>
      {/* image */}
      <Skeleton height={170} width={280} />
      <div className="flex items-center justify-between">
        {/* title */}
        <Skeleton height={20} width={80} />

        {/* price */}
        <Skeleton height={30} width={60} />
      </div>

      {/* rating */}
      <Skeleton height={20} width={90} />
    </div>
  );
};
