import Park from "@/components/Park";

export default function Home() {
  return (
    <main className='flex flex-col items-center space-y-8 p-24'>
      <div className='flex items-center gap-10'>
        {Array(10)
          .fill("")
          .map((_, index) => (
            <Park
              key={index}
              park={index + 1}
            />
          ))}
      </div>
      <div className='flex items-center gap-10'>
        {Array(10)
          .fill("")
          .map((_, index) => (
            <Park
              key={index}
              park={index + 11}
            />
          ))}
      </div>
    </main>
  );
}
