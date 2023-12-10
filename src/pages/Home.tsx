import { useQuery } from "@tanstack/react-query";
import { Coffee } from "../lib/definition";
import CoffeCard, { CoffeCardSkeleton } from "../components/CoffeCard";
import headingBg from "../assets/vector.svg";
import { useEffect, useState } from "react";

const fetchCoffee = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json",
  );

  const data = await response.json();

  return data as Coffee[];
};

function Home() {
  const { data: coffeeList, isLoading: coffeLoading } = useQuery({
    queryKey: ["coffee"],
    queryFn: fetchCoffee,
  });

  const filters = ["All Products", "Available Now"] as const;
  const [selectedFilter, setSelectedFilter] = useState<
    (typeof filters)[number]
  >(filters[0]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!coffeLoading) setTimeout(() => setIsLoading(coffeLoading), 1000);
  }, [coffeLoading]);

  const CoffeCards = () => {
    return (
      <>
        {coffeeList?.map((coffee) => (
          <CoffeCard
            display={
              selectedFilter === "Available Now" ? coffee.available : true
            }
            key={coffee.id}
            coffee={coffee}
          />
        ))}
      </>
    );
  };

  const CoffeCardsSkeleton = () => {
    return (
      <>
        {Array.from({ length: 6 }, (_, i) => i).map((i) => (
          <CoffeCardSkeleton key={i} />
        ))}
      </>
    );
  };

  return (
    <div className="relative z-10 -mt-20 px-5 sm:-mt-32 sm:px-24">
      <div className="rounded-md bg-[#1B1D1F] px-10 pb-12 pt-10 sm:pt-16">
        <img
          className="absolute left-1/2 z-10 hidden -translate-x-12 -translate-y-9 transform sm:block md:translate-x-0 "
          src={headingBg}
          alt=""
        />
        <div className="relative z-20">
          <h1 className="sm:text-heading relative mb-2 text-center text-2xl">
            Our Collection
          </h1>

          <p className="mx-auto mb-5 max-w-[500px] text-center text-sm text-[#6F757C] sm:text-base">
            Introducing our Coffee Collection, a selection of unique coffees
            from different roast types and origins, expertly roasted in small
            batches and shipped fresh weekly.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-5">
            {filters.map((filter) => (
              <button
                className={`rounded-md px-3 py-2 transition-colors duration-100 ease-in ${
                  filter === selectedFilter ? "bg-[#6F757C] text-white" : ""
                }`}
                onClick={() => setSelectedFilter(filter)}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mx-auto grid max-w-[900px] grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? <CoffeCardsSkeleton /> : <CoffeCards />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
