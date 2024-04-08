import React, { useState } from "react";
import Pagination from "~/components/Pagination";
import { api } from "~/utils/api";

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data } = api.post.getLatest.useQuery({
    page: currentPage,
  });

  if (isLoading) return <p>Loading......</p>;

  return (
    <div className="rounded-[20px] border border-brand-neutral-400 p-5 md:p-10">
      <p className="mb-4 text-3.5xl font-semibold">
        Please mark your interests!
      </p>

      <p className="mb-6 text-center">We will keep you notified.</p>

      <div>
        <p className="text-xl font-medium">My saved interests!</p>

        <div className="mt-4 flex flex-col gap-y-3">
          {data?.items.map((val) => (
            <div key={val.id} className="flex gap-x-2">
              <input
                type="checkbox"
                id="scales"
                name="scales"
                checked={val.selected}
                readOnly
                className="scale-150 border border-neutral-400  accent-neutral-600 checked:accent-black"
              />
              <label htmlFor="scales" className="text-base">
                {val.category_name}
              </label>
            </div>
          ))}

          <Pagination
            currentPage={data?.currentPage ?? 1}
            onPageChange={(page) => setCurrentPage(page)}
            totalPages={data?.totalPages ?? 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
