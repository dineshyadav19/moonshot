import React from "react";

const Categories = () => {
  return (
    <div className="rounded-[20px] border border-brand-neutral-400 p-5 md:p-10">
      <p className="mb-4 text-3.5xl font-semibold">
        Please mark your interests!
      </p>

      <p className="mb-6 text-center">We will keep you notified.</p>

      <div>
        <p className="text-xl font-medium">My saved interests!</p>

        <div className="mt-4 flex flex-col gap-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex gap-x-2">
              <input
                type="checkbox"
                id="scales"
                name="scales"
                checked={index % 2 === 0}
                readOnly
                className="scale-150 border border-neutral-400  accent-neutral-600 checked:accent-black"
              />
              <label htmlFor="scales" className="text-base">
                Scales
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
