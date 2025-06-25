interface Props {
  title: string;
  base: string;
  labor: string;
}

export default function VehicleCard({ title, base, labor }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 shadow border">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500">{base} + {labor} <span className="text-sm">per min labor</span></p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700">
          Continue
        </button>
      </div>
    </div>
  );
}