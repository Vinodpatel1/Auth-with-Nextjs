export default function UserProfile({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        USer Profile ::{params.id}
      </h1>

     
      <p className="text-center text-gray-600 max-w-xl">
        Hello! I am a passionate developer who loves building modern web
        applications with Next.js and React. I enjoy solving problems,
        learning new technologies, and creating projects that make a
        difference.
      </p>
    </div>
  );
}
