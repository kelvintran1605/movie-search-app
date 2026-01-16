import type { PersonDetail } from "@/types/person";

const PersonDetailSection = ({ detail }: { detail: PersonDetail }) => {
  return (
    <div>
      <img className="rounded-xl mb-6" src={detail.profile_url} />
      <h2 className="text-2xl font-bold tracking-wide">Personal Info</h2>
      <h3 className="font-bold mt-4">Known For</h3>
      <div className="text-gray-400">{detail.known_for_department}</div>
      <h3 className="font-bold mt-4">Known Credits</h3>
      <div className="text-gray-400">48</div>
      <h3 className="font-bold mt-4">Gender</h3>
      <div className="text-gray-400">
        {detail.gender === 1 ? "Female" : "Male"}
      </div>
      <h3 className="font-bold mt-4">Birthday</h3>
      <div className="text-gray-400">{detail.birthday}</div>
      <h3 className="font-bold mt-4">Place of Birth</h3>
      <div className="text-gray-400">{detail.place_of_birth}</div>
      <h3 className="font-bold mt-4">Also Known As</h3>
      <div className="text-gray-400">
        {detail.also_known_as.map((item) => (
          <div className="mt-2">{item}</div>
        ))}
      </div>
    </div>
  );
};

export default PersonDetailSection;
