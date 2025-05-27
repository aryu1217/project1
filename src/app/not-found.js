export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">
          The page you are looking for does not exist.
        </p>
        <a href="/home" className="text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>
    </div>
  );
}
