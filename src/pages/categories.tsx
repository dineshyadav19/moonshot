import React, { useState, useEffect } from "react";
import Pagination from "~/components/Pagination";
import { api } from "~/utils/api";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Link from "next/link";
import Back from "@icons/Back.svg";
type CategoryRow = {
  id: number;
  categoryName: string;
  updatedOn: Date;
  selected: boolean;
  userId: number;
};

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<CategoryRow[]>([]);

  const { isLoading, data, refetch, error } =
    api.post.getCategoriesByUserId.useQuery({ page: currentPage });

  useEffect(() => {
    if (data) {
      setCategories(data.items);
    }
  }, [data]);

  const updateCategory = api.post.updateCategoriesByUserId.useMutation({
    onSuccess: async (response) => {
      if (response.success) {
        toast.success(response.message, {
          position: "bottom-right",
        });
        await refetch();
      }
    },
    onError: () => {
      toast.error("Failed to update category", {
        position: "bottom-right",
      });
      // Optionally refetch to reset state
      refetch();
    },
  });

  const handleUpdateCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: CategoryRow,
  ) => {
    const updatedCategories = categories.map((category) =>
      category.id === val.id
        ? { ...category, selected: e.target.checked }
        : category,
    );
    setCategories(updatedCategories);

    updateCategory.mutate({
      rowId: val.id,
      value: e.target.checked,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error)
    return <p className="text-center text-xl">Something went wrong...</p>;

  return (
    <>
      <Link href={"/game-of-life"} className="mb-4 flex items-center gap-2">
        <Back className="h-8 w-8" />{" "}
        <span className="text-base">Play Game of life</span>
      </Link>
      <div className="rounded-[20px] border border-brand-neutral-400 p-5 md:p-10">
        <p className="text-center text-2xl font-semibold md:text-3.5xl">
          Please mark your interests!
        </p>
        <p className="mt-1 text-center text-base">We will keep you notified.</p>
        {isLoading ? (
          <div className="mt-4">
            <Loader />
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-lg font-medium">My saved interests!</p>
            <div className="mt-2 flex flex-col gap-y-3 pl-1">
              {categories.map((val) => (
                <div key={val.id} className="flex gap-x-3">
                  <input
                    type="checkbox"
                    id={val.categoryName}
                    checked={val.selected}
                    onChange={(e) => handleUpdateCategory(e, val)}
                    className="scale-150 cursor-pointer border border-neutral-400 accent-neutral-600 checked:accent-black"
                  />
                  <label
                    htmlFor={val.categoryName}
                    className="cursor-pointer text-base"
                  >
                    {val.categoryName}
                  </label>
                </div>
              ))}

              <Pagination
                currentPage={data?.currentPage ?? 1}
                onPageChange={handlePageChange}
                totalPages={data?.totalPages ?? 1}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
