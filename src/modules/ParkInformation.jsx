import { useEffect } from "react";
import wiki from "wikipedia";
import SectionContent from "../components/SectionContent";
import { useQuery } from "react-query";

import LoadingOverlay from "../components/LoadingOverlay";

wiki.setLang("sv");

export default function ParkInformation({ park }) {
  const { data, isLoading, isError, error } = useQuery(park.name, async () => {
    const summary = await wiki.summary(park.name);
    const editedExtract = summary.extract
      .split(". ")
      .map((sentence) => sentence);

    summary.extract = editedExtract;

    console.log(summary.extract);

    return summary;
  });

  return (
    <section className="text-slate-100 section container">
      <SectionContent header={{ title: park.name }} image={park.image}>
        <div className="relative min-h-[5rem] space-y-4">
          <LoadingOverlay visible={isLoading} />

          {/* <p>{data?.extract}</p> */}
          {data?.extract?.map((sentence, index) => (
            <p key={index}>{sentence}</p>
          ))}
        </div>
      </SectionContent>
    </section>
  );
}
