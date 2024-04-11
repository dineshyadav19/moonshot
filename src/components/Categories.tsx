import React, { useState } from "react";
import Pagination from "~/components/Pagination";
import { api } from "~/utils/api";
import Loader from "./Loader";
import { toast } from "react-toastify";

type CategoryRow = {
  id: number;
  categoryName: string;
  updatedOn: Date;
  selected: boolean;
  userId: number;
};

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data, refetch, error } =
    api.post.getCategoriesByUserId.useQuery({
      page: currentPage,
    });

  const updateCategory = api.post.updateCategoriesByUserId.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message, {
          position: "bottom-right",
        });
        await refetch();
      }
    },
  });

  const handleUpdateCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: CategoryRow,
  ) => {
    updateCategory.mutate({
      rowId: val.id,
      value: e.target.checked,
    });
  };

  if (isLoading) return <Loader />;

  if (error)
    return <p className="text-center text-xl">Something went wrong...</p>;

  return (
    <div className="rounded-[20px] border border-brand-neutral-400 p-5 md:p-10">
      <p className="mb-4 text-center text-2xl font-semibold md:text-3.5xl">
        Please mark your interests!
      </p>

      <p className="mb-6 text-center">We will keep you notified.</p>

      <div>
        <p className="text-xl font-medium">My saved interests!</p>

        <div className="mt-4 flex flex-col gap-y-3">
          {data?.items?.map((val) => (
            <div key={val.id} className="flex gap-x-2">
              <input
                type="checkbox"
                checked={val.selected}
                onChange={(e) => handleUpdateCategory(e, val)}
                className="scale-150 border border-neutral-400  accent-neutral-600 checked:accent-black"
              />
              <label htmlFor="scales" className="text-base">
                {val.categoryName}
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
